
import React, { useState, useEffect } from "react";
import RoleDashboardLayout, { DashboardTab } from "@/components/dashboard/RoleDashboardLayout";
import { BookOpen, PlusCircle, FileText, Briefcase, GraduationCap, Award } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { studentData } from "@/data/studentMockData";
import { getStudentDashboardMetrics } from "@/components/student/dashboard/StudentDashboardMetrics";

// Import tab components
import OverviewTab from "@/components/student/dashboard/tabs/OverviewTab";
import CoursesTab from "@/components/student/dashboard/tabs/CoursesTab";
import AssessmentsTab from "@/components/student/dashboard/tabs/AssessmentsTab";
import CareerPathTab from "@/components/student/dashboard/tabs/CareerPathTab";
import MentorsTab from "@/components/student/dashboard/tabs/MentorsTab";
import ScholarshipsTab from "@/components/student/dashboard/tabs/ScholarshipsTab";

const StudentDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabParam || "overview");
  const navigate = useNavigate();

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/student-dashboard?tab=${tab}`, { replace: true });
  };

  // Update tab state if URL parameter changes
  useEffect(() => {
    if (tabParam && ["overview", "courses", "assessments", "career", "mentors", "scholarships"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const dashboardTabs: DashboardTab[] = [
    { value: "overview", label: "Overview" },
    { value: "courses", label: "Courses" },
    { value: "assessments", label: "Assessments" },
    { value: "career", label: "Career Path" },
    { value: "mentors", label: "Mentors" },
    { value: "scholarships", label: "Scholarships" }
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
      case "scholarships":
        return <ScholarshipsTab />;
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
