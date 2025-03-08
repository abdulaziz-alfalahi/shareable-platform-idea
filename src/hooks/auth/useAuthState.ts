
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
} | null;

export const useAuthState = () => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

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
            role: profileData.role
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
            role: profileData.role
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

  return {
    user,
    loading,
    setUser
  };
};
