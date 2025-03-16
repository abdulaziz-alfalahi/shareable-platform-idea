
import { RouteObject } from "react-router-dom";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentProfile from "@/pages/StudentProfile";
import AdvisorDashboard from "@/pages/AdvisorDashboard";
import CareerPassportPage from "@/pages/CareerPassportPage";
import JobApplications from "@/pages/JobApplications";
import JobDetails from "@/pages/JobDetails";
import RecruiterDashboard from "@/pages/RecruiterDashboard";
import MindMap from "@/pages/MindMap";
import DataEntryPage from "@/pages/DataEntryPage";
import TrainingStudentDashboard from "@/pages/TrainingStudentDashboard";
import TrainingInstituteDashboard from "@/pages/TrainingInstituteDashboard";
import EnhancedRetirementPlanning from "@/pages/EnhancedRetirementPlanning";
import AdminDashboard from "@/pages/AdminDashboard";
import EducationalResources from "@/pages/EducationalResources";
import IndustryGuides from "@/pages/IndustryGuides";
import ParentDashboard from "@/pages/ParentDashboard";
import TrainingCenters from "@/pages/TrainingCenters";
import AssessmentCenters from "@/pages/AssessmentCenters";
import JobLocationMatching from "@/pages/JobLocationMatching";
import RetirementPlanningPage from "@/pages/RetirementPlanningPage";
import Achievements from "@/pages/Achievements";
import ResumeBuilder from "@/pages/ResumeBuilder";
import GamificationDashboard from "@/pages/GamificationDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/student-profile/:id",
    element: <StudentProfile />,
  },
  {
    path: "/advisor-dashboard",
    element: <AdvisorDashboard />,
  },
  {
    path: "/career-passport",
    element: <CareerPassportPage />,
  },
  {
    path: "/career-passport/:id",
    element: <CareerPassportPage />,
  },
  {
    path: "/job-applications",
    element: <JobApplications />,
  },
  {
    path: "/job-details/:id",
    element: <JobDetails />,
  },
  {
    path: "/recruiter-dashboard",
    element: <RecruiterDashboard />,
  },
  {
    path: "/mind-map",
    element: <MindMap />,
  },
  {
    path: "/data-entry",
    element: <DataEntryPage />,
  },
  {
    path: "/training-student-dashboard",
    element: <TrainingStudentDashboard />,
  },
  {
    path: "/training-institute-dashboard",
    element: <TrainingInstituteDashboard />,
  },
  {
    path: "/enhanced-retirement-planning",
    element: <EnhancedRetirementPlanning />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/educational-resources",
    element: <EducationalResources />,
  },
  {
    path: "/industry-guides",
    element: <IndustryGuides />,
  },
  {
    path: "/parent-dashboard",
    element: <ParentDashboard />,
  },
  {
    path: "/training-centers",
    element: <TrainingCenters />,
  },
  {
    path: "/assessment-centers",
    element: <AssessmentCenters />,
  },
  {
    path: "/job-location-matching",
    element: <JobLocationMatching />,
  },
  {
    path: "/retirement-planning",
    element: <RetirementPlanningPage />,
  },
  {
    path: "/achievements",
    element: <Achievements />,
  },
  {
    path: "/resume-builder",
    element: <ResumeBuilder />,
  },
];
