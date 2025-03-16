
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabNavigation from "./TabNavigation";
import PersonaTab from "./PersonaTab";
import { journeyData } from "./journeyData";

interface MindMapContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MindMapContent: React.FC<MindMapContentProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-emirati-deepBlue mb-6">Platform Mindmap</h1>
      <p className="text-gray-600 mb-8">
        Explore the journey of different users through the Emirati Journey platform. Select a persona below to see their step-by-step journey from start to finish.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabNavigation activeTab={activeTab} />
        
        {journeyData.map(persona => (
          <TabsContent key={persona.id} value={persona.id} className="mt-4">
            <PersonaTab id={persona.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MindMapContent;
