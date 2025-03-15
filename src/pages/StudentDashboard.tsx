
import React, { useState } from "react";
import RoleDashboardLayout, { DashboardTab } from "@/components/dashboard/RoleDashboardLayout";
import { BookOpen, PlusCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { studentData } from "@/data/studentMockData";
import { getStudentDashboardMetrics } from "@/components/student/dashboard/StudentDashboardMetrics";

// Import tab components
import OverviewTab from "@/components/student/dashboard/tabs/OverviewTab";
import CoursesTab from "@/components/student/dashboard/tabs/CoursesTab";
import AssessmentsTab from "@/components/student/dashboard/tabs/AssessmentsTab";
import CareerPathTab from "@/components/student/dashboard/tabs/CareerPathTab";
import MentorsTab from "@/components/student/dashboard/tabs/MentorsTab";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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
      label: "Resume",
      onClick: () => navigate("/resume-builder"),
      icon: <FileText className="h-4 w-4" />
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
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Student Dashboard"
      subtitle="Welcome back, Mohammed. Continue your journey to excellence."
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="student"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

export default StudentDashboard;
