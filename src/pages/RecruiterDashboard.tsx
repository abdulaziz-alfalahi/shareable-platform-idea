
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/toast";
import { notifyRecruiter, notifySuccess } from "@/utils/notification";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";
import RecruiterDashboardHeader from "@/components/recruiter/dashboard/RecruiterDashboardHeader";
import RecruiterDashboardTabs from "@/components/recruiter/dashboard/RecruiterDashboardTabs";

const vacancies = [
  {
    id: 1,
    title: "UI/UX Designer",
    department: "Digital Products",
    location: "Downtown Dubai, UAE",
    type: "Full-time",
    requirements: ["UI/UX design experience", "Figma proficiency", "User research"],
    status: "Open",
    datePosted: "2023-10-15",
    coordinates: { latitude: 25.2048, longitude: 55.2708 }
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Analytics",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    requirements: ["Python", "Machine Learning", "Statistical Analysis"],
    status: "Open",
    datePosted: "2023-10-10",
    coordinates: { latitude: 24.4539, longitude: 54.3773 }
  },
  {
    id: 3,
    title: "Software Engineer",
    department: "IT",
    location: "Sharjah, UAE",
    type: "Full-time",
    requirements: ["Java", "Spring Boot", "Microservices"],
    status: "Draft",
    datePosted: "2023-10-18",
    coordinates: { latitude: 25.3463, longitude: 55.4209 }
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Contract",
    requirements: ["Project Management", "Agile methodologies", "Stakeholder management"],
    status: "Closed",
    datePosted: "2023-09-05",
    coordinates: { latitude: 25.0657, longitude: 55.1713 }
  }
];

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Set up demo notifications
  useEffect(() => {
    setTimeout(() => {
      notifyRecruiter({
        title: "New Application",
        description: "Sarah Johnson has applied for UI/UX Designer position",
      });
    }, 2500);

    setTimeout(() => {
      notifyRecruiter({
        title: "Upcoming Interview",
        description: "Interview with Michael Brown in 30 minutes",
      });
    }, 4500);
  }, []);

  const handleScheduleInterview = (interviewData: any) => {
    console.log("Scheduling interview:", interviewData);
    notifySuccess({
      title: "Interview Scheduled",
      description: `Interview with ${interviewData.candidateName} for ${interviewData.position} scheduled on ${interviewData.date.toLocaleDateString()} at ${interviewData.time}.`,
    });
    setIsScheduleInterviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <RecruiterDashboardHeader 
        showNotificationsPanel={showNotificationsPanel}
        setShowNotificationsPanel={setShowNotificationsPanel}
      />
      
      <RecruiterDashboardTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScheduleInterview={() => setIsScheduleInterviewDialogOpen(true)}
        vacancies={vacancies}
      />
      
      <ScheduleInterviewDialog
        open={isScheduleInterviewDialogOpen}
        onOpenChange={setIsScheduleInterviewDialogOpen}
        onSchedule={handleScheduleInterview}
      />
    </div>
  );
};

export default RecruiterDashboard;
