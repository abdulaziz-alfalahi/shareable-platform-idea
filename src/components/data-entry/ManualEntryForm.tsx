
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import StudentForm from "./form/StudentForm";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingCenterForm from "./form/TrainingCenterForm";
import AssessmentCenterForm from "./form/AssessmentCenterForm";

const ManualEntryForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    description: ""
  });
  const [activeTab, setActiveTab] = useState("student");
  const { toast } = useToast();
  
  const handleStudentSuccess = () => {
    setSuccessMessage({
      title: "Student Record Saved Successfully!",
      description: "The student information has been saved to the platform database and will be available for advisors and career planning."
    });
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

  const handleTrainingCenterSuccess = () => {
    setSuccessMessage({
      title: "Training Center Saved Successfully!",
      description: "The training center information has been saved to the platform database and will be available for students and career planning."
    });
    setShowSuccess(true);
    
    toast({
      title: "Success",
      description: "Training center has been saved successfully",
    });
    
    // Reset after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleAssessmentCenterSuccess = () => {
    setSuccessMessage({
      title: "Assessment Center Saved Successfully!",
      description: "The assessment center information has been saved to the platform database and will be available for students and career planning."
    });
    setShowSuccess(true);
    
    toast({
      title: "Success",
      description: "Assessment center has been saved successfully",
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
          <h3 className="text-xl font-semibold text-gray-800">{successMessage.title}</h3>
          <p className="text-gray-600 max-w-md">
            {successMessage.description}
          </p>
          <div className="flex space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowSuccess(false)}
            >
              Add Another Record
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="student">Student Data</TabsTrigger>
        <TabsTrigger value="training">Training Centers</TabsTrigger>
        <TabsTrigger value="assessment">Assessment Centers</TabsTrigger>
      </TabsList>
      
      <TabsContent value="student">
        <StudentForm onSuccess={handleStudentSuccess} />
      </TabsContent>
      
      <TabsContent value="training">
        <TrainingCenterForm onSuccess={handleTrainingCenterSuccess} />
      </TabsContent>
      
      <TabsContent value="assessment">
        <AssessmentCenterForm onSuccess={handleAssessmentCenterSuccess} />
      </TabsContent>
    </Tabs>
  );
};

export default ManualEntryForm;
