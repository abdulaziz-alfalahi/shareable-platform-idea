
import React, { useState } from "react";
import DashboardHeader from "@/components/advisor/DashboardHeader";
import DashboardFilters from "@/components/advisor/DashboardFilters";
import StudentList from "@/components/advisor/StudentList";
import { Student } from "@/types/student";
import { getStatusBadgeVariant, getRiskBadgeVariant, formatDate } from "@/utils/advisorUtils";

const AdvisorDashboard: React.FC = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  
  // Mock student data (in a real app, this would come from an API)
  const students: Student[] = [
    { 
      id: 1, 
      name: "Ahmed Ali", 
      program: "Computer Science", 
      year: 3, 
      gradeLevel: "university-3", 
      gpa: 3.7, 
      advisingStatus: "Active", 
      riskLevel: "Low",
      progress: 75,
      lastMeeting: "2023-05-15",
      nextMeeting: "2023-06-15",
      careerPath: "Software Engineering",
      flagged: false,
      coursesCompleted: 18,
      totalCourses: 40,
      achievements: ["Dean's List", "Hackathon Winner"],
      notes: "Excellent progress in core CS subjects",
      goals: [],
      feedback: [],
      passportStamps: [],
      careerMilestones: [],
      passportLevel: 2,
      totalPoints: 350
    },
    { 
      id: 2, 
      name: "Fatima Mohammed", 
      program: "Business", 
      year: 2, 
      gradeLevel: "university-2", 
      gpa: 3.2, 
      advisingStatus: "Inactive", 
      riskLevel: "Medium",
      progress: 45,
      lastMeeting: "2023-04-10",
      nextMeeting: "2023-07-01",
      careerPath: "Marketing",
      flagged: true,
      coursesCompleted: 12,
      totalCourses: 40,
      achievements: ["Marketing Competition Finalist"],
      notes: "Needs more engagement in group activities",
      goals: [],
      feedback: [],
      passportStamps: [],
      careerMilestones: [],
      passportLevel: 1,
      totalPoints: 150
    }
  ];

  const handleAddFeedback = (student: Student) => {
    console.log("Add feedback for student", student.id);
  };

  const handleAddGoal = (student: Student) => {
    console.log("Add goal for student", student.id);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader 
        title="Advisor Dashboard" 
      />
      <DashboardFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
      />
      <StudentList 
        students={students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        onAddFeedback={handleAddFeedback}
        onAddGoal={handleAddGoal}
        getStatusBadgeVariant={getStatusBadgeVariant}
        getRiskBadgeVariant={getRiskBadgeVariant}
        formatDate={formatDate}
      />
    </div>
  );
};

export default AdvisorDashboard;
