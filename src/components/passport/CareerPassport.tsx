
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";
import PassportHeader from "./PassportHeader";
import PassportNavigation from "./layout/PassportNavigation";
import PassportTabsContent from "./layout/PassportTabsContent";
import { studentData } from "@/data/studentMockData";
import { getPassportStamps } from "@/services/passport/passportService";

interface CareerPassportProps {
  userId?: number; // Make userId optional since we might have a default user
  student?: Student; // Make student optional as well
}

const CareerPassport: React.FC<CareerPassportProps> = ({ userId, student: propStudent }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("passport");
  const [student, setStudent] = useState<Student | undefined>(propStudent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPassportData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // If we don't have a student from props, use either the userId or the default mock data
        const baseStudent = propStudent || (userId ? { ...studentData, id: userId } : studentData);
        
        // Fetch passport stamps
        const stamps = await getPassportStamps(baseStudent.id);
        console.log("Fetched passport stamps:", stamps);
        
        // Update the student with the stamps
        setStudent({
          ...baseStudent,
          passportStamps: stamps
        });
      } catch (err) {
        console.error("Error loading passport data:", err);
        setError("Failed to load passport data. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load passport data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPassportData();
  }, [userId, propStudent, toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">Loading passport data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <p className="text-red-700">{error}</p>
        <button 
          className="mt-2 bg-emirati-oasisGreen text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">No passport data available.</p>
      </div>
    );
  }

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
