import { lazy } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Shared Pages
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MindMap from "./pages/MindMap";
import CareerPassport from "./pages/CareerPassport";
import OnboardingPage from "./pages/OnboardingPage";
import UserManagement from "./pages/UserManagement";

// Student Pages
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));

// Recruiter Pages
const RecruiterDashboard = lazy(() => import("./pages/recruiter/RecruiterDashboard"));

// Advisor Pages
const AdvisorDashboard = lazy(() => import("./pages/advisor/AdvisorDashboard"));

// Training Pages
const TrainingDashboard = lazy(() => import("./pages/training/TrainingDashboard"));

// Parent Pages
const ParentDashboard = lazy(() => import("./pages/parent/ParentDashboard"));

// Define routes
export const routes = [
  {
    path: "/",
    element: HomePage,
    layout: MainLayout,
  },
  {
    path: "/onboarding",
    element: OnboardingPage,
    layout: MainLayout,
  },
  {
    path: "/student-dashboard",
    element: StudentDashboard,
    layout: DashboardLayout,
  },
  {
    path: "/recruiter-dashboard",
    element: RecruiterDashboard,
    layout: DashboardLayout,
  },
  {
    path: "/advisor-dashboard",
    element: AdvisorDashboard,
    layout: DashboardLayout,
  },
  {
    path: "/training-dashboard",
    element: TrainingDashboard,
    layout: DashboardLayout,
  },
  {
    path: "/parent-dashboard",
    element: ParentDashboard,
    layout: DashboardLayout,
  },
  {
    path: "/mindmap",
    element: MindMap,
    layout: DashboardLayout,
  },
  {
    path: "/career-passport",
    element: CareerPassport,
    layout: DashboardLayout,
  },
  {
    path: "/user-management",
    element: UserManagement
  },
  {
    path: "*",
    element: ErrorPage,
  },
];
