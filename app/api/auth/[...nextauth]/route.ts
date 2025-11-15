import { getServerClient } from "@/utils/supabase/server";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    username: string | null;
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string | null;
    reputation?: number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // Email/Password Provider (via Supabase)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        try {
          const supabase = await getServerClient();

          // Sign in with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            console.error("Supabase auth error:", error);
            throw new Error("Identifiants invalides");
          }

          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          if (profileError) {
            console.error("Profile fetch error:", profileError);
            throw new Error("Profil utilisateur non trouvé");
          }

          return {
            id: data.user.id,
            email: data.user.email!,
            name: profile?.full_name || data.user.email || null,
            image: profile?.avatar_url || null,
            username: profile?.username || null,
          };
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Erreur d'authentification");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error("No email provided");
        return false;
      }

      try {
        const supabase = await getServerClient();

        // For OAuth providers, create/update profile
        if (account?.provider === "google" && profile) {
          // Check if user exists in Supabase profiles
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single();

          if (!existingProfile) {
            // Create profile for OAuth user
            const username =
              profile.email?.split("@")[0] +
              "-" +
              Math.random().toString(36).substring(2, 5);

            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                username,
                full_name: profile.name || user.email.split("@")[0],
                avatar_url: user.image || null,
              });

            if (profileError) {
              console.error("Error creating profile:", profileError);
              return false;
            }
          } else {
            // Update existing profile with latest OAuth data
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                avatar_url: user.image || null,
                full_name: profile.name || user.name || undefined,
              })
              .eq("id", user.id);

            if (updateError) {
              console.error("Error updating profile:", updateError);
            }
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }

      // Get fresh user data on each request
      if (token.id) {
        try {
          const supabase = await getServerClient();
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("username, avatar_url, full_name, reputation_score")
            .eq("id", token.id)
            .single();

          if (error) {
            console.error("JWT profile fetch error:", error);
          } else if (profile) {
            token.username = profile.username;
            token.name = profile.full_name;
            token.picture = profile.avatar_url;
            token.reputation = profile.reputation_score || 0;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.image = token.picture || null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every day
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
