
import React, { useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { PlusCircle, FileText, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import tabs
import ProgramsTab from "@/components/training/dashboard/tabs/ProgramsTab";
import StudentsTab from "@/components/training/dashboard/tabs/StudentsTab";
import AssessmentsTab from "@/components/training/dashboard/tabs/AssessmentsTab";
import MetricsTab from "@/components/training/dashboard/tabs/MetricsTab";
import PartnersTab from "@/components/training/dashboard/tabs/PartnersTab";

// Import helpers
import { generateTrainingMetrics } from "@/components/training/dashboard/TrainingMetrics";
import { generateTrainingActions } from "@/components/training/dashboard/TrainingActions";

// Import mock data
import { trainingData } from "@/data/trainingInstituteMockData";

const TrainingInstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const navigate = useNavigate();

  const dashboardTabs = [
    { value: "programs", label: "Programs" },
    { value: "students", label: "Students" },
    { value: "assessments", label: "Assessments" },
    { value: "metrics", label: "Performance Metrics" },
    { value: "partners", label: "Industry Partners" }
  ];

  const dashboardMetrics = generateTrainingMetrics(trainingData);

  const dashboardActions = generateTrainingActions({
    onAddProgram: () => console.log("Add program clicked"),
    onViewReports: () => setActiveTab("metrics"),
    onViewAnalytics: () => console.log("Analytics clicked")
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "programs":
        return <ProgramsTab trainingData={trainingData} />;
      case "students":
        return <StudentsTab />;
      case "assessments":
        return <AssessmentsTab />;
      case "metrics":
        return <MetricsTab />;
      case "partners":
        return <PartnersTab />;
      default:
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Training Institute Dashboard"
      subtitle="Develop the skills of tomorrow's workforce"
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="training"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

export default TrainingInstituteDashboard;
