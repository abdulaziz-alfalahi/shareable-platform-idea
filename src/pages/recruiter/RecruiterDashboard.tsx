
import React from "react";
import RecruiterDashboardHeader from "@/components/recruiter/dashboard/RecruiterDashboardHeader";
import RecruiterDashboardTabs from "@/components/recruiter/dashboard/RecruiterDashboardTabs";

const RecruiterDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <RecruiterDashboardHeader />
      <RecruiterDashboardTabs />
    </div>
  );
};

export default RecruiterDashboard;
