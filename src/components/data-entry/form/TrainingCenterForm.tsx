import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/toast";
import { createTrainingCenter, createTrainingProgram } from "@/utils/trainingCentersService";
import { X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TrainingCenterFormProps {
  onSuccess?: () => void;
}

interface TrainingCenterData {
  name: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  license_number: string;
  description: string;
  programs: {
    name: string;
    description: string;
    duration: string;
    skill_level: string;
    target_audience: string;
    certification_offered: boolean;
    start_date: string;
    end_date: string;
    cost: string;
  }[];
}

const initialFormData: TrainingCenterData = {
  name: "",
  location: "",
  contact_email: "",
  contact_phone: "",
  license_number: "",
  description: "",
  programs: [
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
};

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
          onClick={() => setStep('programs')}
        >
          Next: Add Programs
        </Button>
      </div>
    </div>
  );

  const renderProgramsForm = () => (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Training Programs</h3>
        
        {formData.programs.map((program, index) => (
          <div key={index} className="space-y-4 mb-6 pb-6 border-b border-gray-200 last:border-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Program #{index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProgram(index)}
                disabled={formData.programs.length <= 1}
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
                  onChange={(e) => handleProgramChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`program-duration-${index}`}>Duration</Label>
                <Input
                  id={`program-duration-${index}`}
                  value={program.duration}
                  onChange={(e) => handleProgramChange(index, 'duration', e.target.value)}
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
                  onChange={(e) => handleProgramChange(index, 'skill_level', e.target.value)}
                  placeholder="e.g. Beginner, Intermediate"
                />
              </div>
              <div>
                <Label htmlFor={`program-audience-${index}`}>Target Audience</Label>
                <Input
                  id={`program-audience-${index}`}
                  value={program.target_audience}
                  onChange={(e) => handleProgramChange(index, 'target_audience', e.target.value)}
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
                  onChange={(e) => handleProgramChange(index, 'start_date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`program-end-${index}`}>End Date</Label>
                <Input
                  id={`program-end-${index}`}
                  type="date"
                  value={program.end_date}
                  onChange={(e) => handleProgramChange(index, 'end_date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`program-cost-${index}`}>Cost (AED)</Label>
                <Input
                  id={`program-cost-${index}`}
                  type="number"
                  value={program.cost}
                  onChange={(e) => handleProgramChange(index, 'cost', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`program-desc-${index}`}>Description</Label>
              <Textarea
                id={`program-desc-${index}`}
                value={program.description}
                onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`program-cert-${index}`}
                checked={program.certification_offered}
                onChange={(e) => handleProgramChange(index, 'certification_offered', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor={`program-cert-${index}`} className="cursor-pointer">
                Certification Offered
              </Label>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={addProgram}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Program
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
          {isSaving ? "Saving..." : "Save Training Center"}
        </Button>
      </div>
    </div>
  );

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
          {step === 'center' ? renderCenterForm() : renderProgramsForm()}
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
