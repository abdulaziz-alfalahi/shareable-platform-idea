
import React, { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";
import PassportHeader from "./PassportHeader";
import PassportNavigation from "./layout/PassportNavigation";
import PassportTabsContent from "./layout/PassportTabsContent";

interface CareerPassportProps {
  userId?: string; // Make userId optional since we might have a default user
  student?: Student; // Make student optional as well
}

const CareerPassport: React.FC<CareerPassportProps> = ({ userId, student: propStudent }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("passport");
  const [student, setStudent] = useState<Student | undefined>(propStudent);

  useEffect(() => {
    // If we don't have a student from props, and we have a userId, fetch the student data
    if (!propStudent && userId) {
      // For now, we'll use a mock student
      // In a real application, you would fetch the student data from an API
      const mockStudent: Student = {
        id: Number(userId) || 1,
        name: "Ahmed Al Mansouri",
        program: "Computer Science",
        year: 3,
        gradeLevel: "university-3",
        gpa: 3.8,
        advisingStatus: "On Track",
        riskLevel: "Low",
        progress: 75,
        lastMeeting: "2023-11-15",
        nextMeeting: "2023-12-15",
        careerPath: "Software Engineering",
        flagged: false,
        coursesCompleted: 18,
        totalCourses: 24,
        achievements: ["Dean's List", "Hackathon Winner"],
        notes: "Showing great progress in programming courses.",
        goals: [],
        feedback: [],
        passportStamps: [],
        careerMilestones: [],
        passportLevel: 3,
        totalPoints: 450,
        leaderboardRank: 1
      };
      
      setStudent(mockStudent);
    }
  }, [userId, propStudent]);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">Loading passport data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PassportHeader student={student} />

      <Tabs
        defaultValue="passport"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <PassportNavigation />
        <PassportTabsContent activeTab={activeTab} student={student} />
      </Tabs>
    </div>
  );
};

export default CareerPassport;
