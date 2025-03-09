
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
          type: "error",
        });
        return;
      }
      
      console.log("Function response:", functionData);
      
      if (functionData.errors && functionData.errors.length > 0) {
        toast({
          title: "Some users couldn't be created",
          description: `Created ${functionData.results.length} out of ${functionData.results.length + functionData.errors.length} users`,
          variant: "destructive",
          type: "warning",
        });
      } else {
        toast({
          title: "Test users created successfully",
          description: `Created ${functionData.results.length} users with password "Test1234!"`,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error creating test users:", error);
      toast({
        title: "Error creating test users",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
        type: "error",
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
