
import React from "react";
import JourneyList from "./JourneyList";
import { journeyData } from "./journeyData";

interface PersonaTabProps {
  id: string;
  filtered?: boolean;
}

const PersonaTab: React.FC<PersonaTabProps> = ({ id, filtered = false }) => {
  const persona = journeyData.find(persona => persona.id === id);

  if (!persona) {
    return <div>Persona not found</div>;
  }

  return (
    <div>
      {!filtered && (
        <h2 className="text-2xl font-semibold text-emirati-deepBlue mb-4">{persona.title}</h2>
      )}
      <JourneyList steps={persona.steps} />
    </div>
  );
};

export default PersonaTab;
