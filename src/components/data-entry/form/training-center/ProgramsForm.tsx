
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TrainingCenterData } from "./types";
import ProgramItem from "./ProgramItem";

interface ProgramsFormProps {
  formData: TrainingCenterData;
  onProgramChange: (index: number, field: string, value: string | boolean) => void;
  onAddProgram: () => void;
  onRemoveProgram: (index: number) => void;
  onBack: () => void;
  isSaving: boolean;
}

const ProgramsForm: React.FC<ProgramsFormProps> = ({
  formData,
  onProgramChange,
  onAddProgram,
  onRemoveProgram,
  onBack,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Training Programs</h3>
        
        {formData.programs.map((program, index) => (
          <ProgramItem
            key={index}
            program={program}
            index={index}
            onProgramChange={onProgramChange}
            onRemoveProgram={onRemoveProgram}
            canRemove={formData.programs.length > 1}
          />
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={onAddProgram}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Program
        </Button>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back to Center Details
        </Button>
        <Button 
          type="submit" 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Training Center"}
        </Button>
      </div>
    </div>
  );
};

export default ProgramsForm;
