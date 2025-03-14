
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/toast";
import SchoolInfoForm from "./school/SchoolInfoForm";
import GradeUploadForm from "./school/GradeUploadForm";

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
      
      // Reset file input - Fixed type error by using HTMLInputElement instead of HTMLElement
      const fileInput = document.getElementById('grade-file') as HTMLInputElement;
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
        <SchoolInfoForm 
          schoolInfo={schoolInfo}
          handleSchoolInfoChange={handleSchoolInfoChange}
          handleSchoolSubmit={handleSchoolSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      
      <TabsContent value="grade-upload">
        <GradeUploadForm 
          gradeUpload={gradeUpload}
          handleGradeUploadChange={handleGradeUploadChange}
          handleGradeUpload={handleGradeUpload}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SchoolDataEntryForm;
