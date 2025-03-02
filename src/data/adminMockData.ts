
import { AdminDashboardData } from "@/types/admin";
import { BarChart2, Users, Briefcase, GraduationCap, Building, Award, Heart, UserPlus } from "lucide-react";

// Helper function to generate time series data
const generateTimeSeriesData = (
  months: number = 12,
  baseValue: number = 100,
  volatility: number = 0.2,
  trend: number = 0.05
): { date: string; value: number }[] => {
  const now = new Date();
  const data = [];
  
  for (let i = 0; i < months; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (months - 1) + i, 1);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    const year = monthDate.getFullYear();
    
    // Calculate value with some randomness, but following a trend
    const trendFactor = 1 + (trend * i);
    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
    const value = Math.round(baseValue * trendFactor * randomFactor);
    
    data.push({
      date: `${monthName} ${year}`,
      value
    });
  }
  
  return data;
};

export const adminDashboardData: AdminDashboardData = {
  totalStudents: {
    id: "total-students",
    name: "Total Students",
    value: 15842,
    change: 12.5,
    icon: "Users"
  },
  totalRecruiters: {
    id: "total-recruiters",
    name: "Total Recruiters",
    value: 324,
    change: 8.3,
    icon: "Briefcase"
  },
  totalVacancies: {
    id: "total-vacancies",
    name: "Total Vacancies",
    value: 1253,
    change: 15.7,
    icon: "Briefcase"
  },
  totalInternships: {
    id: "total-internships",
    name: "Total Internships",
    value: 487,
    change: 22.4,
    icon: "GraduationCap"
  },
  totalTrainingCenters: {
    id: "total-training-centers",
    name: "Training Centers",
    value: 87,
    change: 5.2,
    icon: "Building"
  },
  totalAssessmentCenters: {
    id: "total-assessment-centers",
    name: "Assessment Centers",
    value: 42,
    change: 3.9,
    icon: "Award"
  },
  totalAdvisors: {
    id: "total-advisors",
    name: "Advisors & Coaches",
    value: 156,
    change: 11.8,
    icon: "Heart"
  },
  totalParents: {
    id: "total-parents",
    name: "Parents",
    value: 9874,
    change: 7.6,
    icon: "UserPlus"
  },
  
  usersByType: [
    { type: "School Students", count: 6245, active: 4812, growth: 14.2 },
    { type: "University Students", count: 9597, active: 8453, growth: 10.8 },
    { type: "Recruiters", count: 324, active: 287, growth: 8.3 },
    { type: "Training Centers", count: 87, active: 82, growth: 5.2 },
    { type: "Assessment Centers", count: 42, active: 39, growth: 3.9 },
    { type: "Advisors & Coaches", count: 156, active: 142, growth: 11.8 },
    { type: "Parents", count: 9874, active: 7248, growth: 7.6 }
  ],
  
  studentsByAgeGroup: [
    { group: "13-15", count: 2345 },
    { group: "16-18", count: 3900 },
    { group: "19-22", count: 5870 },
    { group: "23-26", count: 2987 },
    { group: "27+", count: 740 }
  ],
  
  registrationsOverTime: generateTimeSeriesData(12, 150, 0.3, 0.08),
  activeUsersOverTime: generateTimeSeriesData(12, 5000, 0.15, 0.04),
  
  interviewsScheduled: generateTimeSeriesData(12, 180, 0.25, 0.06),
  interviewsCompleted: generateTimeSeriesData(12, 130, 0.25, 0.06),
  
  topEducationalPaths: [
    { path: "Computer Science", studentsCount: 2874, growth: 18.9 },
    { path: "Business Administration", studentsCount: 2156, growth: 12.3 },
    { path: "Engineering", studentsCount: 1987, growth: 15.7 },
    { path: "Medicine", studentsCount: 1654, growth: 9.8 },
    { path: "Data Science", studentsCount: 1432, growth: 24.5 }
  ],
  
  topRecruiters: [
    { name: "Emirates Group", openPositions: 87, hires: 62 },
    { name: "ADNOC", openPositions: 74, hires: 58 },
    { name: "Etisalat", openPositions: 68, hires: 51 },
    { name: "Emaar Properties", openPositions: 53, hires: 42 },
    { name: "Dubai Holding", openPositions: 49, hires: 38 }
  ],
  
  topTrainingCenters: [
    { name: "Future Skills Academy", programs: 24, enrollments: 1872 },
    { name: "Emirates Institute", programs: 18, enrollments: 1564 },
    { name: "UAE Digital Training", programs: 15, enrollments: 1342 },
    { name: "Abu Dhabi Learning Hub", programs: 12, enrollments: 1125 },
    { name: "Dubai Knowledge Park", programs: 10, enrollments: 968 }
  ],
  
  jobApplicationsStatus: [
    { name: "Applied", value: 3245 },
    { name: "Shortlisted", value: 1876 },
    { name: "Interviewed", value: 1253 },
    { name: "Offered", value: 768 },
    { name: "Accepted", value: 624 },
    { name: "Rejected", value: 1453 }
  ],
  
  placementRate: 68.4,
  averageTimeToHire: 23 // days
};
