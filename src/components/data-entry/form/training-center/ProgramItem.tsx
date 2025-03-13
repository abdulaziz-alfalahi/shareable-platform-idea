
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { TrainingProgram } from "./types";

interface ProgramItemProps {
  program: TrainingProgram;
  index: number;
  onProgramChange: (index: number, field: string, value: string | boolean) => void;
  onRemoveProgram: (index: number) => void;
  canRemove: boolean;
}

const ProgramItem: React.FC<ProgramItemProps> = ({ 
  program, 
  index, 
  onProgramChange, 
  onRemoveProgram,
  canRemove 
}) => {
  return (
    <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 last:border-0">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Program #{index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemoveProgram(index)}
          disabled={!canRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`program-name-${index}`}>Program Name</Label>
          <Input
            id={`program-name-${index}`}
            value={program.name}
            onChange={(e) => onProgramChange(index, 'name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`program-duration-${index}`}>Duration</Label>
          <Input
            id={`program-duration-${index}`}
            value={program.duration}
            onChange={(e) => onProgramChange(index, 'duration', e.target.value)}
            placeholder="e.g. 6 weeks, 3 months"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`program-skill-${index}`}>Skill Level</Label>
          <Input
            id={`program-skill-${index}`}
            value={program.skill_level}
            onChange={(e) => onProgramChange(index, 'skill_level', e.target.value)}
            placeholder="e.g. Beginner, Intermediate"
          />
        </div>
        <div>
          <Label htmlFor={`program-audience-${index}`}>Target Audience</Label>
          <Input
            id={`program-audience-${index}`}
            value={program.target_audience}
            onChange={(e) => onProgramChange(index, 'target_audience', e.target.value)}
            placeholder="e.g. University Students, Job Seekers"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor={`program-start-${index}`}>Start Date</Label>
          <Input
            id={`program-start-${index}`}
            type="date"
            value={program.start_date}
            onChange={(e) => onProgramChange(index, 'start_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`program-end-${index}`}>End Date</Label>
          <Input
            id={`program-end-${index}`}
            type="date"
            value={program.end_date}
            onChange={(e) => onProgramChange(index, 'end_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`program-cost-${index}`}>Cost (AED)</Label>
          <Input
            id={`program-cost-${index}`}
            type="number"
            value={program.cost}
            onChange={(e) => onProgramChange(index, 'cost', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor={`program-desc-${index}`}>Description</Label>
        <Textarea
          id={`program-desc-${index}`}
          value={program.description}
          onChange={(e) => onProgramChange(index, 'description', e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`program-cert-${index}`}
          checked={program.certification_offered}
          onChange={(e) => onProgramChange(index, 'certification_offered', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor={`program-cert-${index}`} className="cursor-pointer">
          Certification Offered
        </Label>
      </div>
    </div>
  );
};

export default ProgramItem;
