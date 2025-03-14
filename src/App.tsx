import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MindMap from "./pages/MindMap";
import DataEntryPage from "./pages/DataEntryPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/retirement-planning" element={<RetirementPlanningPage />} />
            <Route path="/mindmap" element={<MindMap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
