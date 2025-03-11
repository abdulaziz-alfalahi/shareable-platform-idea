
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stamp, Trophy, ListChecks, Award, TrendingUp, GitBranch } from "lucide-react";

interface PassportNavigationProps {
  className?: string;
}

const PassportNavigation: React.FC<PassportNavigationProps> = ({ className }) => {
  return (
    <TabsList className={`mb-6 bg-emirati-sandBeige/20 ${className}`}>
      <TabsTrigger
        value="passport"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <Stamp size={16} className="mr-2" /> Passport
      </TabsTrigger>
      <TabsTrigger
        value="milestones"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <Trophy size={16} className="mr-2" /> Milestones
      </TabsTrigger>
      <TabsTrigger
        value="challenges"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <ListChecks size={16} className="mr-2" /> Challenges
      </TabsTrigger>
      <TabsTrigger
        value="cultural"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <Award size={16} className="mr-2" /> Cultural
      </TabsTrigger>
      <TabsTrigger
        value="skill-gaps"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <TrendingUp size={16} className="mr-2" /> Skill Gaps
      </TabsTrigger>
      <TabsTrigger
        value="pathways"
        className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
      >
        <GitBranch size={16} className="mr-2" /> Pathways
      </TabsTrigger>
    </TabsList>
  );
};

export default PassportNavigation;
