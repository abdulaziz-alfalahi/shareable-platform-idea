
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { StudentFormData, initialFormData } from "./types";
import PersonalInfoFields from "./PersonalInfoFields";
import SubjectsFields from "./SubjectsFields";
import NotesField from "./NotesField";
import { createStudentRecord } from "@/utils/dataEntryService";

interface StudentFormProps {
  onSuccess?: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (index: number, field: 'name' | 'grade', value: string) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", grade: "" }]
    }));
  };

  const removeSubject = (index: number) => {
    if (formData.subjects.length <= 1) return;
    
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.studentName || !formData.nationalId) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    // Save to database
    const result = await createStudentRecord(formData);
    
    if (result.success) {
      toast({
        title: "Student record saved",
        description: `Successfully added record for ${formData.studentName}.`
      });
      setFormData(initialFormData);
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast({
        title: "Error saving record",
        description: result.error || "There was a problem saving the student record. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Manual Student Data Entry</CardTitle>
          <CardDescription>
            Enter student information and academic records. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <PersonalInfoFields 
            formData={formData}
            handleChange={handleChange}
          />
          
          <SubjectsFields 
            subjects={formData.subjects}
            handleSubjectChange={handleSubjectChange}
            addSubject={addSubject}
            removeSubject={removeSubject}
          />
          
          <NotesField 
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setFormData(initialFormData)}
          >
            Clear Form
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Student Record"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default StudentForm;
