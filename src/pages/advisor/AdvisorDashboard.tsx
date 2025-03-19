
import React from "react";
import DashboardHeader from "@/components/advisor/DashboardHeader";
import DashboardFilters from "@/components/advisor/DashboardFilters";
import StudentList from "@/components/advisor/StudentList";

const AdvisorDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader />
      <DashboardFilters />
      <StudentList />
    </div>
  );
};

export default AdvisorDashboard;
