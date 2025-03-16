
import React, { useState, useEffect } from "react";
import RoleDashboardLayout, { DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Briefcase, UserCheck, ChevronRight, Clock, PlusCircle, BarChart2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifyRecruiter, notifySuccess } from "@/utils/notification";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";
import RecruiterDashboardTabs from "@/components/recruiter/dashboard/RecruiterDashboardTabs";
import VideoInterviewPanel from "@/components/recruiter/VideoInterviewPanel";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
  const [isVideoInterviewOpen, setIsVideoInterviewOpen] = useState(false);
  const navigate = useNavigate();

  // Set up demo notifications
  useEffect(() => {
    const timer1 = setTimeout(() => {
      notifyRecruiter({
        title: "New Application",
        description: "Sarah Johnson has applied for UI/UX Designer position",
      });
    }, 2500);

    const timer2 = setTimeout(() => {
      notifyRecruiter({
        title: "Upcoming Interview",
        description: "Interview with Michael Brown in 30 minutes",
      });
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const dashboardMetrics: DashboardMetric[] = [
    { 
      label: "Active Vacancies", 
      value: 14, 
      change: "+3 this month", 
      trend: "up", 
      icon: <Briefcase className="w-4 h-4" />
    },
    { 
      label: "New Applications", 
      value: 27, 
      change: "+12 this week", 
      trend: "up", 
      icon: <UserCheck className="w-4 h-4" />
    },
    { 
      label: "Interviews Scheduled", 
      value: 8, 
      description: "This week", 
      icon: <Clock className="w-4 h-4" />
    },
    { 
      label: "Placement Rate", 
      value: "68%", 
      change: "+5% vs last quarter", 
      trend: "up", 
      icon: <ChevronRight className="w-4 h-4" />
    }
  ];

  const handleScheduleInterview = (interviewData: any) => {
    console.log("Scheduling interview:", interviewData);
    notifySuccess({
      title: "Interview Scheduled",
      description: `Interview with ${interviewData.candidateName} for ${interviewData.position} scheduled on ${interviewData.date.toLocaleDateString()} at ${interviewData.time}.`,
    });
    setIsScheduleInterviewDialogOpen(false);
  };
  
  const handleStartVideoInterview = () => {
    setIsVideoInterviewOpen(true);
  };

  const dashboardActions = [
    {
      label: "Schedule Interview",
      onClick: () => setIsScheduleInterviewDialogOpen(true),
      icon: <Clock className="h-4 w-4" />
    },
    {
      label: "Video Interview",
      onClick: handleStartVideoInterview,
      icon: <Video className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Post Job",
      onClick: () => console.log("Post job clicked"),
      icon: <PlusCircle className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Dashboard",
      onClick: () => setActiveTab("monitoring"),
      icon: <BarChart2 className="h-4 w-4" />,
      variant: "secondary" as const
    }
  ];

  return (
    <ErrorBoundary>
      <RoleDashboardLayout
        title="Recruiter Dashboard"
        subtitle="Find and connect with top Emirati talent"
        role="recruiter"
        metrics={dashboardMetrics}
        actions={dashboardActions}
      >
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
        
        <Dialog open={isVideoInterviewOpen} onOpenChange={setIsVideoInterviewOpen}>
          <DialogContent className="max-w-5xl h-[80vh] p-0">
            <VideoInterviewPanel
              candidateName="Ahmed Al Mansouri"
              candidateEmail="ahmed.almansouri@example.com"
              positionTitle="Software Engineer"
              onClose={() => setIsVideoInterviewOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </RoleDashboardLayout>
    </ErrorBoundary>
  );
};

export default RecruiterDashboard;
