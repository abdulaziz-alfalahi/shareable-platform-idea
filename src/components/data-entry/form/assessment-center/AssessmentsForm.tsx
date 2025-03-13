
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssessmentCenterData } from "./types";
import AssessmentItem from "./AssessmentItem";

interface AssessmentsFormProps {
  formData: AssessmentCenterData;
  onAssessmentChange: (index: number, field: string, value: string) => void;
  onAddAssessment: () => void;
  onRemoveAssessment: (index: number) => void;
  onBack: () => void;
  isSaving: boolean;
}

const AssessmentsForm: React.FC<AssessmentsFormProps> = ({
  formData,
  onAssessmentChange,
  onAddAssessment,
  onRemoveAssessment,
  onBack,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Assessment Types</h3>
        
        {formData.assessments.map((assessment, index) => (
          <AssessmentItem
            key={index}
            assessment={assessment}
            index={index}
            onAssessmentChange={onAssessmentChange}
            onRemoveAssessment={onRemoveAssessment}
            canRemove={formData.assessments.length > 1}
          />
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={onAddAssessment}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Assessment
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
          {isSaving ? "Saving..." : "Save Assessment Center"}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentsForm;
