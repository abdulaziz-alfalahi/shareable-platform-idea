
import React from "react";
import { GraduationCap, Building } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainingCenter, TrainingProgram } from "@/utils/trainingCentersService";
import ProgramCard from "./ProgramCard";

interface ProgramsListProps {
  programs: TrainingProgram[];
  activeCenter: string | null;
  centers: TrainingCenter[];
}

const ProgramsList: React.FC<ProgramsListProps> = ({ 
  programs, 
  activeCenter, 
  centers 
}) => {
  const activeCenterName = centers.find(c => c.id === activeCenter)?.name || "Training Center";

  return (
    <Card>
      {activeCenter ? (
        <>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
              Available Programs
            </CardTitle>
            <CardDescription>
              {activeCenterName} offers the following programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {programs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No programs available for this center</p>
              </div>
            ) : (
              <div className="space-y-6">
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <CardContent className="p-10 text-center">
          <Building className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium">Select a Training Center</h3>
          <p className="mt-2 text-gray-500">
            Choose a training center from the left to view available programs
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default ProgramsList;
