
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface RequirementsSectionProps {
  requirements: string[];
  documentRequirements: string[];
  setRequirements: (reqs: string[]) => void;
  setDocumentRequirements: (reqs: string[]) => void;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ 
  requirements, 
  documentRequirements, 
  setRequirements, 
  setDocumentRequirements 
}) => {
  const [newRequirement, setNewRequirement] = useState("");
  const [newDocumentRequirement, setNewDocumentRequirement] = useState("");
  const form = useFormContext();

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const handleAddDocumentRequirement = () => {
    if (newDocumentRequirement.trim()) {
      setDocumentRequirements([...documentRequirements, newDocumentRequirement.trim()]);
      setNewDocumentRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRemoveDocumentRequirement = (index: number) => {
    setDocumentRequirements(documentRequirements.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Requirements & Eligibility</h3>
        
        <div className="mb-4">
          <FormLabel>Scholarship Requirements</FormLabel>
          <div className="flex mt-2">
            <Input 
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add requirement"
              className="mr-2"
            />
            <Button 
              type="button" 
              onClick={handleAddRequirement}
              variant="outline"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center mt-2 p-2 bg-muted rounded-md">
                <span className="flex-1">{req}</span>
                <Button 
                  type="button" 
                  onClick={() => handleRemoveRequirement(index)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <FormLabel>Required Documents</FormLabel>
          <div className="flex mt-2">
            <Input 
              value={newDocumentRequirement}
              onChange={(e) => setNewDocumentRequirement(e.target.value)}
              placeholder="Add document requirement"
              className="mr-2"
            />
            <Button 
              type="button" 
              onClick={handleAddDocumentRequirement}
              variant="outline"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-2">
            {documentRequirements.map((req, index) => (
              <div key={index} className="flex items-center mt-2 p-2 bg-muted rounded-md">
                <span className="flex-1">{req}</span>
                <Button 
                  type="button" 
                  onClick={() => handleRemoveDocumentRequirement(index)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Eligibility Criteria</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel className="text-xs">Minimum GPA</FormLabel>
              <Input 
                type="number" 
                placeholder="e.g., 3.5"
                min="0"
                max="4" 
                step="0.1"
                onChange={(e) => {
                  const criteria = { ...form.getValues().eligibility_criteria };
                  criteria.gpa = e.target.value ? parseFloat(e.target.value) : null;
                  form.setValue("eligibility_criteria", criteria);
                }}
              />
            </div>
            <div>
              <FormLabel className="text-xs">Citizenship</FormLabel>
              <Input 
                placeholder="e.g., UAE Nationals"
                onChange={(e) => {
                  const criteria = { ...form.getValues().eligibility_criteria };
                  criteria.citizenship = e.target.value || null;
                  form.setValue("eligibility_criteria", criteria);
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequirementsSection;
