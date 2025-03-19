
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 gap-2 mb-4">
        <TabsTrigger value="student">
          Student
        </TabsTrigger>
        <TabsTrigger value="career">
          Career Advisor
        </TabsTrigger>
        <TabsTrigger value="recruiter">
          Recruiter
        </TabsTrigger>
        <TabsTrigger value="parent">
          Parent
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
