
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CareerPathHeader from "./career-path/CareerPathHeader";
import FieldsTabContent from "./career-path/FieldsTabContent";
import SpecializationsTabContent from "./career-path/SpecializationsTabContent";
import PathwaysTabContent from "./career-path/PathwaysTabContent";
import { careerFields } from "./career-path/careerFieldsData";

const CareerPathTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("fields");

  return (
    <div className="space-y-6">
      <CareerPathHeader />
      
      <p className="text-muted-foreground">
        Explore different specializations and career paths to help decide your university focus.
        Choose a field of study to see specializations and where they can lead you professionally.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="fields">Fields of Study</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="pathways">Career Pathways</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <FieldsTabContent careerFields={careerFields} setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="specializations">
          <SpecializationsTabContent careerFields={careerFields} setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="pathways">
          <PathwaysTabContent careerFields={careerFields} setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPathTab;
