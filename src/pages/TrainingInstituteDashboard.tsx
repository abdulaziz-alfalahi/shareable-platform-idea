
import React, { useState } from "react";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { PlusCircle, FileText, BarChart2 } from "lucide-react";

// Import TabContent
import TabContent from "@/components/training/dashboard/TabContent";

// Import helpers
import { generateTrainingMetrics } from "@/components/training/dashboard/TrainingMetrics";
import { generateTrainingActions } from "@/components/training/dashboard/TrainingActions";

// Import mock data
import { trainingData } from "@/data/trainingInstituteMockData";

const TrainingInstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState("programs");

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
      <TabContent activeTab={activeTab} trainingData={trainingData} />
    </RoleDashboardLayout>
  );
};

export default TrainingInstituteDashboard;
