# Quick Reference: Authentication

## 🔐 Check User Status

### In Client Components

\`\`\`typescript
"use client";
import { useAuthSession } from "@/hooks/use-auth-session";

export default function Page() {
  const { user, isAuthenticated, isLoading } = useAuthSession();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <a href="/auth/login">Sign In</a>;
  return <p>Welcome, {user?.name}</p>;
}
\`\`\`

### In Server Components

\`\`\`typescript
import { getCurrentUser } from "@/lib/auth";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) return <p>Please sign in</p>;
  return <p>Welcome, {user.name}</p>;
}
\`\`\`

## 🚀 Sign In / Sign Out

\`\`\`typescript
import { signIn, signOut } from "next-auth/react";

// Email/Password Login
await signIn("credentials", {
  email: "user@example.com",
  password: "password123",
  redirect: true,
  callbackUrl: "/",
});

// Google OAuth
await signIn("google");

// Sign Out
await signOut({ callbackUrl: "/" });
\`\`\`

## 📝 User Registration

\`\`\`typescript
// Call signup API endpoint
const response = await fetch("/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "newuser@example.com",
    password: "SecurePass123",
    fullName: "John Doe",
  }),
});

const data = await response.json();
if (response.ok) {
  console.log("User created:", data.user);
  // Redirect to login
} else {
  console.error("Signup error:", data.error);
}
\`\`\`

## 🛡️ Protect API Routes

\`\`\`typescript
// app/api/protected/route.ts
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await requireAuth(); // Throws 401 if not authenticated

  return NextResponse.json({
    message: `Hello, ${user.email}!`,
    userId: user.id,
  });
}
\`\`\`

## 🔄 Access Session in API Routes

\`\`\`typescript
// app/api/my-data/route.ts
import { getServerAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({
    user: session.user,
  });
}
\`\`\`

## 📊 User Data Fields

\`\`\`typescript
interface User {
  id: string; // UUID
  email: string; // user@example.com
  name: string | null; // Display name
  image: string | null; // Avatar URL
  username: string | null; // Unique username
}
\`\`\`

## 🎨 Redirect After Login

\`\`\`typescript
// app/auth/login/page.tsx
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    router.push(callbackUrl);
  };
}
\`\`\`

## 🔗 Update User Session

\`\`\`typescript
"use client";
import { useSession } from "next-auth/react";

export function Component() {
  const { data: session, update } = useSession();

  const handleUpdateProfile = async () => {
    // Update user data...

    // Refresh session to get new data
    await update();
  };
}
\`\`\`

## ❌ Handle Auth Errors

\`\`\`typescript
const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
});

if (result?.error) {
  // Possible errors:
  // "Identifiants invalides" - wrong credentials
  // "Email et mot de passe requis" - missing fields
  console.error(result.error);
} else if (result?.ok) {
  // Success
  router.push("/");
}
\`\`\`

## 🎯 Common Use Cases

### Check if user is admin

\`\`\`typescript
// Add isAdmin field to user profile in Supabase
const user = await getCurrentUser();
const isAdmin = user?.role === "admin";
\`\`\`

### Get user reputation

\`\`\`typescript
// Use JWT token in callbacks
const session = await getServerAuthSession();
const reputation = (session as any)?.user?.reputation || 0;
\`\`\`

### Track user activity

\`\`\`typescript
// Create activity log in Supabase
import { createServerClient } from "@/lib/supabase/client";

const supabase = createServerClient();
await supabase.from("activities").insert({
  user_id: user.id,
  activity_type: "login",
});
\`\`\`

## 📞 Support

For issues, check:

1. `AUTH_SETUP.md` - Full documentation
2. `AUTHENTICATION_SUMMARY.md` - Implementation overview
3. NextAuth docs: https://next-auth.js.org
4. Supabase docs: https://supabase.com/docs
