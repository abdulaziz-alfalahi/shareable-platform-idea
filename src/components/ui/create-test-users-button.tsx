
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
        console.error("Function error:", functionError);
        toast({
          title: "Error creating test users",
          description: functionError.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log("Function response:", functionData);
      
      if (!functionData || typeof functionData !== 'object') {
        toast({
          title: "Invalid response from server",
          description: "Received an unexpected response format",
          variant: "destructive",
        });
        return;
      }
      
      const successCount = functionData.results?.filter(r => r.success)?.length || 0;
      const errorCount = functionData.errors?.length || 0;
      
      if (errorCount > 0) {
        // Show first error for more context
        const firstError = functionData.errors[0]?.error || "Unknown error";
        toast({
          title: `Created ${successCount} out of ${successCount + errorCount} users`,
          description: `Error: ${firstError}`,
          variant: "destructive",
        });
      } else if (successCount === 0) {
        toast({
          title: "No users created",
          description: "All users may already exist or there was an issue with the creation process",
          variant: "destructive",
        });
      } else {
        toast({
          title: `Test users created successfully`,
          description: `Created ${successCount} users with password "Test1234!"`,
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
    <Button onClick={createTestUsers} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
      {isLoading ? "Creating Users..." : "Create Test Users"}
    </Button>
  );
}
