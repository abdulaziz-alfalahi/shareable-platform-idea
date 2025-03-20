
import React from "react";
import JourneyItem from "./JourneyItem";
import { journeyData } from "./journeyData";

interface JourneyStep {
  title: string;
  items: string[];
}

interface JourneyListProps {
  steps?: JourneyStep[];
  persona?: string; // Added persona prop to the interface
}

const JourneyList: React.FC<JourneyListProps> = ({ steps, persona }) => {
  // If persona is provided, find the corresponding steps in journeyData
  const journeySteps = steps || (persona ? 
    journeyData.find(journey => journey.id === persona)?.steps || [] 
    : []);
  
  return (
    <div className="space-y-8 py-6">
      {journeySteps.map((step, index) => (
        <JourneyItem key={index} step={step} index={index} />
      ))}
    </div>
  );
};

export default JourneyList;
