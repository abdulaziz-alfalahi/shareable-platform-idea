
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import CareerMilestones from "@/components/passport/CareerMilestones";
import ActiveChallenges from "@/components/passport/ActiveChallenges";
import CulturalAchievements from "@/components/passport/CulturalAchievements";
import SkillGapAnalysis from "@/components/passport/SkillGapAnalysis";
import PathwaySimulator from "@/components/career/PathwaySimulator";
import PassportMainContent from "../PassportMainContent";

interface PassportTabsContentProps {
  activeTab: string;
  student: Student;
}

const PassportTabsContent: React.FC<PassportTabsContentProps> = ({ 
  activeTab, 
  student 
}) => {
  return (
    <>
      <TabsContent value="passport">
        <PassportMainContent student={student} />
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
    </>
  );
};

export default PassportTabsContent;
