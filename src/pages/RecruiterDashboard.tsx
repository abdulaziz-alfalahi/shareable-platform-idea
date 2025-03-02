
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacancyManagement from "@/components/recruiter/VacancyManagement";
import CandidateSearch from "@/components/recruiter/CandidateSearch";
import InterviewCalendar from "@/components/recruiter/InterviewCalendar";
import InternTracking from "@/components/recruiter/InternTracking";
import CompanyPartners from "@/components/recruiter/CompanyPartners";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";
import { useToast } from "@/hooks/use-toast";

// Sample data for vacancies
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);

  const handleScheduleInterview = (interviewData: any) => {
    console.log("Scheduling interview:", interviewData);
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${interviewData.candidateName} for ${interviewData.position} scheduled on ${interviewData.date.toLocaleDateString()} at ${interviewData.time}.`,
    });
    setIsScheduleInterviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vacancies">Vacancy Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Search</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="interns">Intern Tracking</TabsTrigger>
          <TabsTrigger value="companies">Company Partners</TabsTrigger>
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
