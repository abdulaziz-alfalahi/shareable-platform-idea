
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/toast";
import { useNavigate } from "react-router-dom";

export const useSupabaseAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. If you're using a test account, make sure you've registered it first.";
      }
      
      toast({
        title: "Sign in failed",
        description: errorMessage,
        type: "error",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: string) => {
    try {
      // Log what we're sending for debugging
      console.log("Signup data:", { email, name, role });
      
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
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now sign in.",
        type: "success",
      });
      
    } catch (error: any) {
      console.error("Sign up error:", error);
      
      // Provide more helpful error messages
      let errorMessage = error.message;
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please try signing in instead.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        type: "error",
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
        type: "info",
      });
      
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        type: "error",
      });
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};
