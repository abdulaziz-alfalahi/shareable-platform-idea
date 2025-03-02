
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/toast";
import { notifyRecruiter, notifySuccess } from "@/utils/notification";

import VacancyManagement from "@/components/recruiter/VacancyManagement";
import CandidateSearch from "@/components/recruiter/CandidateSearch";
import InterviewCalendar from "@/components/recruiter/InterviewCalendar";
import InternTracking from "@/components/recruiter/InternTracking";
import CompanyPartners from "@/components/recruiter/CompanyPartners";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";
import MonitoringDashboard from "@/components/recruiter/MonitoringDashboard";

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
  const { toasts, markAsRead } = useToast();
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

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

  const unreadNotificationsCount = toasts.filter(toast => !toast.read).length;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        
        <div className="relative">
          <Button 
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </Button>
          
          {showNotificationsPanel && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border z-50">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {toasts.length > 0 ? (
                  <div className="divide-y">
                    {toasts.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-center gap-2">
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-purple-500"></span>}
                          <h4 className="font-medium">{notification.title}</h4>
                        </div>
                        {notification.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="vacancies">Vacancy Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Search</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="interns">Intern Tracking</TabsTrigger>
          <TabsTrigger value="companies">Company Partners</TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" /> Monitoring
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vacancies" className="mt-6">
          <VacancyManagement vacancies={vacancies} />
        </TabsContent>
        
        <TabsContent value="candidates" className="mt-6">
          <CandidateSearch />
        </TabsContent>
        
        <TabsContent value="interviews" className="mt-6">
          <InterviewCalendar 
            onScheduleInterview={() => setIsScheduleInterviewDialogOpen(true)} 
          />
        </TabsContent>
        
        <TabsContent value="interns" className="mt-6">
          <InternTracking />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <CompanyPartners />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <MonitoringDashboard />
        </TabsContent>
      </Tabs>
      
      <ScheduleInterviewDialog
        open={isScheduleInterviewDialogOpen}
        onOpenChange={setIsScheduleInterviewDialogOpen}
        onSchedule={handleScheduleInterview}
      />
    </div>
  );
};

export default RecruiterDashboard;
