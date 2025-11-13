"use client";

import { useSession } from "next-auth/react";

export function useAuthSession() {
  const { data: session, status, update } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return {
    session,
    user: session?.user,
    isLoading,
    isAuthenticated,
    update,
  };
}
