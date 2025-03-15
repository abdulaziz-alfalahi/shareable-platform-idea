
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/home/theme/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResumeBuilder from "./pages/ResumeBuilder";
import JobApplications from "./pages/JobApplications";
import JobLocationMatching from "./pages/JobLocationMatching";
import Achievements from "./pages/Achievements";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import StudentProfile from "./pages/StudentProfile";
import AdminDashboard from "./pages/AdminDashboard";
import TrainingCenters from "./pages/TrainingCenters";
import AssessmentCenters from "./pages/AssessmentCenters";
import CareerPassportPage from "./pages/CareerPassportPage";
import RetirementPlanning from "./pages/RetirementPlanning";
import RetirementPlanningPage from "./pages/RetirementPlanningPage";
import EnhancedRetirementPlanning from "./pages/EnhancedRetirementPlanning";
import MindMap from "./pages/MindMap";
import DataEntryPage from "./pages/DataEntryPage";
import IndustryGuides from "./pages/IndustryGuides";
import EducationalResources from "./pages/EducationalResources";
import ParentDashboard from "./pages/ParentDashboard";
import TrainingInstituteDashboard from "./pages/TrainingInstituteDashboard";

// Create a new query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        console.error("Query error:", error);
      }
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/job-applications" element={<JobApplications />} />
              <Route path="/job-location-matching" element={<JobLocationMatching />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
              <Route path="/student/:id" element={<StudentProfile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/data-entry" element={<DataEntryPage />} />
              <Route path="/training-centers" element={<TrainingCenters />} />
              <Route path="/assessment-centers" element={<AssessmentCenters />} />
              <Route path="/career-passport/:id?" element={<CareerPassportPage />} />
              <Route path="/career-passport" element={<CareerPassportPage />} />
              <Route path="/retirement-planning" element={<RetirementPlanningPage />} />
              <Route path="/retirement-planner" element={<RetirementPlanning />} />
              <Route path="/enhanced-retirement-planning" element={<EnhancedRetirementPlanning />} />
              <Route path="/mindmap" element={<MindMap />} />
              <Route path="/industry-guides" element={<IndustryGuides />} />
              <Route path="/educational-resources" element={<EducationalResources />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="/training-dashboard" element={<TrainingInstituteDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
