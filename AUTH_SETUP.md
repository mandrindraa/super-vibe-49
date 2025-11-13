# Authentication Backend Setup Guide

## Overview

The application uses **NextAuth.js** with **Supabase** for authentication. It supports:

- Email/Password login (credentials via Supabase)
- Google OAuth login
- JWT-based session management

## Architecture

### Components

#### 1. **Supabase Client** (`lib/supabase/client.ts`)

```typescript
createServerClient(); // Server-side operations with service role
createBrowserClient(); // Client-side operations
```

#### 2. **NextAuth Configuration** (`app/api/auth/[...nextauth]/route.ts`)

- **Providers**: Credentials + Google OAuth
- **Callbacks**: signIn, jwt, session
- **Session Strategy**: JWT with 30-day expiration

#### 3. **Database Schema** (Supabase)

```sql
profiles table:
- id (UUID) - Primary key, linked to auth.users
- username (TEXT) - Unique identifier
- full_name (TEXT) - User's display name
- avatar_url (TEXT) - Profile picture URL
- bio (TEXT) - User biography
- website (TEXT) - User website
- reputation_score (INT) - Community reputation
- region (TEXT) - User's region
- badges (JSONB) - Array of earned badges
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Authentication Flow

### 1. Email/Password Login

1. User submits email & password in login form
2. NextAuth sends credentials to `CredentialsProvider`
3. Provider authenticates with Supabase using `signInWithPassword()`
4. If successful, retrieves user profile from `profiles` table
5. Returns user object to NextAuth
6. NextAuth creates JWT token
7. User is redirected to home page

### 2. Google OAuth Login

1. User clicks "Sign in with Google"
2. Google OAuth flow is initiated
3. After successful authorization, user info is returned
4. NextAuth `signIn` callback checks if profile exists
5. If no profile exists, creates one with:
   - Auto-generated username (email prefix + random suffix)
   - Full name from Google profile
   - Avatar URL from Google
6. JWT token is created
7. User is redirected to home page

## API Routes

### POST `/api/auth/signup`

Creates a new user account.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe"
}
```

**Response (201):**

```json
{
  "message": "Compte créé avec succès",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "john-abc123"
  }
}
```

**Errors:**

- `400`: Validation errors, email already exists
- `500`: Server error

## Environment Variables

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-api-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000  # For production: https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

## Type Safety

### Session User Type

```typescript
interface User {
  id: string; // UUID from Supabase
  email: string; // User email
  name: string | null; // Display name
  image: string | null; // Avatar URL
  username: string | null; // Unique username
}
```

### JWT Token Type

```typescript
interface JWT {
  id: string;
  username: string | null;
  reputation?: number;
  // ... other standard JWT fields
}
```

## Usage in Components

### Get Current Session

```typescript
import { useSession } from "next-auth/react";

export function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not signed in</div>;

  return <div>Welcome, {session?.user?.name}</div>;
}
```

### Using Auth Hook

```typescript
import { useAuthSession } from "@/hooks/use-auth-session";

export function MyComponent() {
  const { user, isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>Logged in as {user?.email}</div>
      ) : (
        <a href="/auth/login">Sign in</a>
      )}
    </div>
  );
}
```

### Sign Out

```typescript
import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>;
```

## Security Considerations

1. **JWT Secret**: Unique, randomly generated string (32+ characters)
2. **OAuth Link Dangerous**: Enabled for Google to allow account linking
3. **Service Role Key**: Used only on server (never expose to client)
4. **Password Requirements**: Minimum 6 characters (enforced by API)
5. **Email Verification**: Auto-enabled for OAuth users
6. **HTTPS Only**: Set NEXTAUTH_URL to https in production

## Error Handling

### Common Errors

**"Identifiants invalides"**

- User doesn't exist
- Wrong password entered
- Account not yet created

**"Profil utilisateur non trouvé"**

- User exists in Supabase auth but not in profiles table
- Database consistency issue

**"Un compte avec cet email existe déjà"**

- Email already registered
- Suggest password reset if user forgot

## Troubleshooting

### User Can Login but Profile Doesn't Load

**Solution**: Check that profiles table has correct foreign key relationship to auth.users

### OAuth Redirect URL Mismatch

**Solution**: Update Google OAuth redirect URIs in Google Cloud Console to match NEXTAUTH_URL

### "JWT callback error" in logs

**Solution**: Ensure Supabase API key has access to profiles table

### Session Not Persisting Across Page Reloads

**Solution**: Verify NEXTAUTH_SECRET is set correctly and matches in all environments

## Database Setup

### Create profiles table if not exists:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  region TEXT,
  reputation_score INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX profiles_username_idx ON profiles(username);
```

### Enable RLS (Row Level Security):

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read any profile
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Next Steps

1. ✅ Implement email verification
2. ✅ Add password reset flow
3. ✅ Implement two-factor authentication
4. ✅ Add social provider linking
5. ✅ Create user onboarding flow
