import { lazy } from "react";

export default function defineRoutes() {
  return [
    {
      path: "/",
      element: lazy(() => import("./pages/Home")),
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
      element: lazy(() => import("./pages/CareerPassport")),
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
      element: lazy(() => import("./pages/MindMapPage")),
    },
    {
      path: "/training-centers",
      element: lazy(() => import("./pages/TrainingCentersPage")),
    },
    {
      path: "/data-entry",
      element: lazy(() => import("./pages/DataEntryPage")),
    },
    {
      path: "/recruiter-calendar",
      element: lazy(() => import("./pages/RecruiterCalendarPage")),
    },
    {
      path: "/summer-camps",
      element: lazy(() => import("./pages/SummerCamps")),
    },
  ];
}
