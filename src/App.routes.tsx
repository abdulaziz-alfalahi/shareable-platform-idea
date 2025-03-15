
import { RouteObject } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import CareerPassportPage from "./pages/CareerPassportPage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import DataEntryPage from "./pages/DataEntryPage";
import TrainingCenters from "./pages/TrainingCenters";
import AdminDashboard from "./pages/AdminDashboard";
import TrainingStudentDashboard from "@/pages/TrainingStudentDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/career-passport",
    element: <CareerPassportPage />,
  },
  {
    path: "/recruiter-dashboard",
    element: <RecruiterDashboard />,
  },
  {
    path: "/data-entry",
    element: <DataEntryPage />,
  },
  {
    path: "/training-centers",
    element: <TrainingCenters />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/training-student-dashboard",
    element: <TrainingStudentDashboard />,
  },
];
