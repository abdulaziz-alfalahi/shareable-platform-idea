
import React from "react";
import TabNavigation from "./TabNavigation";
import PersonaTab from "./PersonaTab";
import { motion } from "framer-motion";
import { journeyData } from "./journeyData";

interface MindMapContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MindMapContent: React.FC<MindMapContentProps> = ({ activeTab, setActiveTab }) => {
  const currentJourneyData = journeyData[activeTab as keyof typeof journeyData] || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-emirati-oasisGreen mb-6">
        Career Mind Map
      </h1>
      <p className="text-gray-700 mb-8">
        Explore different career paths and opportunities based on your role and interests.
      </p>
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PersonaTab journeyData={currentJourneyData} />
      </motion.div>
    </div>
  );
};

export default MindMapContent;
