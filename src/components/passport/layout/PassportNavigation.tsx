
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stamp, Trophy, ListChecks, Award, TrendingUp, GitBranch } from "lucide-react";

interface PassportNavigationProps {
  className?: string;
}

const PassportNavigation: React.FC<PassportNavigationProps> = ({ className }) => {
  return (
    <div className="relative bg-white rounded-lg p-1 border border-gray-100 shadow-sm mb-6">
      <TabsList className={`bg-transparent w-full ${className}`}>
        <TabsTrigger
          value="passport"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <Stamp className="h-4 w-4" /> 
          <span className="hidden md:inline">Passport</span>
        </TabsTrigger>
        <TabsTrigger
          value="milestones"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <Trophy className="h-4 w-4" /> 
          <span className="hidden md:inline">Milestones</span>
        </TabsTrigger>
        <TabsTrigger
          value="challenges"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <ListChecks className="h-4 w-4" /> 
          <span className="hidden md:inline">Challenges</span>
        </TabsTrigger>
        <TabsTrigger
          value="cultural"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <Award className="h-4 w-4" /> 
          <span className="hidden md:inline">Cultural</span>
        </TabsTrigger>
        <TabsTrigger
          value="skill-gaps"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <TrendingUp className="h-4 w-4" /> 
          <span className="hidden md:inline">Skill Gaps</span>
        </TabsTrigger>
        <TabsTrigger
          value="pathways"
          className="flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white transition-all duration-200"
        >
          <GitBranch className="h-4 w-4" /> 
          <span className="hidden md:inline">Pathways</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default PassportNavigation;
