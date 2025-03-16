
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2 } from "lucide-react";
import VacancyManagement from "@/components/recruiter/VacancyManagement";
import CandidateSearch from "@/components/recruiter/CandidateSearch";
import InterviewCalendar from "@/components/recruiter/InterviewCalendar";
import InternTracking from "@/components/recruiter/InternTracking";
import CompanyPartners from "@/components/recruiter/CompanyPartners";
import MonitoringDashboard from "@/components/recruiter/MonitoringDashboard";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
  console.log("RecruiterDashboardTabs rendering with activeTab:", activeTab);
  
  return (
    <ErrorBoundary>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="vacancies">Vacancy Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Search</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="interns">Intern Tracking</TabsTrigger>
          <TabsTrigger value="companies">Company Partners</TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-1">
            <BarChart2 className="h-4 w-4" /> Monitoring
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vacancies">
          <VacancyManagement vacancies={vacancies} />
        </TabsContent>
        
        <TabsContent value="candidates">
          <CandidateSearch />
        </TabsContent>
        
        <TabsContent value="interviews">
          <InterviewCalendar onScheduleInterview={onScheduleInterview} />
        </TabsContent>
        
        <TabsContent value="interns">
          <InternTracking />
        </TabsContent>
        
        <TabsContent value="companies">
          <CompanyPartners />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringDashboard />
        </TabsContent>
      </Tabs>
    </ErrorBoundary>
  );
};

export default RecruiterDashboardTabs;
