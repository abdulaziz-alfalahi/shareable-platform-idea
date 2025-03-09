
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
      const { data: functionData, error: functionError } = await supabase.functions.invoke('create-test-users');
      
      if (functionError) {
        toast({
          title: "Error creating test users",
          description: functionError.message,
          variant: "destructive",
        });
        return;
      }
      
      if (functionData.errors && functionData.errors.length > 0) {
        toast({
          title: "Some users couldn't be created",
          description: `Created ${functionData.results.length} out of ${functionData.results.length + functionData.errors.length} users`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Test users created successfully",
          description: `Created ${functionData.results.length} users with password "Test1234!"`,
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
    <Button onClick={createTestUsers} disabled={isLoading}>
      {isLoading ? "Creating Users..." : "Create Test Users"}
    </Button>
  );
}
