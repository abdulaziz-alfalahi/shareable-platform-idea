
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import StudentForm from "./form/StudentForm";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";

const ManualEntryForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  
  const handleFormSuccess = () => {
    setShowSuccess(true);
    
    toast({
      title: "Success",
      description: "Student record has been saved successfully",
    });
    
    // Reset after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  if (showSuccess) {
    return (
      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Student Record Saved Successfully!</h3>
          <p className="text-gray-600 max-w-md">
            The student information has been saved to the platform database and will be available for advisors and career planning.
          </p>
          <div className="flex space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowSuccess(false)}
            >
              Add Another Student
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return <StudentForm onSuccess={handleFormSuccess} />;
};

export default ManualEntryForm;
