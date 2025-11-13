import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * Get the current user session on the server
 * Use this in Server Components, API routes, or server actions
 */
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the current authenticated user on the server
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getServerAuthSession();
  return session?.user || null;
}

/**
 * Protect API routes by checking authentication
 * Throws error if not authenticated
 */
export async function requireAuth() {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
