
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AcademicInfoForm from "./AcademicInfoForm";
import FinancialInfoForm from "./FinancialInfoForm";
import AchievementsSection from "./AchievementsSection";
import InterestsSection from "./InterestsSection";
import { UseFormReturn } from "react-hook-form";
import { StudentScholarshipProfile } from "@/types/scholarship";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  academicForm: UseFormReturn<any>;
  financialForm: UseFormReturn<any>;
  profile: StudentScholarshipProfile | null;
  saveAcademicInfo: (data: any) => Promise<void>;
  saveFinancialInfo: (data: any) => Promise<void>;
  addAchievement: (achievement: string) => Promise<void>;
  removeAchievement: (index: number) => Promise<void>;
  addInterest: (interest: string) => Promise<void>;
  removeInterest: (index: number) => Promise<void>;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  academicForm,
  financialForm,
  profile,
  saveAcademicInfo,
  saveFinancialInfo,
  addAchievement,
  removeAchievement,
  addInterest,
  removeInterest
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="financial">Financial</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
        <TabsTrigger value="interests">Areas of Interest</TabsTrigger>
      </TabsList>

      <TabsContent value="academic">
        <AcademicInfoForm 
          academicForm={academicForm} 
          saveAcademicInfo={saveAcademicInfo} 
        />
      </TabsContent>

      <TabsContent value="financial">
        <FinancialInfoForm 
          financialForm={financialForm} 
          saveFinancialInfo={saveFinancialInfo} 
        />
      </TabsContent>

      <TabsContent value="achievements">
        <AchievementsSection 
          profile={profile}
          addAchievement={addAchievement}
          removeAchievement={removeAchievement}
        />
      </TabsContent>

      <TabsContent value="interests">
        <InterestsSection 
          profile={profile}
          addInterest={addInterest}
          removeInterest={removeInterest}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
