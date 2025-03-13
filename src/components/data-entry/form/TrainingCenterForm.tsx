
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { createTrainingCenter, createTrainingProgram } from "@/utils/trainingCentersService";
import { supabase } from "@/integrations/supabase/client";
import { initialFormData, TrainingCenterData } from "./training-center/types";
import CenterDetailsForm from "./training-center/CenterDetailsForm";
import ProgramsForm from "./training-center/ProgramsForm";

interface TrainingCenterFormProps {
  onSuccess?: () => void;
}

const TrainingCenterForm: React.FC<TrainingCenterFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TrainingCenterData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState<'center' | 'programs'>('center');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramChange = (index: number, field: string, value: string | boolean) => {
    const updatedPrograms = [...formData.programs];
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      programs: updatedPrograms
    }));
  };

  const addProgram = () => {
    setFormData(prev => ({
      ...prev,
      programs: [
        ...prev.programs, 
        {
          name: "",
          description: "",
          duration: "",
          skill_level: "",
          target_audience: "",
          certification_offered: false,
          start_date: "",
          end_date: "",
          cost: ""
        }
      ]
    }));
  };

  const removeProgram = (index: number) => {
    if (formData.programs.length <= 1) return;
    
    const updatedPrograms = formData.programs.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      programs: updatedPrograms
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const centerResult = await createTrainingCenter({
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
      
      const { data: centers } = await supabase
        .from('training_centers')
        .select('id')
        .eq('name', formData.name)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (!centers || centers.length === 0) {
        throw new Error("Failed to retrieve the created center");
      }
      
      const centerId = centers[0].id;
      
      for (const program of formData.programs) {
        if (program.name) {
          await createTrainingProgram({
            center_id: centerId,
            name: program.name,
            description: program.description,
            duration: program.duration,
            skill_level: program.skill_level,
            target_audience: program.target_audience,
            certification_offered: program.certification_offered,
            start_date: program.start_date,
            end_date: program.end_date,
            cost: program.cost ? parseFloat(program.cost) : undefined
          });
        }
      }
      
      toast({
        title: "Training center and programs saved",
        description: `Successfully added ${formData.name} with ${formData.programs.filter(p => p.name).length} programs.`
      });
      
      setFormData(initialFormData);
      setStep('center');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving training center:", error);
      toast({
        title: "Error saving record",
        description: error instanceof Error ? error.message : "There was a problem saving the training center record.",
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
          <CardTitle>Training Center Data Entry</CardTitle>
          <CardDescription>
            Enter training center information and their offered programs. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'center' ? (
            <CenterDetailsForm 
              formData={formData}
              handleChange={handleChange}
              onClearForm={() => setFormData(initialFormData)}
              onNext={() => setStep('programs')}
            />
          ) : (
            <ProgramsForm
              formData={formData}
              onProgramChange={handleProgramChange}
              onAddProgram={addProgram}
              onRemoveProgram={removeProgram}
              onBack={() => setStep('center')}
              isSaving={isSaving}
            />
          )}
        </CardContent>
        {step === 'programs' && (
          <CardFooter className="flex justify-between">
            <div></div>
            <Button 
              type="submit" 
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Training Center"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </form>
  );
};

export default TrainingCenterForm;
