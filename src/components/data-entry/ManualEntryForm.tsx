
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/toast";

interface FormData {
  studentId: string;
  studentName: string;
  nationalId: string;
  email: string;
  school: string;
  grade: string;
  dateOfBirth: string;
  subjects: {
    name: string;
    grade: string;
  }[];
  additionalNotes: string;
}

const initialFormData: FormData = {
  studentId: "",
  studentName: "",
  nationalId: "",
  email: "",
  school: "",
  grade: "",
  dateOfBirth: "",
  subjects: [
    { name: "", grade: "" }
  ],
  additionalNotes: ""
};

const ManualEntryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Student record saved",
        description: `Successfully added record for ${formData.studentName}.`
      });
      
      setIsSaving(false);
      setFormData(initialFormData);
    }, 1500);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Full Name *</Label>
              <Input 
                id="studentName" 
                name="studentName" 
                value={formData.studentName}
                onChange={handleChange}
                placeholder="e.g. Mohammed Al Maktoum"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input 
                id="studentId" 
                name="studentId" 
                value={formData.studentId}
                onChange={handleChange}
                placeholder="e.g. STU29384"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID / Emirates ID *</Label>
              <Input 
                id="nationalId" 
                name="nationalId" 
                value={formData.nationalId}
                onChange={handleChange}
                placeholder="e.g. 784-XXXX-XXXXXXX-X"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. student@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school">School / Institution</Label>
              <Input 
                id="school" 
                name="school" 
                value={formData.school}
                onChange={handleChange}
                placeholder="e.g. UAE University"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Current Grade / Year</Label>
              <Input 
                id="grade" 
                name="grade" 
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g. Grade 10 / Year 2"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Academic Subjects & Grades</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addSubject}
              >
                Add Subject
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Subject Name"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-20">
                    <Input 
                      placeholder="Grade"
                      value={subject.grade}
                      onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSubject(index)}
                    disabled={formData.subjects.length <= 1}
                  >
                    <span className="sr-only">Remove</span>
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea 
              id="additionalNotes" 
              name="additionalNotes" 
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information about the student..."
              rows={4}
            />
          </div>
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

export default ManualEntryForm;
