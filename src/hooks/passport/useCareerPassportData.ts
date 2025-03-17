
import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";
import { getPassportStamps } from "@/services/passport/passportService";
import { studentData } from "@/data/studentMockData";

export const useCareerPassportData = (userId?: number, initialStudent?: Student) => {
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | undefined>(initialStudent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPassportData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // If we don't have a student from props, use either the userId or the default mock data
        const baseStudent = initialStudent || (userId ? { ...studentData, id: userId } : studentData);
        
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
  }, [userId, initialStudent, toast]);

  return {
    student,
    loading,
    error
  };
};
