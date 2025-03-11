
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { students } from "@/data/mockData"; // This would be fetched from an API in a real app
import { Award } from "lucide-react";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";

// Import our new components
import PassportHeader from "@/components/passport/layout/PassportHeader";
import PassportSidebar from "@/components/passport/layout/PassportSidebar";
import PassportTabs from "@/components/passport/layout/PassportTabs";

const CareerPassportPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // In a real app, this would fetch the student data from an API
  React.useEffect(() => {
    // For demo, just use the first student if no ID provided
    const studentId = id ? parseInt(id, 10) : 1;
    const foundStudent = students.find(s => s.id === studentId);
    
    if (foundStudent) {
      setCurrentStudent(foundStudent);
    } else {
      // If no student found, use the first student
      setCurrentStudent(students[0]);
      toast({
        title: "Student Not Found",
        description: "Showing default student profile instead.",
        variant: "destructive"
      });
    }
  }, [id, toast]);

  if (!currentStudent) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
          <h2 className="text-xl font-semibold mt-4">Loading Career Passport...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header with UAE-inspired design */}
      <PassportHeader student={currentStudent} />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar - Student info */}
        <div className="space-y-6">
          <PassportSidebar student={currentStudent} />
        </div>

        {/* Main content - Career Passport */}
        <div className="lg:col-span-2 space-y-6">
          <PassportTabs student={currentStudent} />
        </div>
      </div>
    </div>
  );
};

export default CareerPassportPage;
