import createServerClient from "@/lib/supabase/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
          const supabase = createServerClient();

          // Sign in with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            throw new Error(error.message);
          }

          if (!data.user) {
            throw new Error("Utilisateur non trouvé");
          }

          // Get user profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          return {
            id: data.user.id,
            email: data.user.email!,
            name: profile?.full_name || data.user.email,
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
      if (!user.email) return false;

      try {
        const supabase = await createServerClient();

        // For OAuth providers, create/update profile
        if (account?.provider === "google") {
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (!existingUser) {
            // Create user in Supabase auth (if not exists)
            const { data: authData, error: authError } =
              await supabase.auth.admin.createUser({
                email: user.email,
                email_confirm: true,
                user_metadata: {
                  full_name: user.name,
                  avatar_url: user.image,
                },
              });

            if (authError) {
              console.error("Error creating auth user:", authError);
              return false;
            }

            // Create profile
            const username =
              user.email.split("@")[0] +
              "-" +
              Math.random().toString(36).substr(2, 4);

            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: authData.user.id,
                username,
                full_name: user.name || "",
                avatar_url: user.image || null,
              });

            if (profileError) {
              console.error("Error creating profile:", profileError);
              return false;
            }

            user.id = authData.user.id;
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
        token.username = (user as any).username;
      }

      // Get fresh user data on each request
      if (token.id) {
        try {
          const supabase = await createServerClient();
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, avatar_url, full_name, reputation_score")
            .eq("id", token.id)
            .single();

          if (profile) {
            token.username = profile.username;
            token.name = profile.full_name;
            token.picture = profile.avatar_url;
            token.reputation = profile.reputation_score;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // if (token) {
      //   session.user!.id! = token.id as string;
      //   session.user!.username! = token.username as string;
      //   session.user!.reputation! = token.reputation as number;
      // }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
