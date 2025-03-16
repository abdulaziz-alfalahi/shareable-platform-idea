
import React from "react";
import JourneyList from "./JourneyList";

interface JourneyStep {
  title: string;
  items: string[];
}

interface PersonaTabProps {
  title: string;
  steps: JourneyStep[];
}

const PersonaTab: React.FC<PersonaTabProps> = ({ title, steps }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-emirati-deepBlue mb-4">{title}</h2>
      <JourneyList steps={steps} />
    </div>
  );
};

export default PersonaTab;
