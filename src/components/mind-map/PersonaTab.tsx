
import React from "react";
import JourneyList from "./JourneyList";
import { journeyData } from "./journeyData";

interface PersonaTabProps {
  id: string;
}

const PersonaTab: React.FC<PersonaTabProps> = ({ id }) => {
  const persona = journeyData.find(persona => persona.id === id);

  if (!persona) {
    return <div>Persona not found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-emirati-deepBlue mb-4">{persona.title}</h2>
      <JourneyList steps={persona.steps} />
    </div>
  );
};

export default PersonaTab;
