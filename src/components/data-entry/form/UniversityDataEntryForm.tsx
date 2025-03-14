
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/toast";
import UniversityInfoForm from "./university/UniversityInfoForm";
import ProgramForm from "./university/ProgramForm";
import GradeUploadForm from "./university/GradeUploadForm";
import { UniversityInfo, Program, GradeUpload } from "./university/types";

const UniversityDataEntryForm = () => {
  const { toast } = useToast();
  const [universityInfo, setUniversityInfo] = useState<UniversityInfo>({
    name: "",
    location: "",
    contact_email: "",
    contact_phone: "",
    accreditation_number: "",
    description: ""
  });
  
  const [program, setProgram] = useState<Program>({
    name: "",
    description: "",
    degree_level: "",
    duration: "",
    credits: "",
    department: ""
  });
  
  const [programs, setPrograms] = useState<Program[]>([]);
  
  const [gradeUpload, setGradeUpload] = useState<GradeUpload>({
    program: "",
    academic_year: "",
    semester: "",
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleUniversityInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUniversityInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProgram(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGradeUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === "file" && files) {
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
  
  const handleSelectChange = (name: string, value: string) => {
    setGradeUpload(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addProgram = () => {
    if (!program.name || !program.degree_level) {
      toast({
        title: "Required fields missing",
        description: "Program name and degree level are required.",
        variant: "destructive"
      });
      return;
    }
    
    setPrograms(prev => [...prev, { ...program, id: Date.now() }]);
    setProgram({
      name: "",
      description: "",
      degree_level: "",
      duration: "",
      credits: "",
      department: ""
    });
    
    toast({
      title: "Program added",
      description: `${program.name} has been added to the programs list.`
    });
  };
  
  const removeProgram = (id: number) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };
  
  const handleUniversitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "University registered successfully",
        description: "University information and programs have been saved."
      });
      
      // Clear form
      setUniversityInfo({
        name: "",
        location: "",
        contact_email: "",
        contact_phone: "",
        accreditation_number: "",
        description: ""
      });
      setPrograms([]);
    } catch (error) {
      toast({
        title: "Error registering university",
        description: "There was a problem saving the university information.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGradeUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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
        description: `Uploaded grades for ${gradeUpload.program} - ${gradeUpload.semester}.`
      });
      
      // Clear form
      setGradeUpload({
        program: "",
        academic_year: "",
        semester: "",
        file: null
      });
      
      // Reset file input
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
    <Tabs defaultValue="university-info">
      <TabsList className="mb-6">
        <TabsTrigger value="university-info">University Information</TabsTrigger>
        <TabsTrigger value="programs">Educational Programs</TabsTrigger>
        <TabsTrigger value="grade-upload">Upload Grades & Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="university-info">
        <UniversityInfoForm
          universityInfo={universityInfo}
          handleUniversityInfoChange={handleUniversityInfoChange}
          handleUniversitySubmit={handleUniversitySubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      
      <TabsContent value="programs">
        <ProgramForm
          program={program}
          programs={programs}
          handleProgramChange={handleProgramChange}
          setProgram={setProgram}
          addProgram={addProgram}
          removeProgram={removeProgram}
          handleUniversitySubmit={() => handleUniversitySubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
      
      <TabsContent value="grade-upload">
        <GradeUploadForm
          gradeUpload={gradeUpload}
          programs={programs}
          handleGradeUploadChange={handleGradeUploadChange}
          handleSelectChange={handleSelectChange}
          handleGradeUpload={handleGradeUpload}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
};

export default UniversityDataEntryForm;
