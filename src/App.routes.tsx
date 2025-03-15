import { RouteObject } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import CareerPassport from "./pages/CareerPassport";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import DataEntryForm from "./pages/DataEntryForm";
import TrainingCenters from "./pages/TrainingCenters";
import SkillPassportPage from "./pages/SkillPassportPage";
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
    element: <CareerPassport />,
  },
  {
    path: "/recruiter-dashboard",
    element: <RecruiterDashboard />,
  },
  {
    path: "/data-entry",
    element: <DataEntryForm />,
  },
  {
    path: "/training-centers",
    element: <TrainingCenters />,
  },
  {
    path: "/skill-passport",
    element: <SkillPassportPage />,
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
