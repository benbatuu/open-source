"use client";

import { useAuth as useAuthContext } from "@/lib/contexts/auth-context";

export function useAuth() {
  const { user, isLoading, login, logout, isAuthenticated } = useAuthContext();

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };
}
