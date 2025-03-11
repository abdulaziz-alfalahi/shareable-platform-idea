
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2 } from "lucide-react";
import VacancyManagement from "@/components/recruiter/VacancyManagement";
import CandidateSearch from "@/components/recruiter/CandidateSearch";
import InterviewCalendar from "@/components/recruiter/InterviewCalendar";
import InternTracking from "@/components/recruiter/InternTracking";
import CompanyPartners from "@/components/recruiter/CompanyPartners";
import MonitoringDashboard from "@/components/recruiter/MonitoringDashboard";

interface RecruiterDashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScheduleInterview: () => void;
  vacancies: any[];
}

const RecruiterDashboardTabs: React.FC<RecruiterDashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  onScheduleInterview,
  vacancies
}) => {
  return (
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
          onScheduleInterview={onScheduleInterview} 
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
  );
};

export default RecruiterDashboardTabs;
