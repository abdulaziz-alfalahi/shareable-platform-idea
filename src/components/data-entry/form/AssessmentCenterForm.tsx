
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/toast";
import { createAssessmentCenter, createAssessmentType } from "@/utils/assessmentCentersService";
import { X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AssessmentCenterFormProps {
  onSuccess?: () => void;
}

interface AssessmentCenterData {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  license_number: string;
  description: string;
  assessments: {
    name: string;
    description: string;
    duration: string;
    skill_areas: string;
    certification_level: string;
    cost: string;
  }[];
}

const initialFormData: AssessmentCenterData = {
  name: "",
  location: "",
  contact_email: "",
  contact_phone: "",
  license_number: "",
  description: "",
  assessments: [
    {
      name: "",
      description: "",
      duration: "",
      skill_areas: "",
      certification_level: "",
      cost: ""
    }
  ]
};

const AssessmentCenterForm: React.FC<AssessmentCenterFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AssessmentCenterData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState<'center' | 'assessments'>('center');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssessmentChange = (index: number, field: string, value: string) => {
    const updatedAssessments = [...formData.assessments];
    updatedAssessments[index] = {
      ...updatedAssessments[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      assessments: updatedAssessments
    }));
  };

  const addAssessment = () => {
    setFormData(prev => ({
      ...prev,
      assessments: [
        ...prev.assessments, 
        {
          name: "",
          description: "",
          duration: "",
          skill_areas: "",
          certification_level: "",
          cost: ""
        }
      ]
    }));
  };

  const removeAssessment = (index: number) => {
    if (formData.assessments.length <= 1) return;
    
    const updatedAssessments = formData.assessments.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      assessments: updatedAssessments
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // First create the center
      const centerResult = await createAssessmentCenter({
        name: formData.name,
        location: formData.location,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        license_number: formData.license_number,
        description: formData.description
      });
      
      if (!centerResult.success) {
        throw new Error(centerResult.error);
      }
      
      // Fetch the newly created center to get its ID
      const { data: centers } = await supabase
        .from('assessment_centers')
        .select('id')
        .eq('name', formData.name)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!centers || centers.length === 0) {
        throw new Error("Failed to retrieve the created center");
      }
      
      const centerId = centers[0].id;
      
      // Create assessments if they have a name
      for (const assessment of formData.assessments) {
        if (assessment.name) {
          // Convert comma-separated skill areas to array
          const skillAreas = assessment.skill_areas
            ? assessment.skill_areas.split(',').map(s => s.trim())
            : [];
            
          await createAssessmentType({
            center_id: centerId,
            name: assessment.name,
            description: assessment.description,
            duration: assessment.duration,
            skill_areas: skillAreas,
            certification_level: assessment.certification_level,
            cost: assessment.cost ? parseFloat(assessment.cost) : undefined
          });
        }
      }
      
      toast({
        title: "Assessment center and types saved",
        description: `Successfully added ${formData.name} with ${formData.assessments.filter(a => a.name).length} assessments.`
      });
      
      setFormData(initialFormData);
      setStep('center');
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving assessment center:", error);
      toast({
        title: "Error saving record",
        description: error instanceof Error ? error.message : "There was a problem saving the assessment center record.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderCenterForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Center Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="license_number">License Number</Label>
        <Input
          id="license_number"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setFormData(initialFormData)}
        >
          Clear Form
        </Button>
        <Button 
          type="button" 
          onClick={() => setStep('assessments')}
        >
          Next: Add Assessments
        </Button>
      </div>
    </div>
  );

  const renderAssessmentsForm = () => (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Assessment Types</h3>
        
        {formData.assessments.map((assessment, index) => (
          <div key={index} className="space-y-4 mb-6 pb-6 border-b border-gray-200 last:border-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Assessment #{index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAssessment(index)}
                disabled={formData.assessments.length <= 1}
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
                  onChange={(e) => handleAssessmentChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`assessment-duration-${index}`}>Duration</Label>
                <Input
                  id={`assessment-duration-${index}`}
                  value={assessment.duration}
                  onChange={(e) => handleAssessmentChange(index, 'duration', e.target.value)}
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
                  onChange={(e) => handleAssessmentChange(index, 'certification_level', e.target.value)}
                  placeholder="e.g. Basic, Professional"
                />
              </div>
              <div>
                <Label htmlFor={`assessment-cost-${index}`}>Cost (AED)</Label>
                <Input
                  id={`assessment-cost-${index}`}
                  type="number"
                  value={assessment.cost}
                  onChange={(e) => handleAssessmentChange(index, 'cost', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`assessment-skills-${index}`}>Skill Areas (comma separated)</Label>
              <Input
                id={`assessment-skills-${index}`}
                value={assessment.skill_areas}
                onChange={(e) => handleAssessmentChange(index, 'skill_areas', e.target.value)}
                placeholder="e.g. Programming, Design, Communication"
              />
            </div>
            
            <div>
              <Label htmlFor={`assessment-desc-${index}`}>Description</Label>
              <Textarea
                id={`assessment-desc-${index}`}
                value={assessment.description}
                onChange={(e) => handleAssessmentChange(index, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={addAssessment}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Assessment
        </Button>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep('center')}
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

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Assessment Center Data Entry</CardTitle>
          <CardDescription>
            Enter assessment center information and their offered assessment types. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'center' ? renderCenterForm() : renderAssessmentsForm()}
        </CardContent>
        {step === 'assessments' && (
          <CardFooter className="flex justify-between">
            <div></div> {/* Empty div for spacing */}
            <Button 
              type="submit" 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Assessment Center"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </form>
  );
};

export default AssessmentCenterForm;
