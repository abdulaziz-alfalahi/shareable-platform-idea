
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CareerField } from "./types";
import PathwayCard from "./PathwayCard";

interface PathwaysTabContentProps {
  careerFields: CareerField[];
  setActiveTab: (tab: string) => void;
}

const PathwaysTabContent: React.FC<PathwaysTabContentProps> = ({ 
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
          onClick={() => setActiveTab("specializations")}
        >
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Specializations
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerFields.flatMap(field => 
          field.pathways.map(pathway => (
            <PathwayCard 
              key={`${field.id}-${pathway.title}`} 
              pathway={pathway} 
            />
          ))
        )}
      </div>
    </>
  );
};

export default PathwaysTabContent;
