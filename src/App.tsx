
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
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/shared/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/resume-builder" element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            
            <Route path="/job-applications" element={
              <ProtectedRoute>
                <JobApplications />
              </ProtectedRoute>
            } />
            
            <Route path="/job-location-matching" element={
              <ProtectedRoute>
                <JobLocationMatching />
              </ProtectedRoute>
            } />
            
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />
            
            <Route path="/student-dashboard" element={
              <ProtectedRoute requiredRoles={["school_student", "university_student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/recruiter-dashboard" element={
              <ProtectedRoute requiredRoles={["recruiter", "internship_coordinator"]}>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/advisor-dashboard" element={
              <ProtectedRoute requiredRoles={["advisor", "coach"]}>
                <AdvisorDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/student/:id" element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRoles={["admin", "leadership"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/training-centers" element={
              <ProtectedRoute>
                <TrainingCenters />
              </ProtectedRoute>
            } />
            
            <Route path="/assessment-centers" element={
              <ProtectedRoute>
                <AssessmentCenters />
              </ProtectedRoute>
            } />
            
            <Route path="/career-passport/:id?" element={
              <ProtectedRoute>
                <CareerPassportPage />
              </ProtectedRoute>
            } />
            
            <Route path="/retirement-planning" element={
              <ProtectedRoute>
                <RetirementPlanning />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
