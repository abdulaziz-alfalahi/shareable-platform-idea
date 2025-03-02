
import React, { useState } from "react";
import { adminDashboardData } from "@/data/adminMockData";
import DashboardHeader from "@/components/admin/DashboardHeader";
import TabNavigation from "@/components/admin/TabNavigation";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Interview data for the chart
  const interviewsData = [
    adminDashboardData.interviewsScheduled,
    adminDashboardData.interviewsCompleted
  ];

  // Configure columns for tables
  const pathColumns = [
    { key: "path", label: "Educational Path" },
    { 
      key: "studentsCount", 
      label: "Students", 
      render: (value: number) => value.toLocaleString() 
    },
    { 
      key: "growth", 
      label: "Growth", 
      render: (value: number) => (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          {value > 0 ? "+" : ""}{value}%
        </span>
      )
    }
  ];

  const recruiterColumns = [
    { key: "name", label: "Company" },
    { key: "openPositions", label: "Open Positions" },
    { key: "hires", label: "Hires" }
  ];

  const trainingColumns = [
    { key: "name", label: "Training Center" },
    { key: "programs", label: "Programs" },
    { key: "enrollments", label: "Enrollments" }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <DashboardHeader 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        showNotificationsPanel={showNotificationsPanel}
        setShowNotificationsPanel={setShowNotificationsPanel}
      />

      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminDashboardData={adminDashboardData}
        interviewsData={interviewsData}
        pathColumns={pathColumns}
        recruiterColumns={recruiterColumns}
        trainingColumns={trainingColumns}
      />
    </div>
  );
};

export default AdminDashboard;
