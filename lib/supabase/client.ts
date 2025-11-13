import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://unqlodpgpyncwqzkgjby.supabase.co";
const supabaseKey = process.env.SUPABASE_API_KEY || "";

/**
 * Creates a Supabase client for server-side operations
 * Uses service role key for admin operations in API routes
 */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Creates a Supabase client for client-side operations
 * Uses public key for browser operations
 */
export function createBrowserClient() {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

export default createServerClient;
