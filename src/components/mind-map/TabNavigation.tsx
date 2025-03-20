
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, User, Briefcase, GraduationCap, Users, School, Building, Activity } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onChange: (tab: string) => void; // Added onChange prop to the interface
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChange }) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
      <TabsTrigger 
        value="student" 
        className="flex items-center gap-2"
        onClick={() => onChange("student")}
        data-state={activeTab === "student" ? "active" : ""}
      >
        <GraduationCap className="h-4 w-4" /> Student
      </TabsTrigger>
      <TabsTrigger 
        value="recruiter" 
        className="flex items-center gap-2"
        onClick={() => onChange("recruiter")}
        data-state={activeTab === "recruiter" ? "active" : ""}
      >
        <Briefcase className="h-4 w-4" /> Recruiter
      </TabsTrigger>
      <TabsTrigger 
        value="parent" 
        className="flex items-center gap-2"
        onClick={() => onChange("parent")}
        data-state={activeTab === "parent" ? "active" : ""}
      >
        <Users className="h-4 w-4" /> Parent
      </TabsTrigger>
      <TabsTrigger 
        value="internship" 
        className="flex items-center gap-2"
        onClick={() => onChange("internship")}
        data-state={activeTab === "internship" ? "active" : ""}
      >
        <Building className="h-4 w-4" /> Internship Coordinator
      </TabsTrigger>
      <TabsTrigger 
        value="advisor" 
        className="flex items-center gap-2"
        onClick={() => onChange("advisor")}
        data-state={activeTab === "advisor" ? "active" : ""}
      >
        <User className="h-4 w-4" /> Advisor
      </TabsTrigger>
      <TabsTrigger 
        value="command" 
        className="flex items-center gap-2"
        onClick={() => onChange("command")}
        data-state={activeTab === "command" ? "active" : ""}
      >
        <Activity className="h-4 w-4" /> Command Center
      </TabsTrigger>
      <TabsTrigger 
        value="policy" 
        className="flex items-center gap-2"
        onClick={() => onChange("policy")}
        data-state={activeTab === "policy" ? "active" : ""}
      >
        <School className="h-4 w-4" /> Policy Maker
      </TabsTrigger>
      <TabsTrigger 
        value="jobseeker" 
        className="flex items-center gap-2"
        onClick={() => onChange("jobseeker")}
        data-state={activeTab === "jobseeker" ? "active" : ""}
      >
        <Map className="h-4 w-4" /> Jobseeker
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
