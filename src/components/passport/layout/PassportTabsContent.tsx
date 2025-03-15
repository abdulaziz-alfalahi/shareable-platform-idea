
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import PassportMainContent from "../PassportMainContent";
import ProgressTracking from "../ProgressTracking";
import CareerMilestones from "../CareerMilestones";
import CulturalAchievements from "../CulturalAchievements";
import MentorMatchingCard from "../MentorMatchingCard";
import LeaderboardCard from "../LeaderboardCard";
import SkillGapAnalysis from "../skill-gap/SkillGapAnalysis";
import PublicProfileTab from "./PublicProfileTab";
import SettingsTab from "./SettingsTab";
import CulturalAchievementsGuide from "../CulturalAchievementsGuide";

interface PassportTabsContentProps {
  activeTab: string;
  student: Student;
}

const PassportTabsContent: React.FC<PassportTabsContentProps> = ({
  activeTab,
  student,
}) => {
  return (
    <div className="mt-4">
      <TabsContent value="passport" className="space-y-8">
        <PassportMainContent student={student} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProgressTracking 
            student={student} 
            serviceId="career-progress" 
            serviceName="Career Progress" 
            currentProgress={student.progress || 0} 
          />
          <LeaderboardCard 
            data={[
              { name: student.name, score: student.totalPoints || 0, isCurrentUser: true, position: student.leaderboardRank || 0 },
              { name: "Ahmed K.", score: 450 },
              { name: "Fatima S.", score: 380 },
              { name: "Mohammed A.", score: 320 },
              { name: "Noura H.", score: 290 }
            ]}
            currentUserRank={student.leaderboardRank || 0}
          />
        </div>
      </TabsContent>

      <TabsContent value="achievements" className="space-y-8">
        <CareerMilestones student={student} />
        <CulturalAchievements student={student} />
        <CulturalAchievementsGuide student={student} />
      </TabsContent>

      <TabsContent value="skill-gap" className="space-y-8">
        <SkillGapAnalysis student={student} />
      </TabsContent>

      <TabsContent value="mentorship" className="space-y-8">
        {/* Pass the student prop to MentorMatchingCard as required */}
        <MentorMatchingCard student={student} />
      </TabsContent>

      <TabsContent value="public-profile">
        {/* Public profile tab doesn't accept a student prop, so we don't pass it */}
        <PublicProfileTab />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTab student={student} />
      </TabsContent>
    </div>
  );
};

export default PassportTabsContent;
