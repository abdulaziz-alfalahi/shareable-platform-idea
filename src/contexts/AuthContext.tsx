
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/toast";
import { useNavigate } from "react-router-dom";
import { Enums } from "@/integrations/supabase/types";

// Define types for our context
type UserRole = Enums<"user_role">;

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on component mount
    const checkSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      } else if (data.session) {
        // If session exists, fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        
        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          setUser(null);
        } else {
          setUser({
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role as UserRole
          });
        }
      }
      
      setLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === "SIGNED_IN" && session) {
        // If user signed in, fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          setUser(null);
        } else {
          setUser({
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role as UserRole
          });
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error.message);
        throw error;
      }

      console.log("Sign in successful:", data);
      navigate("/");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) {
        console.error("Sign up error:", error.message);
        throw error;
      }

      console.log("Sign up successful:", data);
      
      // Note: We don't navigate here because the user might need to confirm their email first
      // depending on Supabase settings
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
