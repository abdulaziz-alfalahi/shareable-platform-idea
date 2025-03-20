import React, { useState, useEffect } from "react";
import RoleDashboardLayout, { DashboardTab } from "@/components/dashboard/RoleDashboardLayout";
import { BookOpen, PlusCircle, FileText, Briefcase, Compass } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { studentData } from "@/data/studentMockData";
import { getStudentDashboardMetrics } from "@/components/student/dashboard/StudentDashboardMetrics";

import OverviewTab from "@/components/student/dashboard/tabs/OverviewTab";
import CoursesTab from "@/components/student/dashboard/tabs/CoursesTab";
import AssessmentsTab from "@/components/student/dashboard/tabs/AssessmentsTab";
import CareerPathTab from "@/components/student/dashboard/tabs/CareerPathTab";
import MentorsTab from "@/components/student/dashboard/tabs/MentorsTab";

const StudentDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabParam || "overview");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/student-dashboard?tab=${tab}`, { replace: true });
  };

  useEffect(() => {
    if (tabParam && ["overview", "courses", "assessments", "career", "mentors"].includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      setActiveTab("overview");
    }
  }, [tabParam]);

  const dashboardTabs: DashboardTab[] = [
    { value: "overview", label: "Overview" },
    { value: "courses", label: "Courses" },
    { value: "assessments", label: "Assessments" },
    { value: "career", label: "Career Path" },
    { value: "mentors", label: "Mentors" }
  ];

  const dashboardMetrics = getStudentDashboardMetrics(studentData);

  const dashboardActions = [
    {
      label: "New Course",
      onClick: () => navigate("/educational-resources"),
      icon: <PlusCircle className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Job Matching",
      onClick: () => navigate("/job-applications"),
      icon: <Briefcase className="h-4 w-4" />,
      variant: "secondary" as const
    },
    {
      label: "Career Exploration",
      onClick: () => navigate("/career-exploration"),
      icon: <Compass className="h-4 w-4" />,
      variant: "default" as const
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab student={studentData} />;
      case "courses":
        return <CoursesTab />;
      case "assessments":
        return <AssessmentsTab />;
      case "career":
        return <CareerPathTab />;
      case "mentors":
        return <MentorsTab />;
      default:
        return <OverviewTab student={studentData} />;
    }
  };

  return (
    <RoleDashboardLayout
      title="Student Dashboard"
      subtitle="Welcome back, Mohammed. Continue your journey to excellence."
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      role="student"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

export default StudentDashboard;
