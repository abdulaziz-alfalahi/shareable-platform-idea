
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, PlusCircle, Trash } from "lucide-react";
import { useToast } from "@/hooks/toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UniversityDataEntryForm = () => {
  const { toast } = useToast();
  const [universityInfo, setUniversityInfo] = useState({
    name: "",
    location: "",
    contact_email: "",
    contact_phone: "",
    accreditation_number: "",
    description: ""
  });
  
  const [program, setProgram] = useState({
    name: "",
    description: "",
    degree_level: "",
    duration: "",
    credits: "",
    department: ""
  });
  
  const [programs, setPrograms] = useState([]);
  
  const [gradeUpload, setGradeUpload] = useState({
    program: "",
    academic_year: "",
    semester: "",
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleUniversityInfoChange = (e) => {
    const { name, value } = e.target;
    setUniversityInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setProgram(prev => ({
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
  
  const handleSelectChange = (name, value) => {
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
  
  const removeProgram = (id) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };
  
  const handleUniversitySubmit = async (e) => {
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
        description: `Uploaded grades for ${gradeUpload.program} - ${gradeUpload.semester}.`
      });
      
      // Clear form
      setGradeUpload({
        program: "",
        academic_year: "",
        semester: "",
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
    <Tabs defaultValue="university-info">
      <TabsList className="mb-6">
        <TabsTrigger value="university-info">University Information</TabsTrigger>
        <TabsTrigger value="programs">Educational Programs</TabsTrigger>
        <TabsTrigger value="grade-upload">Upload Grades & Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="university-info">
        <form onSubmit={handleUniversitySubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">University Name *</Label>
              <Input 
                id="name" 
                name="name" 
                value={universityInfo.name} 
                onChange={handleUniversityInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input 
                id="location" 
                name="location" 
                value={universityInfo.location} 
                onChange={handleUniversityInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email *</Label>
              <Input 
                id="contact_email" 
                name="contact_email" 
                type="email" 
                value={universityInfo.contact_email} 
                onChange={handleUniversityInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone *</Label>
              <Input 
                id="contact_phone" 
                name="contact_phone" 
                value={universityInfo.contact_phone} 
                onChange={handleUniversityInfoChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accreditation_number">Accreditation Number *</Label>
              <Input 
                id="accreditation_number" 
                name="accreditation_number" 
                value={universityInfo.accreditation_number} 
                onChange={handleUniversityInfoChange} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={universityInfo.description} 
              onChange={handleUniversityInfoChange} 
              rows={4} 
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Register University"}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="programs">
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Add Educational Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="program_name">Program Name *</Label>
                <Input 
                  id="program_name" 
                  name="name" 
                  value={program.name} 
                  onChange={handleProgramChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="degree_level">Degree Level *</Label>
                <Select 
                  value={program.degree_level} 
                  onValueChange={(value) => setProgram(prev => ({ ...prev, degree_level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={program.duration} 
                  onChange={handleProgramChange} 
                  placeholder="e.g., 4 years, 2 semesters" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input 
                  id="credits" 
                  name="credits" 
                  value={program.credits} 
                  onChange={handleProgramChange} 
                  placeholder="e.g., 120 credits" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department" 
                  name="department" 
                  value={program.department} 
                  onChange={handleProgramChange} 
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <Label htmlFor="program_description">Description</Label>
              <Textarea 
                id="program_description" 
                name="description" 
                value={program.description} 
                onChange={handleProgramChange} 
                rows={3} 
              />
            </div>
            
            <Button type="button" onClick={addProgram} className="flex gap-2 items-center">
              <PlusCircle className="h-4 w-4" />
              Add Program
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Added Programs</h3>
            
            {programs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No programs added yet</p>
            ) : (
              <div className="space-y-4">
                {programs.map((p) => (
                  <div key={p.id} className="border rounded-md p-4 flex justify-between">
                    <div>
                      <h4 className="font-medium">{p.name}</h4>
                      <p className="text-sm text-gray-500">
                        {p.degree_level} {p.duration && `• ${p.duration}`} {p.credits && `• ${p.credits} credits`}
                      </p>
                      {p.description && <p className="text-sm mt-2">{p.description}</p>}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeProgram(p.id)}
                      className="text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button onClick={handleUniversitySubmit} disabled={isSubmitting} className="mt-4">
                  {isSubmitting ? "Saving..." : "Save All Programs"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="grade-upload">
        <form onSubmit={handleGradeUpload}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="program_select">Program *</Label>
              <Select 
                value={gradeUpload.program} 
                onValueChange={(value) => handleSelectChange("program", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                  ))}
                  <SelectItem value="computer_science">Computer Science</SelectItem>
                  <SelectItem value="business_admin">Business Administration</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="semester">Semester *</Label>
              <Select 
                value={gradeUpload.semester} 
                onValueChange={(value) => handleSelectChange("semester", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                </SelectContent>
              </Select>
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

export default UniversityDataEntryForm;
