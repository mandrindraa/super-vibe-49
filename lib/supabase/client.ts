import { createBrowserClient, createServerClient } from "@supabase/ssr";

export const supabaseUrl =
  process.env.SUPABASE_URL || "https://unqlodpgpyncwqzkgjby.supabase.co";
export const supabaseKey = process.env.SUPABASE_API_KEY || "";

/**
 * Creates a Supabase client for client-side operations
 * Uses public key for browser operations
 */
export function getBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

export default createServerClient;
