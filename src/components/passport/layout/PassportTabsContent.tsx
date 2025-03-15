
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import PassportMainContent from "../PassportMainContent";
import SkillGapTabs from "../skill-gap/SkillGapTabs";
import { ErrorBoundary } from "@/components/ui/error-boundary";

interface PassportTabsContentProps {
  activeTab: string;
  student: Student;
}

const PassportTabsContent: React.FC<PassportTabsContentProps> = ({
  activeTab,
  student,
}) => {
  // Add state for skill gap sub-tabs
  const [skillGapActiveTab, setSkillGapActiveTab] = useState("recommendations");

  const fallbackUI = (
    <div className="p-4 border border-amber-300 bg-amber-50 rounded-md text-amber-900">
      <h3 className="text-lg font-semibold mb-2">Unable to load this section</h3>
      <p>We're sorry, but there was an error loading this content. Please try again later.</p>
    </div>
  );

  return (
    <div className="mt-6">
      <TabsContent value="passport" forceMount hidden={activeTab !== "passport"}>
        <ErrorBoundary fallback={fallbackUI}>
          <PassportMainContent student={student} />
        </ErrorBoundary>
      </TabsContent>
      
      <TabsContent value="skill-gaps" forceMount hidden={activeTab !== "skill-gaps"}>
        <ErrorBoundary fallback={fallbackUI}>
          <SkillGapTabs 
            student={student} 
            activeTab={skillGapActiveTab}
            onTabChange={setSkillGapActiveTab}
          />
        </ErrorBoundary>
      </TabsContent>
      
      <TabsContent value="settings" forceMount hidden={activeTab !== "settings"}>
        <ErrorBoundary fallback={fallbackUI}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Passport Settings</h2>
            <p className="text-muted-foreground">
              Configure your career passport settings and notification preferences here.
            </p>
          </div>
        </ErrorBoundary>
      </TabsContent>
    </div>
  );
};

export default PassportTabsContent;
