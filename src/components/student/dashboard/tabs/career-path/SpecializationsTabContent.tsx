
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CareerField } from "./types";
import SpecializationCard from "./SpecializationCard";

interface SpecializationsTabContentProps {
  careerFields: CareerField[];
  setActiveTab: (tab: string) => void;
}

const SpecializationsTabContent: React.FC<SpecializationsTabContentProps> = ({ 
  careerFields, 
  setActiveTab 
}) => {
  return (
    <>
      <div className="flex items-center text-sm mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-emirati-oasisGreen" 
          onClick={() => setActiveTab("fields")}
        >
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Fields
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerFields.flatMap(field => 
          field.specializations.map(spec => (
            <SpecializationCard 
              key={`${field.id}-${spec.name}`}
              specialization={spec} 
              field={field.name}
              onExplorePathways={() => setActiveTab("pathways")}
            />
          ))
        )}
      </div>
    </>
  );
};

export default SpecializationsTabContent;
