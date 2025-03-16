
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, User, Briefcase, GraduationCap, Users, School, Building, Activity } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab }) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
      <TabsTrigger value="student" className="flex items-center gap-2">
        <GraduationCap className="h-4 w-4" /> Student
      </TabsTrigger>
      <TabsTrigger value="recruiter" className="flex items-center gap-2">
        <Briefcase className="h-4 w-4" /> Recruiter
      </TabsTrigger>
      <TabsTrigger value="parent" className="flex items-center gap-2">
        <Users className="h-4 w-4" /> Parent
      </TabsTrigger>
      <TabsTrigger value="internship" className="flex items-center gap-2">
        <Building className="h-4 w-4" /> Internship Coordinator
      </TabsTrigger>
      <TabsTrigger value="advisor" className="flex items-center gap-2">
        <User className="h-4 w-4" /> Advisor
      </TabsTrigger>
      <TabsTrigger value="command" className="flex items-center gap-2">
        <Activity className="h-4 w-4" /> Command Center
      </TabsTrigger>
      <TabsTrigger value="policy" className="flex items-center gap-2">
        <School className="h-4 w-4" /> Policy Maker
      </TabsTrigger>
      <TabsTrigger value="jobseeker" className="flex items-center gap-2">
        <Map className="h-4 w-4" /> Jobseeker
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
