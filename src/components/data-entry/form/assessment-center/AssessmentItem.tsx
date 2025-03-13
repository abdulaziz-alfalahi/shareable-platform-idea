
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { AssessmentType } from "./types";

interface AssessmentItemProps {
  assessment: AssessmentType;
  index: number;
  onAssessmentChange: (index: number, field: string, value: string) => void;
  onRemoveAssessment: (index: number) => void;
  canRemove: boolean;
}

const AssessmentItem: React.FC<AssessmentItemProps> = ({ 
  assessment, 
  index, 
  onAssessmentChange, 
  onRemoveAssessment,
  canRemove 
}) => {
  return (
    <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 last:border-0">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Assessment #{index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemoveAssessment(index)}
          disabled={!canRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`assessment-name-${index}`}>Assessment Name</Label>
          <Input
            id={`assessment-name-${index}`}
            value={assessment.name}
            onChange={(e) => onAssessmentChange(index, 'name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`assessment-duration-${index}`}>Duration</Label>
          <Input
            id={`assessment-duration-${index}`}
            value={assessment.duration}
            onChange={(e) => onAssessmentChange(index, 'duration', e.target.value)}
            placeholder="e.g. 2 hours, 1 day"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor={`assessment-cert-${index}`}>Certification Level</Label>
          <Input
            id={`assessment-cert-${index}`}
            value={assessment.certification_level}
            onChange={(e) => onAssessmentChange(index, 'certification_level', e.target.value)}
            placeholder="e.g. Basic, Professional"
          />
        </div>
        <div>
          <Label htmlFor={`assessment-cost-${index}`}>Cost (AED)</Label>
          <Input
            id={`assessment-cost-${index}`}
            type="number"
            value={assessment.cost}
            onChange={(e) => onAssessmentChange(index, 'cost', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor={`assessment-skills-${index}`}>Skill Areas (comma separated)</Label>
        <Input
          id={`assessment-skills-${index}`}
          value={assessment.skill_areas}
          onChange={(e) => onAssessmentChange(index, 'skill_areas', e.target.value)}
          placeholder="e.g. Programming, Design, Communication"
        />
      </div>
      
      <div>
        <Label htmlFor={`assessment-desc-${index}`}>Description</Label>
        <Textarea
          id={`assessment-desc-${index}`}
          value={assessment.description}
          onChange={(e) => onAssessmentChange(index, 'description', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default AssessmentItem;
