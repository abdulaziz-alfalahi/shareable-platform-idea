
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Book, 
  Calendar,
  Save,
  Download,
  ArrowLeft,
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      objective: "",
    },
    education: [
      { id: 1, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }
    ],
    experience: [
      { id: 1, company: "", position: "", location: "", startDate: "", endDate: "", description: "" }
    ],
    skills: [
      { id: 1, name: "" }
    ],
    languages: [
      { id: 1, name: "", proficiency: "beginner" }
    ],
    certifications: [
      { id: 1, name: "", issuer: "", date: "" }
    ]
  });

  const [activeSection, setActiveSection] = useState("personalInfo");
  
  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      setResumeData({
        ...resumeData,
        [section]: resumeData[section].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      });
    } else {
      setResumeData({
        ...resumeData,
        [section]: {
          ...resumeData[section],
          [field]: value
        }
      });
    }
  };

  const addItem = (section) => {
    const newId = resumeData[section].length > 0 
      ? Math.max(...resumeData[section].map(item => item.id)) + 1 
      : 1;
    
    let newItem = { id: newId };
    
    switch(section) {
      case "education":
        newItem = { ...newItem, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" };
        break;
      case "experience":
        newItem = { ...newItem, company: "", position: "", location: "", startDate: "", endDate: "", description: "" };
        break;
      case "skills":
        newItem = { ...newItem, name: "" };
        break;
      case "languages":
        newItem = { ...newItem, name: "", proficiency: "beginner" };
        break;
      case "certifications":
        newItem = { ...newItem, name: "", issuer: "", date: "" };
        break;
      default:
        break;
    }

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem]
    });
  };

  const removeItem = (section, id) => {
    if (resumeData[section].length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one entry in this section",
        variant: "destructive"
      });
      return;
    }
    
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter(item => item.id !== id)
    });
  };

  const saveResume = () => {
    // Here you would typically save to a database
    // For now, we'll just show a success toast
    localStorage.setItem("savedResume", JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
      className: "bg-emirati-oasisGreen text-white"
    });
  };

  const downloadResume = () => {
    const filename = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.json`;
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as JSON",
    });
  };

  const renderSection = () => {
    switch(activeSection) {
      case "personalInfo":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emirati-oasisGreen">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={resumeData.personalInfo.name} 
                  onChange={(e) => handleChange("personalInfo", "name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={resumeData.personalInfo.email} 
                  onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={resumeData.personalInfo.phone} 
                  onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                  placeholder="+971 XXXXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={resumeData.personalInfo.location} 
                  onChange={(e) => handleChange("personalInfo", "location", e.target.value)}
                  placeholder="City, Emirate"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective">Professional Objective</Label>
              <textarea 
                id="objective"
                className="w-full p-2 border rounded-md min-h-[100px] bg-background"
                value={resumeData.personalInfo.objective} 
                onChange={(e) => handleChange("personalInfo", "objective", e.target.value)}
                placeholder="Briefly describe your career objectives..."
              />
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emirati-oasisGreen">Education</h3>
              <Button 
                onClick={() => addItem("education")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Education
              </Button>
            </div>
            
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id} className="border-emirati-desertGold">
                <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    {edu.institution ? edu.institution : `Education #${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("education", edu.id)}
                    className="h-8 w-8 text-emirati-subtleRed"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution Name</Label>
                      <Input 
                        value={edu.institution} 
                        onChange={(e) => handleChange("education", "institution", e.target.value, index)}
                        placeholder="University/School Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input 
                        value={edu.degree} 
                        onChange={(e) => handleChange("education", "degree", e.target.value, index)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input 
                        value={edu.field} 
                        onChange={(e) => handleChange("education", "field", e.target.value, index)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GPA (Optional)</Label>
                      <Input 
                        value={edu.gpa} 
                        onChange={(e) => handleChange("education", "gpa", e.target.value, index)}
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={edu.startDate} 
                        onChange={(e) => handleChange("education", "startDate", e.target.value, index)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date (or Expected)</Label>
                      <Input 
                        type="date"
                        value={edu.endDate} 
                        onChange={(e) => handleChange("education", "endDate", e.target.value, index)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "experience":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emirati-oasisGreen">Work Experience</h3>
              <Button 
                onClick={() => addItem("experience")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Experience
              </Button>
            </div>
            
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id} className="border-emirati-desertGold">
                <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                    {exp.position ? `${exp.position}${exp.company ? ` at ${exp.company}` : ''}` : `Experience #${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("experience", exp.id)}
                    className="h-8 w-8 text-emirati-subtleRed"
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company/Organization</Label>
                      <Input 
                        value={exp.company} 
                        onChange={(e) => handleChange("experience", "company", e.target.value, index)}
                        placeholder="Company Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Position/Title</Label>
                      <Input 
                        value={exp.position} 
                        onChange={(e) => handleChange("experience", "position", e.target.value, index)}
                        placeholder="Job Title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input 
                        value={exp.location} 
                        onChange={(e) => handleChange("experience", "location", e.target.value, index)}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={exp.startDate} 
                        onChange={(e) => handleChange("experience", "startDate", e.target.value, index)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        type="date"
                        value={exp.endDate} 
                        onChange={(e) => handleChange("experience", "endDate", e.target.value, index)}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Label>Job Description & Achievements</Label>
                    <textarea 
                      className="w-full p-2 border rounded-md min-h-[100px] bg-background"
                      value={exp.description} 
                      onChange={(e) => handleChange("experience", "description", e.target.value, index)}
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "skills":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emirati-oasisGreen">Skills</h3>
              <Button 
                onClick={() => addItem("skills")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Skill
              </Button>
            </div>
            
            <Card className="border-emirati-desertGold">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Input 
                        value={skill.name} 
                        onChange={(e) => handleChange("skills", "name", e.target.value, index)}
                        placeholder="Skill name"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem("skills", skill.id)}
                        className="h-8 w-8 text-emirati-subtleRed"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "languages":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emirati-oasisGreen">Languages</h3>
              <Button 
                onClick={() => addItem("languages")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Language
              </Button>
            </div>
            
            {resumeData.languages.map((lang, index) => (
              <Card key={lang.id} className="border-emirati-desertGold">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Language</Label>
                      <Input 
                        value={lang.name} 
                        onChange={(e) => handleChange("languages", "name", e.target.value, index)}
                        placeholder="e.g., Arabic, English"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <Label>Proficiency Level</Label>
                      <RadioGroup 
                        value={lang.proficiency}
                        onValueChange={(value) => handleChange("languages", "proficiency", value, index)}
                        className="flex space-x-2"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="beginner" id={`beginner-${lang.id}`} />
                          <Label htmlFor={`beginner-${lang.id}`}>Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="intermediate" id={`intermediate-${lang.id}`} />
                          <Label htmlFor={`intermediate-${lang.id}`}>Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="advanced" id={`advanced-${lang.id}`} />
                          <Label htmlFor={`advanced-${lang.id}`}>Advanced</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="native" id={`native-${lang.id}`} />
                          <Label htmlFor={`native-${lang.id}`}>Native</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("languages", lang.id)}
                      className="h-8 w-8 text-emirati-subtleRed self-start sm:self-center mt-2 sm:mt-6"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case "certifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-emirati-oasisGreen">Certifications & Awards</h3>
              <Button 
                onClick={() => addItem("certifications")} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Certification
              </Button>
            </div>
            
            {resumeData.certifications.map((cert, index) => (
              <Card key={cert.id} className="border-emirati-desertGold">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Certification/Award Name</Label>
                      <Input 
                        value={cert.name} 
                        onChange={(e) => handleChange("certifications", "name", e.target.value, index)}
                        placeholder="Certification title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input 
                        value={cert.issuer} 
                        onChange={(e) => handleChange("certifications", "issuer", e.target.value, index)}
                        placeholder="Organization name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date Received</Label>
                      <Input 
                        type="date"
                        value={cert.date} 
                        onChange={(e) => handleChange("certifications", "date", e.target.value, index)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("certifications", cert.id)}
                      className="text-emirati-subtleRed"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 min-h-screen bg-emirati-sandstone">
      <div className="flex flex-col items-start mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="text-emirati-oasisGreen mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">Resume Builder</h1>
        <p className="text-emirati-camelBrown mt-2">Create a professional resume to showcase your skills and experience.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 border-emirati-desertGold">
          <CardContent className="p-4">
            <nav className="space-y-2">
              <Button
                variant={activeSection === "personalInfo" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "personalInfo" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("personalInfo")}
              >
                <User className="mr-2 h-4 w-4" /> Personal Info
              </Button>
              
              <Button
                variant={activeSection === "education" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "education" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("education")}
              >
                <GraduationCap className="mr-2 h-4 w-4" /> Education
              </Button>
              
              <Button
                variant={activeSection === "experience" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "experience" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("experience")}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Experience
              </Button>
              
              <Button
                variant={activeSection === "skills" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "skills" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("skills")}
              >
                <Award className="mr-2 h-4 w-4" /> Skills
              </Button>
              
              <Button
                variant={activeSection === "languages" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "languages" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("languages")}
              >
                <Book className="mr-2 h-4 w-4" /> Languages
              </Button>
              
              <Button
                variant={activeSection === "certifications" ? "default" : "ghost"}
                className={`w-full justify-start ${activeSection === "certifications" ? "bg-emirati-oasisGreen" : ""}`}
                onClick={() => setActiveSection("certifications")}
              >
                <FileText className="mr-2 h-4 w-4" /> Certifications
              </Button>
              
              <Separator className="my-4" />
              
              <Button
                onClick={saveResume}
                className="w-full btn-success"
              >
                <Save className="mr-2 h-4 w-4" /> Save Resume
              </Button>
              
              <Button
                onClick={downloadResume}
                variant="outline"
                className="w-full border-emirati-desertGold text-emirati-camelBrown"
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </nav>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3 border-emirati-desertGold">
          <CardContent className="p-6">
            {renderSection()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
