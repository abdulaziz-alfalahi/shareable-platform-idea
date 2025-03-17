
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import PassportHeader from "./PassportHeader";
import PassportNavigation from "./layout/PassportNavigation";
import PassportTabsContent from "./layout/PassportTabsContent";
import PassportLoading from "./PassportLoading";
import PassportError from "./PassportError";
import { useCareerPassportData } from "@/hooks/passport/useCareerPassportData";

interface CareerPassportProps {
  userId?: number; // Make userId optional since we might have a default user
  student?: Student; // Make student optional as well
}

const CareerPassport: React.FC<CareerPassportProps> = ({ userId, student: propStudent }) => {
  const [activeTab, setActiveTab] = useState("passport");
  
  const { 
    student, 
    loading, 
    error 
  } = useCareerPassportData(userId, propStudent);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Render loading state
  if (loading) {
    return <PassportLoading />;
  }

  // Render error state
  if (error) {
    return <PassportError errorMessage={error} onRetry={handleRetry} />;
  }

  // Render empty state
  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">No passport data available.</p>
      </div>
    );
  }

  // Render main content
  return (
    <div className="container mx-auto py-8 px-4">
      <PassportHeader student={student} />

      <Tabs
        defaultValue="passport"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <PassportNavigation />
        <PassportTabsContent activeTab={activeTab} student={student} />
      </Tabs>
    </div>
  );
};

export default CareerPassport;
