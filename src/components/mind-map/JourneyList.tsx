
import React from "react";
import JourneyItem from "./JourneyItem";

interface JourneyStep {
  title: string;
  items: string[];
}

interface JourneyListProps {
  steps: JourneyStep[];
}

const JourneyList: React.FC<JourneyListProps> = ({ steps }) => {
  return (
    <div className="space-y-8 py-6">
      {steps.map((step, index) => (
        <JourneyItem key={index} step={step} index={index} />
      ))}
    </div>
  );
};

export default JourneyList;
