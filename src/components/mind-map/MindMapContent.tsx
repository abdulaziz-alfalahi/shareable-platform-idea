
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabNavigation from "./TabNavigation";
import JourneyList from "./JourneyList";
import { useLocation, useNavigate } from "react-router-dom";

interface MindMapContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MindMapContent: React.FC<MindMapContentProps> = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabParam = new URLSearchParams(location.search).get("tab");
  
  // Set the active tab based on the URL parameter or default to "student"
  const innerActiveTab = tabParam === "student" || tabParam === "parent" || tabParam === "adviser" ? tabParam : "student";
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-emirati-deepBrown mb-4">Mind Map Visualization</h2>
      <p className="text-muted-foreground mb-6">
        Explore different career journeys based on your persona and interests.
      </p>
      
      <TabNavigation 
        activeTab={innerActiveTab} 
        onChange={(tab) => {
          navigate(`/mindmap?tab=${tab}`, { replace: true });
        }} 
      />
      
      <div className="mt-6">
        <JourneyList persona={innerActiveTab} />
      </div>
    </div>
  );
};

export default MindMapContent;
