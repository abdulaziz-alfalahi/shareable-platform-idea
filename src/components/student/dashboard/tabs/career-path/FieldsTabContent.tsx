
import React from "react";
import { CareerField } from "./types";
import FieldCard from "./FieldCard";

interface FieldsTabContentProps {
  careerFields: CareerField[];
  setActiveTab: (tab: string) => void;
}

const FieldsTabContent: React.FC<FieldsTabContentProps> = ({ careerFields, setActiveTab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {careerFields.map(field => (
        <FieldCard 
          key={field.id} 
          field={field} 
          onExploreSpecializations={() => setActiveTab("specializations")}
        />
      ))}
    </div>
  );
};

export default FieldsTabContent;
