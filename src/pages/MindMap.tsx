
import React, { useState } from "react";
import MindMapContent from "@/components/mind-map/MindMapContent";

const MindMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState("student");

  return <MindMapContent activeTab={activeTab} setActiveTab={setActiveTab} />;
};

export default MindMap;
