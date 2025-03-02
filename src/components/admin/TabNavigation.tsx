
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Briefcase, GraduationCap } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import StudentsTab from "./tabs/StudentsTab";
import RecruitersTab from "./tabs/RecruitersTab";
import TrainingTab from "./tabs/TrainingTab";
import { AdminDashboardData } from "@/types/admin";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  adminDashboardData: AdminDashboardData;
  interviewsData: any[];
  pathColumns: any[];
  recruiterColumns: any[];
  trainingColumns: any[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  adminDashboardData,
  interviewsData,
  pathColumns,
  recruiterColumns,
  trainingColumns
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
        <TabsTrigger value="overview">
          <LayoutDashboard className="mr-2 h-4 w-4" /> Platform Overview
        </TabsTrigger>
        <TabsTrigger value="students">
          <Users className="mr-2 h-4 w-4" /> Student Analysis
        </TabsTrigger>
        <TabsTrigger value="recruiters">
          <Briefcase className="mr-2 h-4 w-4" /> Recruiter & Job Metrics
        </TabsTrigger>
        <TabsTrigger value="training">
          <GraduationCap className="mr-2 h-4 w-4" /> Training & Assessment
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <OverviewTab 
          adminDashboardData={adminDashboardData}
          interviewsData={interviewsData}
        />
      </TabsContent>

      <TabsContent value="students" className="mt-6">
        <StudentsTab 
          adminDashboardData={adminDashboardData}
          pathColumns={pathColumns}
        />
      </TabsContent>

      <TabsContent value="recruiters" className="mt-6">
        <RecruitersTab 
          adminDashboardData={adminDashboardData}
          recruiterColumns={recruiterColumns}
          interviewsData={interviewsData}
        />
      </TabsContent>

      <TabsContent value="training" className="mt-6">
        <TrainingTab 
          adminDashboardData={adminDashboardData}
          trainingColumns={trainingColumns}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
