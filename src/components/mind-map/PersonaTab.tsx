
import React from "react";
import JourneyList from "./JourneyList";
import { JourneyStep } from "./journeyData";

interface PersonaTabProps {
  journeyData: JourneyStep[];
  id?: string;
  filtered?: boolean;
}

const PersonaTab: React.FC<PersonaTabProps> = ({ journeyData, id, filtered = false }) => {
  return (
    <div>
      {id && !filtered && (
        <h2 className="text-2xl font-semibold text-emirati-deepBlue mb-4">
          {/* Display the title if available */}
          {journeyData.length > 0 && "title" in journeyData[0] ? journeyData[0].title : "Journey"}
        </h2>
      )}
      <JourneyList steps={journeyData} />
    </div>
  );
};

export default PersonaTab;
