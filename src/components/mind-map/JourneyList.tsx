
import React from "react";
import JourneyItem from "./JourneyItem";
import { journeyData, JourneyStep } from "./journeyData";

interface JourneyListProps {
  steps: JourneyStep[];
  persona?: string;
}

const JourneyList: React.FC<JourneyListProps> = ({ steps, persona }) => {
  // If persona is provided and steps aren't, find the corresponding steps in journeyData
  const journeySteps = steps?.length 
    ? steps 
    : (persona 
        ? journeyData.find(journey => journey.id === persona)?.steps || [] 
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
