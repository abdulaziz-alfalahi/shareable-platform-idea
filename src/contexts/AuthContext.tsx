
import React from "react";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { useSupabaseAuth } from "@/hooks/auth/useSupabaseAuth";
import { AuthContext } from "@/hooks/auth/useAuth";
import type { AuthContextType } from "@/hooks/auth/useAuth";
import { UserRole } from "@/types/auth";

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthState();
  const { signIn, signUp, signOut } = useSupabaseAuth();

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Re-export the hook for convenience
export { useAuth } from "@/hooks/auth/useAuth";
