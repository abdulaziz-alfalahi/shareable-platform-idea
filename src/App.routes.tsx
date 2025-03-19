
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Define a type for our custom route object that works with lazy loaded components
interface AppRouteObject {
  path: string;
  element: React.ComponentType<any>;
  errorElement?: React.ComponentType<any>;
}

// Create a routes array with the correct types
export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: lazy(() => import("./pages/Index")),
  },
  {
    path: "/student-dashboard",
    element: lazy(() => import("./pages/StudentDashboard")),
  },
  {
    path: "/recruiter-dashboard",
    element: lazy(() => import("./pages/RecruiterDashboard")),
  },
  {
    path: "/advisor-dashboard",
    element: lazy(() => import("./pages/AdvisorDashboard")),
  },
  {
    path: "/admin-dashboard",
    element: lazy(() => import("./pages/AdminDashboard")),
  },
  {
    path: "/training-institute-dashboard",
    element: lazy(() => import("./pages/TrainingInstituteDashboard")),
  },
  {
    path: "/job-applications",
    element: lazy(() => import("./pages/JobApplications")),
  },
  {
    path: "/job-location-matching",
    element: lazy(() => import("./pages/JobLocationMatching")),
  },
  {
    path: "/career-passport",
    element: lazy(() => import("./pages/CareerPassportPage")),
  },
  {
    path: "/career-passport/:id",
    element: lazy(() => import("./pages/CareerPassportPage")),
  },
  {
    path: "/achievements",
    element: lazy(() => import("./pages/Achievements")),
  },
  {
    path: "/industry-guides",
    element: lazy(() => import("./pages/IndustryGuides")),
  },
  {
    path: "/educational-resources",
    element: lazy(() => import("./pages/EducationalResources")),
  },
  {
    path: "/enhanced-retirement-planning",
    element: lazy(() => import("./pages/EnhancedRetirementPlanning")),
  },
  {
    path: "/mindmap",
    element: lazy(() => import("./pages/MindMap")),
  },
  {
    path: "/training-centers",
    element: lazy(() => import("./pages/TrainingCenters")),
  },
  {
    path: "/data-entry",
    element: lazy(() => import("./pages/DataEntryPage")),
  },
  {
    path: "/recruiter-calendar",
    element: lazy(() => import("./pages/RecruiterDashboard")), // Fixed: changed to an existing page as placeholder
  },
  {
    path: "/summer-camps",
    element: lazy(() => import("./pages/SummerCamps")),
  },
  // Add a NotFound page for any other routes
  {
    path: "*",
    element: lazy(() => import("./pages/NotFound")),
  },
];

export default function defineRoutes() {
  return routes;
}
