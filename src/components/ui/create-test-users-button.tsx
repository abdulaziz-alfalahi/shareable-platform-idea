
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function CreateTestUsersButton() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createTestUsers = async () => {
    setIsLoading(true);
    try {
      toast({
        title: "Creating test users...",
        description: "This may take a moment.",
      });
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke('create-test-users');
      
      if (functionError) {
        console.error("Function invocation error:", functionError);
        toast({
          title: "Error invoking create-test-users function",
          description: functionError.message || "Unknown error",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Function response:", functionData);
      
      if (!functionData) {
        toast({
          title: "Invalid response from server",
          description: "No data returned from function",
          variant: "destructive",
        });
        return;
      }
      
      // Count new users created (excluding "already exists" cases)
      const newUsersCount = functionData.results?.filter(r => r.success && !r.message)?.length || 0;
      const existingUsersCount = functionData.results?.filter(r => r.success && r.message === "User already exists")?.length || 0;
      const errorCount = functionData.errors?.length || 0;
      
      if (errorCount > 0) {
        // Show detailed error information
        const firstError = functionData.errors[0];
        const errorMessage = firstError.error || "Unknown error";
        const errorRole = firstError.role || "";
        
        toast({
          title: `Created ${newUsersCount} new users, ${existingUsersCount} already existed`,
          description: `Error with ${errorRole} role: ${errorMessage}`,
          variant: "destructive",
        });
      } else if (newUsersCount === 0 && existingUsersCount === 0) {
        toast({
          title: "No users created",
          description: "No users were created or found",
          variant: "destructive",
        });
      } else if (newUsersCount === 0 && existingUsersCount > 0) {
        toast({
          title: "All users already exist",
          description: `${existingUsersCount} users already exist with password "Test1234!"`,
        });
      } else {
        toast({
          title: "Test users created successfully",
          description: `Created ${newUsersCount} new users, ${existingUsersCount} already existed. All users have password "Test1234!"`,
        });
      }
    } catch (error) {
      console.error("Error creating test users:", error);
      toast({
        title: "Error creating test users",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={createTestUsers} 
        disabled={isLoading} 
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        {isLoading ? "Creating Users..." : "Create Test Users"}
      </Button>
      <p className="text-sm text-muted-foreground">
        This will create test accounts for all roles with password "Test1234!". Email format: role.name@example.com
      </p>
    </div>
  );
}
