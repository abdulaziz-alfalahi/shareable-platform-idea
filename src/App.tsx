
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UnauthenticatedRoute from "@/components/auth/UnauthenticatedRoute";
import Navbar from "@/components/layout/Navbar";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ResumeBuilder from "./pages/ResumeBuilder";
import JobApplications from "./pages/JobApplications";
import JobLocationMatching from "./pages/JobLocationMatching";
import Achievements from "./pages/Achievements";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import StudentProfile from "./pages/StudentProfile";

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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            } />
            <Route path="/register" element={
              <UnauthenticatedRoute>
                <Register />
              </UnauthenticatedRoute>
            } />
            
            {/* Protected routes - Students only */}
            <Route path="/resume-builder" element={
              <ProtectedRoute roles="student">
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            <Route path="/job-applications" element={
              <ProtectedRoute roles="student">
                <JobApplications />
              </ProtectedRoute>
            } />
            <Route path="/job-location-matching" element={
              <ProtectedRoute roles="student">
                <JobLocationMatching />
              </ProtectedRoute>
            } />
            <Route path="/achievements" element={
              <ProtectedRoute roles="student">
                <Achievements />
              </ProtectedRoute>
            } />
            <Route path="/student-dashboard" element={
              <ProtectedRoute roles="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Recruiters only */}
            <Route path="/recruiter-dashboard" element={
              <ProtectedRoute roles="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Advisors only */}
            <Route path="/advisor-dashboard" element={
              <ProtectedRoute roles="advisor">
                <AdvisorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Advisors and Recruiters */}
            <Route path="/student/:id" element={
              <ProtectedRoute roles={["advisor", "recruiter"]}>
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
