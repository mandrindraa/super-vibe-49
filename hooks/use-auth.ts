"use client";

import type { Session, User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

// Dynamic import to avoid module loading issues
let supabaseClient: any = null;

const getSupabase = async () => {
  if (!supabaseClient) {
    const { default: client } = await import("@/lib/supabase/client");
    supabaseClient = client();
  }
  return supabaseClient;
};

// ============================================
// AUTH HOOKS
// ============================================

/**
 * Get current authenticated user and session
 * @example
 * const { user, session, isLoading } = useAuth()
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      const supabase = await getSupabase();

      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    fetchAuthData();

    const handleAuthStateChange = async (_event: any, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    const listenForAuthChanges = async () => {
      const supabase = await getSupabase();
      const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
      return subscription;
    };

    let subscription: any = null;
    listenForAuthChanges().then((sub: any) => {
      subscription = sub;
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, isLoading };
}

/**
 * Sign up with email and password
 * @example
 * const { signUp, isLoading, error } = useSignUp()
 * await signUp('email@example.com', 'password', { username: 'johndoe' })
 */
export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUp = async (
    email: string,
    password: string,
    metadata?: {
      username?: string;
      full_name?: string;
    }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // Create profile after signup
      if (data.user && metadata) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username: metadata.username || email.split("@")[0],
          full_name: metadata.full_name || "",
        });

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}

/**
 * Sign in with email and password
 * @example
 * const { signIn, isLoading, error } = useSignIn()
 * await signIn('email@example.com', 'password')
 */
export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
      router.refresh();

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
}

/**
 * Sign in with OAuth provider (Google, GitHub, etc.)
 * @example
 * const { signInWithProvider } = useSignInWithProvider()
 * await signInWithProvider('google')
 */
export function useSignInWithProvider() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithProvider = async (
    provider: "google" | "github" | "gitlab"
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWithProvider, isLoading, error };
}

/**
 * Sign out current user
 * @example
 * const { signOut } = useSignOut()
 * await signOut()
 */
export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading, error };
}

/**
 * Reset password (send reset email)
 * @example
 * const { resetPassword, isLoading } = useResetPassword()
 * await resetPassword('email@example.com')
 */
export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, error };
}

/**
 * Update password (after reset)
 * @example
 * const { updatePassword } = useUpdatePassword()
 * await updatePassword('newPassword123')
 */
export function useUpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePassword = async (newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePassword, isLoading, error };
}

/**
 * Check if user is authenticated (simple helper)
 * @example
 * const isAuthenticated = useIsAuthenticated()
 */
export function useIsAuthenticated() {
  const { user, isLoading } = useAuth();
  return !isLoading && !!user;
}

/**
 * Require authentication - redirect to login if not authenticated
 * @example
 * useRequireAuth() // In a protected page component
 */
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}
