
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/toast";

const SchoolDataEntryForm = () => {
  const { toast } = useToast();
  const [schoolInfo, setSchoolInfo] = useState({
    name: "",
    location: "",
    contact_email: "",
    contact_phone: "",
    registration_number: "",
    description: ""
  });
  
  const [gradeUpload, setGradeUpload] = useState({
    grade_level: "",
    academic_year: "",
    term: "",
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSchoolInfoChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGradeUploadChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "file") {
      setGradeUpload(prev => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setGradeUpload(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSchoolSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "School registered successfully",
        description: "School information has been saved."
      });
      
      // Clear form
      setSchoolInfo({
        name: "",
        location: "",
        contact_email: "",
        contact_phone: "",
        registration_number: "",
        description: ""
      });
    } catch (error) {
      toast({
        title: "Error registering school",
        description: "There was a problem saving the school information.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGradeUpload = async (e) => {
    e.preventDefault();
    
    if (!gradeUpload.file) {
      toast({
        title: "File required",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Grades uploaded successfully",
        description: `Uploaded grades for ${gradeUpload.grade_level} - ${gradeUpload.term}.`
      });
      
      // Clear form
      setGradeUpload({
        grade_level: "",
        academic_year: "",
        term: "",
        file: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('grade-file');
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      toast({
        title: "Error uploading grades",
        description: "There was a problem uploading the grades file.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Tabs defaultValue="school-info">
      <TabsList className="mb-6">
        <TabsTrigger value="school-info">School Information</TabsTrigger>
        <TabsTrigger value="grade-upload">Upload Grades & Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="school-info">
        <form onSubmit={handleSchoolSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">School Name *</Label>
              <Input 
                id="name" 
                name="name" 
                value={schoolInfo.name} 
                onChange={handleSchoolInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input 
                id="location" 
                name="location" 
                value={schoolInfo.location} 
                onChange={handleSchoolInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email *</Label>
              <Input 
                id="contact_email" 
                name="contact_email" 
                type="email" 
                value={schoolInfo.contact_email} 
                onChange={handleSchoolInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone *</Label>
              <Input 
                id="contact_phone" 
                name="contact_phone" 
                value={schoolInfo.contact_phone} 
                onChange={handleSchoolInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration_number">Registration Number *</Label>
              <Input 
                id="registration_number" 
                name="registration_number" 
                value={schoolInfo.registration_number} 
                onChange={handleSchoolInfoChange} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={schoolInfo.description} 
              onChange={handleSchoolInfoChange} 
              rows={4} 
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Register School"}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="grade-upload">
        <form onSubmit={handleGradeUpload}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="grade_level">Grade Level *</Label>
              <Input 
                id="grade_level" 
                name="grade_level" 
                value={gradeUpload.grade_level} 
                onChange={handleGradeUploadChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="academic_year">Academic Year *</Label>
              <Input 
                id="academic_year" 
                name="academic_year" 
                value={gradeUpload.academic_year} 
                onChange={handleGradeUploadChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="term">Term *</Label>
              <Input 
                id="term" 
                name="term" 
                value={gradeUpload.term} 
                onChange={handleGradeUploadChange} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="grade-file">Upload File (Excel or CSV) *</Label>
            <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop or click to select</p>
              <Input 
                id="grade-file" 
                name="file" 
                type="file" 
                accept=".xlsx,.xls,.csv"
                onChange={handleGradeUploadChange} 
                className="max-w-xs"
                required 
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload Grades"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default SchoolDataEntryForm;
