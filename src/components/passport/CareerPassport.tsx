
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import PassportHeader from "./PassportHeader";
import PassportNavigation from "./layout/PassportNavigation";
import PassportTabsContent from "./layout/PassportTabsContent";
import PassportLoading from "./PassportLoading";
import PassportError from "./PassportError";
import { useCareerPassportData } from "@/hooks/passport/useCareerPassportData";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";
import { Award } from "lucide-react";

interface CareerPassportProps {
  userId?: number;
  student?: Student;
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

  // Render loading state with improved styling
  if (loading) {
    return <PassportLoading />;
  }

  // Render error state with improved styling
  if (error) {
    return <PassportError errorMessage={error} onRetry={handleRetry} />;
  }

  // Render empty state with improved styling
  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Award className="h-10 w-10 text-gray-400" />
        </div>
        <p className="text-lg text-gray-500 mb-2">No passport data available</p>
        <p className="text-sm text-gray-400 text-center max-w-md">
          Your career passport data could not be loaded. This might be due to missing permissions or unregistered account.
        </p>
      </div>
    );
  }

  // Render main content with improved styling
  return (
    <div className="relative">
      {/* Background patterns */}
      <UaeGeometricPattern 
        type="palm" 
        position="background" 
        className="fixed -z-10 opacity-[0.03] left-0 top-0 w-full h-full" 
      />
      
      <div className="container mx-auto py-6 px-4 md:px-6">
        <PassportHeader student={student} />

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
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
      </div>
    </div>
  );
};

export default CareerPassport;
