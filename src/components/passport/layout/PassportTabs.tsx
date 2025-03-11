
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import CareerPassport from "@/components/passport/CareerPassport";
import PublicProfileTab from "./PublicProfileTab";
import SettingsTab from "./SettingsTab";

interface PassportTabsProps {
  student: Student;
}

const PassportTabs: React.FC<PassportTabsProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState("passport");

  return (
    <Tabs 
      defaultValue="passport" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="passport">Passport</TabsTrigger>
        <TabsTrigger value="profile">Public Profile</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="passport" className="mt-6">
        <CareerPassport student={student} />
      </TabsContent>
      
      <TabsContent value="profile" className="mt-6">
        <PublicProfileTab />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <SettingsTab student={student} />
      </TabsContent>
    </Tabs>
  );
};

export default PassportTabs;
