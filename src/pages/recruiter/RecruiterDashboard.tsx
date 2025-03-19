
import React, { useState } from "react";
import RecruiterDashboardHeader from "@/components/recruiter/dashboard/RecruiterDashboardHeader";
import RecruiterDashboardTabs from "@/components/recruiter/dashboard/RecruiterDashboardTabs";

const RecruiterDashboard: React.FC = () => {
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies");
  
  // Mock vacancies data (in a real app, this would come from an API)
  const vacancies = [
    { id: 1, title: "Software Engineer", company: "Tech Co", location: "Abu Dhabi" },
    { id: 2, title: "Project Manager", company: "Business Inc", location: "Dubai" },
    // Add more as needed
  ];

  const handleScheduleInterview = () => {
    console.log("Schedule interview clicked");
    // Implement interview scheduling logic
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <RecruiterDashboardHeader 
        showNotificationsPanel={showNotificationsPanel}
        setShowNotificationsPanel={setShowNotificationsPanel}
      />
      <RecruiterDashboardTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScheduleInterview={handleScheduleInterview}
        vacancies={vacancies}
      />
    </div>
  );
};

export default RecruiterDashboard;
