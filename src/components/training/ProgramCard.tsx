
import React from "react";
import { Calendar, Users, Info, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainingProgram } from "@/utils/trainingCentersService";

interface ProgramCardProps {
  program: TrainingProgram;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div key={program.id} className="border rounded-md p-4">
      <h3 className="text-lg font-medium mb-2">{program.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-3">
        {program.duration && (
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Duration: {program.duration}</span>
          </div>
        )}
        
        {program.skill_level && (
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>Level: {program.skill_level}</span>
          </div>
        )}
        
        {program.cost !== undefined && program.cost !== null && (
          <div className="flex items-center text-sm">
            <Info className="h-4 w-4 mr-2 text-gray-500" />
            <span>Cost: {program.cost} AED</span>
          </div>
        )}
        
        {program.certification_offered && (
          <div className="flex items-center text-sm">
            <Award className="h-4 w-4 mr-2 text-gray-500" />
            <span>Certification Available</span>
          </div>
        )}
      </div>
      
      {program.description && (
        <p className="text-sm text-gray-600 mt-2">{program.description}</p>
      )}
      
      <div className="mt-4 flex justify-end">
        <Button>
          Apply for Program
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;
