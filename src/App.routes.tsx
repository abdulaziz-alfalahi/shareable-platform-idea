
import React from "react";
import { Route, Routes } from "react-router-dom";

// Import pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentProfile from "@/pages/StudentProfile";
import AdvisorDashboard from "@/pages/AdvisorDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import JobApplications from "@/pages/JobApplications";
import JobLocationMatching from "@/pages/JobLocationMatching";
import TrainingCenters from "@/pages/TrainingCenters";
import AssessmentCenters from "@/pages/AssessmentCenters";
import DataEntryPage from "@/pages/DataEntryPage";
import MindMap from "@/pages/MindMap";
import RecruiterDashboard from "@/pages/RecruiterDashboard";
import ResumeBuilder from "@/pages/ResumeBuilder";
import RetirementPlanningPage from "@/pages/RetirementPlanningPage";
import EnhancedRetirementPlanning from "@/pages/EnhancedRetirementPlanning";
import CareerPassportPage from "@/pages/CareerPassportPage";
import Achievements from "@/pages/Achievements";
import EducationalResources from "@/pages/EducationalResources";
import IndustryGuides from "@/pages/IndustryGuides";
import ParentDashboard from "@/pages/ParentDashboard";
import TrainingInstituteDashboard from "@/pages/TrainingInstituteDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student/:id" element={<StudentProfile />} />
      <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/job-applications" element={<JobApplications />} />
      <Route path="/job-location-matching" element={<JobLocationMatching />} />
      <Route path="/training-centers" element={<TrainingCenters />} />
      <Route path="/training-dashboard" element={<TrainingInstituteDashboard />} />
      <Route path="/assessment-centers" element={<AssessmentCenters />} />
      <Route path="/data-entry" element={<DataEntryPage />} />
      <Route path="/mindmap" element={<MindMap />} />
      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/retirement-planning" element={<RetirementPlanningPage />} />
      <Route path="/enhanced-retirement-planning" element={<EnhancedRetirementPlanning />} />
      <Route path="/career-passport/:id?" element={<CareerPassportPage />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/educational-resources" element={<EducationalResources />} />
      <Route path="/industry-guides" element={<IndustryGuides />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
