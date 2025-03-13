
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { createAssessmentCenter, createAssessmentType } from "@/utils/assessmentCentersService";
import { supabase } from "@/integrations/supabase/client";
import { initialFormData, AssessmentCenterData } from "./assessment-center/types";
import CenterDetailsForm from "./assessment-center/CenterDetailsForm";
import AssessmentsForm from "./assessment-center/AssessmentsForm";

interface AssessmentCenterFormProps {
  onSuccess?: () => void;
}

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
          {step === 'center' ? (
            <CenterDetailsForm 
              formData={formData}
              handleChange={handleChange}
              onClearForm={() => setFormData(initialFormData)}
              onNext={() => setStep('assessments')}
            />
          ) : (
            <AssessmentsForm
              formData={formData}
              onAssessmentChange={handleAssessmentChange}
              onAddAssessment={addAssessment}
              onRemoveAssessment={removeAssessment}
              onBack={() => setStep('center')}
              isSaving={isSaving}
            />
          )}
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
