import { supabaseUrl } from "@/lib/supabase/client";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client for server-side operations
 * Uses service role key for admin operations in API routes
 */
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export async function getServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseServiceRoleKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value }) =>
            cookieStore.set(name, value)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
