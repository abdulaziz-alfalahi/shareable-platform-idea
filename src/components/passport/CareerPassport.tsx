
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Stamp, Award, Trophy, ListChecks, TrendingUp, GitBranch, Banknote } from "lucide-react";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";

import PassportWidget from "./PassportWidget";
import CareerMilestones from "./CareerMilestones";
import ActiveChallenges from "./ActiveChallenges";
import LeaderboardCard from "./LeaderboardCard";
import CulturalAchievements from "./CulturalAchievements";
import SkillGapAnalysis from "./SkillGapAnalysis";
import PathwaySimulator from "../career/PathwaySimulator";

interface CareerPassportProps {
  student: Student;
}

const CareerPassport: React.FC<CareerPassportProps> = ({ student }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("passport");

  const leaderboardData = [
    { name: "Ahmed M.", score: 4250, position: 1 },
    { name: "Fatima K.", score: 3980, position: 2 },
    { name: "Mohammed A.", score: 3780, position: 3 },
    { name: student.name, score: student.totalPoints, position: student.leaderboardRank || 4, isCurrentUser: true },
    { name: "Omar S.", score: 3450, position: 5 }
  ];

  const handleRetirementPlanning = () => {
    navigate('/retirement-planning');
    toast({
      title: "Retirement Planning",
      description: "Opening retirement planning tools to help secure your future",
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">
          Career Passport
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRetirementPlanning}
          className="ml-auto"
        >
          <Banknote size={16} className="mr-1" /> Retirement Planning
        </Button>
      </div>

      <Tabs
        defaultValue="passport"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 bg-emirati-sandBeige/20">
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

        <TabsContent value="passport">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PassportWidget student={student} />
            </div>
            <div>
              <LeaderboardCard 
                data={leaderboardData}
                title="Passport Leaderboard"
                description="Top achievers this month"
                category="Career Growth"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="milestones">
          <CareerMilestones student={student} />
        </TabsContent>

        <TabsContent value="challenges">
          <ActiveChallenges 
            challenges={student.activeChallenges || []} 
            onViewDetails={(id) => console.log(`View challenge ${id}`)}
          />
        </TabsContent>
        
        <TabsContent value="cultural">
          <CulturalAchievements student={student} />
        </TabsContent>
        
        <TabsContent value="skill-gaps">
          <SkillGapAnalysis student={student} />
        </TabsContent>

        <TabsContent value="pathways">
          <PathwaySimulator student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPassport;
