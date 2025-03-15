
import React from "react";
import { Student } from "@/types/student";
import { DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { BookOpen, Trophy, Users, Calendar } from "lucide-react";

export const getStudentDashboardMetrics = (student: Student): DashboardMetric[] => {
  return [
    { 
      label: "Courses Completed", 
      value: student.coursesCompleted, 
      change: "+2 this month", 
      trend: "up", 
      icon: <BookOpen className="w-4 h-4" />
    },
    { 
      label: "Passport Level", 
      value: student.passportLevel, 
      description: `${student.totalPoints} total points`, 
      icon: <Trophy className="w-4 h-4" />
    },
    { 
      label: "Active Mentors", 
      value: 2, 
      change: "1 new connection", 
      trend: "up", 
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Next Assessment", 
      value: "In 3 days", 
      description: "Programming Skills",
      icon: <Calendar className="w-4 h-4" />
    }
  ];
};
