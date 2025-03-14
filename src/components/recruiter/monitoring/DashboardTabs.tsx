
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewsTab from "./tabs/InterviewsTab";
import CandidatesTab from "./tabs/CandidatesTab";
import VacanciesTab from "./tabs/VacanciesTab";
import GrowthTab from "./tabs/GrowthTab";

// Types for the mock data
interface InterviewData {
  month: string;
  scheduled: number;
  completed: number;
  canceled: number;
}

interface CandidateStatus {
  name: string;
  value: number;
  color: string;
}

interface VacancyData {
  month: string;
  open: number;
  filled: number;
}

interface AdvisoryData {
  month: string;
  sessions: number;
}

interface UserGrowthData {
  month: string;
  students: number;
  recruiters: number;
  advisors: number;
}

interface DashboardTabsProps {
  interviewData: InterviewData[];
  candidateStatusData: CandidateStatus[];
  vacancyData: VacancyData[];
  advisorySessionsData: AdvisoryData[];
  userGrowthData: UserGrowthData[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  interviewData,
  candidateStatusData,
  vacancyData,
  advisorySessionsData,
  userGrowthData
}) => {
  return (
    <Tabs defaultValue="interviews">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="interviews">Interviews</TabsTrigger>
        <TabsTrigger value="candidates">Candidates</TabsTrigger>
        <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
        <TabsTrigger value="growth">Platform Growth</TabsTrigger>
      </TabsList>
      
      <TabsContent value="interviews">
        <InterviewsTab 
          interviewData={interviewData} 
          advisorySessionsData={advisorySessionsData}
        />
      </TabsContent>
      
      <TabsContent value="candidates">
        <CandidatesTab candidateStatusData={candidateStatusData} />
      </TabsContent>
      
      <TabsContent value="vacancies">
        <VacanciesTab vacancyData={vacancyData} />
      </TabsContent>
      
      <TabsContent value="growth">
        <GrowthTab userGrowthData={userGrowthData} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
