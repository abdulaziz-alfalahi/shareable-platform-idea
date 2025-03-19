
import React, { useState } from "react";
import RecruiterDashboardHeader from "@/components/recruiter/dashboard/RecruiterDashboardHeader";
import RecruiterDashboardTabs from "@/components/recruiter/dashboard/RecruiterDashboardTabs";
import { Vacancy } from "@/utils/career/types";

const RecruiterDashboard: React.FC = () => {
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies");
  
  // Mock vacancies data with required Vacancy type properties
  const vacancies: Vacancy[] = [
    { 
      id: 1, 
      title: "Software Engineer", 
      company: "Tech Co", 
      location: "Abu Dhabi",
      type: "Full-time",
      requiredSkills: ["JavaScript", "React", "Node.js"],
      description: "We are looking for a talented Software Engineer to join our team in Abu Dhabi."
    },
    { 
      id: 2, 
      title: "Project Manager", 
      company: "Business Inc", 
      location: "Dubai",
      type: "Full-time",
      requiredSkills: ["Project Management", "Agile", "Team Leadership"],
      description: "Experienced Project Manager needed to lead digital transformation projects."
    },
    { 
      id: 3, 
      title: "UX Designer", 
      company: "Creative Studio", 
      location: "Sharjah",
      type: "Part-time",
      requiredSkills: ["Figma", "User Research", "Prototyping"],
      salary: "15,000-20,000 AED",
      description: "Part-time UX Designer to help create intuitive digital experiences."
    }
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
