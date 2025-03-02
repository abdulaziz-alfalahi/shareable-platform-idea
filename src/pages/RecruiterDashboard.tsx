import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ChevronRight, User, Briefcase, Calendar, MapPin, Clock, Users, FileEdit, Trash2, Filter, Clipboard, GraduationCap, Building, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import JobMap from "@/components/JobMap";
import { useToast } from "@/hooks/use-toast";
import InterviewCalendar from "@/components/recruiter/InterviewCalendar";
import ScheduleInterviewDialog from "@/components/recruiter/ScheduleInterviewDialog";

const vacancies = [
  {
    id: 1,
    title: "UI/UX Designer",
    department: "Digital Products",
    location: "Downtown Dubai, UAE",
    type: "Full-time",
    requirements: ["UI/UX design experience", "Figma proficiency", "User research"],
    status: "Open",
    datePosted: "2023-10-15",
    coordinates: { latitude: 25.2048, longitude: 55.2708 }
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Analytics",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    requirements: ["Python", "Machine Learning", "Statistical Analysis"],
    status: "Open",
    datePosted: "2023-10-10",
    coordinates: { latitude: 24.4539, longitude: 54.3773 }
  },
  {
    id: 3,
    title: "Software Engineer",
    department: "IT",
    location: "Sharjah, UAE",
    type: "Full-time",
    requirements: ["Java", "Spring Boot", "Microservices"],
    status: "Draft",
    datePosted: "2023-10-18",
    coordinates: { latitude: 25.3463, longitude: 55.4209 }
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Contract",
    requirements: ["Project Management", "Agile methodologies", "Stakeholder management"],
    status: "Closed",
    datePosted: "2023-09-05",
    coordinates: { latitude: 25.0657, longitude: 55.1713 }
  }
];

const getAIMatchedCandidates = (vacancyId: number) => {
  return [
    { id: 101, name: "Sarah Johnson", match: 95, skills: ["UI/UX", "Figma", "Sketch", "User Research"], location: "Dubai" },
    { id: 102, name: "Mohammed Al Farsi", match: 92, skills: ["UI Design", "Adobe XD", "Prototyping"], location: "Dubai" },
    { id: 103, name: "Priya Sharma", match: 88, skills: ["UX Research", "Wireframing", "User Testing"], location: "Abu Dhabi" },
    { id: 104, name: "Alex Wong", match: 85, skills: ["Product Design", "Figma", "HTML/CSS"], location: "Dubai" },
    { id: 105, name: "Fatima Hassan", match: 82, skills: ["Visual Design", "Illustration", "Branding"], location: "Sharjah" },
    { id: 106, name: "Daniel Kim", match: 78, skills: ["Interaction Design", "Prototyping", "User Flows"], location: "Dubai" },
    { id: 107, name: "Layla Ahmed", match: 76, skills: ["UI Design", "Design Systems", "Accessibility"], location: "Abu Dhabi" },
    { id: 108, name: "Raj Patel", match: 75, skills: ["UX Design", "Research", "Information Architecture"], location: "Dubai" },
    { id: 109, name: "Emma Wilson", match: 72, skills: ["Visual Design", "Branding", "Typography"], location: "Sharjah" },
    { id: 110, name: "Omar Mahmoud", match: 70, skills: ["UI Development", "Figma", "React"], location: "Dubai" },
  ];
};

const searchCandidates = (query: string, filters: any) => {
  const allCandidates = [
    { id: 101, name: "Sarah Johnson", skills: ["UI/UX", "Figma", "Sketch", "User Research"], experience: 5, education: "Bachelor's in Design", location: "Dubai", availability: "Immediate" },
    { id: 102, name: "Mohammed Al Farsi", skills: ["UI Design", "Adobe XD", "Prototyping"], experience: 3, education: "Master's in HCI", location: "Dubai", availability: "2 weeks" },
    { id: 103, name: "Priya Sharma", skills: ["UX Research", "Wireframing", "User Testing"], experience: 4, education: "Bachelor's in Psychology", location: "Abu Dhabi", availability: "1 month" },
    { id: 104, name: "Alex Wong", skills: ["Product Design", "Figma", "HTML/CSS"], experience: 6, education: "Master's in Design", location: "Dubai", availability: "Immediate" },
    { id: 105, name: "Fatima Hassan", skills: ["Visual Design", "Illustration", "Branding"], experience: 2, education: "Bachelor's in Fine Arts", location: "Sharjah", availability: "2 weeks" },
    { id: 106, name: "Daniel Kim", skills: ["Interaction Design", "Prototyping", "User Flows"], experience: 7, education: "PhD in Design", location: "Dubai", availability: "Negotiable" },
    { id: 107, name: "Layla Ahmed", skills: ["UI Design", "Design Systems", "Accessibility"], experience: 4, education: "Bachelor's in Computer Science", location: "Abu Dhabi", availability: "Immediate" },
    { id: 108, name: "Raj Patel", skills: ["UX Design", "Research", "Information Architecture"], experience: 5, education: "Master's in Information Science", location: "Dubai", availability: "1 month" },
    { id: 109, name: "Emma Wilson", skills: ["Visual Design", "Branding", "Typography"], experience: 3, education: "Bachelor's in Graphic Design", location: "Sharjah", availability: "2 weeks" },
    { id: 110, name: "Omar Mahmoud", skills: ["UI Development", "Figma", "React"], experience: 4, education: "Bachelor's in Computer Science", location: "Dubai", availability: "Immediate" },
    { id: 111, name: "Jennifer Lee", skills: ["Content Strategy", "UX Writing", "Information Architecture"], experience: 6, education: "Master's in English", location: "Dubai", availability: "1 month" },
    { id: 112, name: "Ahmed Al Mansoori", skills: ["UI Design", "Motion Graphics", "Design Systems"], experience: 5, education: "Bachelor's in Digital Media", location: "Abu Dhabi", availability: "Immediate" },
    { id: 113, name: "Sophia Rodriguez", skills: ["User Research", "Usability Testing", "Prototyping"], experience: 4, education: "Master's in Human Factors", location: "Dubai", availability: "2 weeks" },
    { id: 114, name: "Michael Chen", skills: ["Product Design", "Design Thinking", "Wireframing"], experience: 7, education: "MBA", location: "Sharjah", availability: "Negotiable" },
    { id: 115, name: "Aisha Khalid", skills: ["UX Design", "Design Strategy", "Workshop Facilitation"], experience: 8, education: "PhD in Design", location: "Dubai", availability: "1 month" },
  ];
  
  let filteredCandidates = allCandidates;
  if (query) {
    const searchLower = query.toLowerCase();
    filteredCandidates = filteredCandidates.filter(candidate => 
      candidate.name.toLowerCase().includes(searchLower) || 
      candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  }
  
  if (filters.location && filters.location !== "All") {
    filteredCandidates = filteredCandidates.filter(c => c.location === filters.location);
  }
  
  if (filters.experience && filters.experience !== "All") {
    const [min, max] = filters.experience.split('-').map(Number);
    filteredCandidates = filteredCandidates.filter(c => {
      if (max) {
        return c.experience >= min && c.experience <= max;
      } else {
        return c.experience >= min;
      }
    });
  }
  
  if (filters.availability && filters.availability !== "All") {
    filteredCandidates = filteredCandidates.filter(c => c.availability === filters.availability);
  }
  
  return filteredCandidates;
};

// Interns data
const interns = [
  { id: 1, name: "Ahmed Khan", university: "American University of Sharjah", major: "Computer Science", gpa: 3.8, year: "Senior", skills: ["Python", "Data Analysis", "Web Development"], status: "Unassigned" },
  { id: 2, name: "Sara Al Nasser", university: "UAE University", major: "Business Administration", gpa: 3.5, year: "Junior", skills: ["Marketing", "Social Media", "Content Creation"], status: "Assigned", company: "Digital Marketing Agency", position: "Marketing Intern" },
  { id: 3, name: "Mohammed Al Hashimi", university: "Zayed University", major: "Finance", gpa: 3.7, year: "Senior", skills: ["Financial Analysis", "Excel", "Investment Research"], status: "Assigned", company: "Abu Dhabi Investment Authority", position: "Finance Intern" },
  { id: 4, name: "Fatima Al Zaabi", university: "Khalifa University", major: "Electrical Engineering", gpa: 3.9, year: "Senior", skills: ["Circuit Design", "MATLAB", "Project Management"], status: "Unassigned" },
  { id: 5, name: "Reem Al Suwaidi", university: "New York University Abu Dhabi", major: "Psychology", gpa: 3.6, year: "Junior", skills: ["Research", "Data Collection", "Statistical Analysis"], status: "Unassigned" },
  { id: 6, name: "Ali Al Mansoori", university: "UAE University", major: "Marketing", gpa: 3.4, year: "Senior", skills: ["Digital Marketing", "Market Research", "Brand Strategy"], status: "Assigned", company: "Etisalat", position: "Marketing Intern" },
  { id: 7, name: "Noura Al Shamsi", university: "Zayed University", major: "Information Systems", gpa: 3.5, year: "Junior", skills: ["Database Management", "System Analysis", "SQL"], status: "Unassigned" },
  { id: 8, name: "Hassan Al Balushi", university: "Khalifa University", major: "Mechanical Engineering", gpa: 3.7, year: "Senior", skills: ["CAD", "Thermodynamics", "Fluid Mechanics"], status: "Unassigned" },
];

// Available companies for internship placement
const companies = [
  { id: 1, name: "Abu Dhabi National Oil Company (ADNOC)", industry: "Energy", location: "Abu Dhabi", openPositions: 3 },
  { id: 2, name: "Emirates Airlines", industry: "Aviation", location: "Dubai", openPositions: 2 },
  { id: 3, name: "Etisalat", industry: "Telecommunications", location: "Dubai", openPositions: 4 },
  { id: 4, name: "Dubai Holding", industry: "Investment", location: "Dubai", openPositions: 2 },
  { id: 5, name: "Mubadala Investment Company", industry: "Investment", location: "Abu Dhabi", openPositions: 3 },
  { id: 6, name: "DP World", industry: "Logistics", location: "Dubai", openPositions: 1 },
  { id: 7, name: "National Bank of Abu Dhabi", industry: "Banking", location: "Abu Dhabi", openPositions: 2 },
  { id: 8, name: "Emaar Properties", industry: "Real Estate", location: "Dubai", openPositions: 2 },
];

// Internship tracks data
const internshipTracks = [
  { id: 1, name: "Software Development", department: "IT", duration: "12 weeks", companies: ["Etisalat", "Emirates Airlines", "ADNOC"], skills: ["Programming", "Web Development", "App Development"] },
  { id: 2, name: "Finance & Accounting", department: "Finance", duration: "10 weeks", companies: ["National Bank of Abu Dhabi", "Mubadala", "ADNOC"], skills: ["Financial Analysis", "Accounting", "Excel"] },
  { id: 3, name: "Marketing & Communications", department: "Marketing", duration: "8 weeks", companies: ["Etisalat", "Emirates Airlines", "Emaar Properties"], skills: ["Digital Marketing", "Content Creation", "Market Research"] },
  { id: 4, name: "Engineering", department: "Engineering", duration: "16 weeks", companies: ["ADNOC", "DP World", "Emaar Properties"], skills: ["CAD", "Engineering Design", "Project Management"] },
];

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isNewVacancyDialogOpen, setIsNewVacancyDialogOpen] = useState(false);
  const [isViewVacancyDialogOpen, setIsViewVacancyDialogOpen] = useState(false);
  const [isAIMatchDialogOpen, setIsAIMatchDialogOpen] = useState(false);
  const [isAssignInternDialogOpen, setIsAssignInternDialogOpen] = useState(false);
  const [isNewInternDialogOpen, setIsNewInternDialogOpen] = useState(false);
  const [isViewCompanyDialogOpen, setIsViewCompanyDialogOpen] = useState(false);
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [internSearchQuery, setInternSearchQuery] = useState("");
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [internFilter, setInternFilter] = useState("All");
  const [candidateFilters, setCandidateFilters] = useState({
    location: "All",
    experience: "All",
    availability: "All",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [newVacancy, setNewVacancy] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    requirements: [""],
    status: "Draft",
    coordinates: { latitude: 25.2048, longitude: 55.2708 }
  });
  const [newIntern, setNewIntern] = useState({
    name: "",
    university: "",
    major: "",
    gpa: "",
    year: "Freshman",
    skills: [""],
    status: "Unassigned"
  });
  const [assignmentDetails, setAssignmentDetails] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    supervisor: "",
    notes: ""
  });

  const filteredVacancies = vacancies.filter(vacancy => 
    vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vacancy.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vacancy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const candidates = searchCandidates(searchQuery, candidateFilters);
  
  const handleNewRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...newVacancy.requirements];
    updatedRequirements[index] = value;
    setNewVacancy({ ...newVacancy, requirements: updatedRequirements });
  };

  const addRequirementField = () => {
    setNewVacancy({
      ...newVacancy,
      requirements: [...newVacancy.requirements, ""]
    });
  };

  const removeRequirementField = (index: number) => {
    const updatedRequirements = newVacancy.requirements.filter((_, i) => i !== index);
    setNewVacancy({ ...newVacancy, requirements: updatedRequirements });
  };

  const handleNewInternSkillChange = (index: number, value: string) => {
    const updatedSkills = [...newIntern.skills];
    updatedSkills[index] = value;
    setNewIntern({ ...newIntern, skills: updatedSkills });
  };

  const addInternSkillField = () => {
    setNewIntern({
      ...newIntern,
      skills: [...newIntern.skills, ""]
    });
  };

  const removeInternSkillField = (index: number) => {
    const updatedSkills = newIntern.skills.filter((_, i) => i !== index);
    setNewIntern({ ...newIntern, skills: updatedSkills });
  };

  const handleSubmitVacancy = () => {
    console.log("New vacancy:", newVacancy);
    setIsNewVacancyDialogOpen(false);
    setNewVacancy({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      requirements: [""],
      status: "Draft",
      coordinates: { latitude: 25.2048, longitude: 55.2708 }
    });
  };

  const handleViewVacancy = (vacancy: any) => {
    setSelectedVacancy(vacancy);
    setIsViewVacancyDialogOpen(true);
  };

  const handleShowAIMatches = (vacancy: any) => {
    setSelectedVacancy(vacancy);
    setIsAIMatchDialogOpen(true);
  };

  const handleSubmitIntern = () => {
    console.log("New intern:", newIntern);
    toast({
      title: "Success!",
      description: `${newIntern.name} has been added to the system.`,
    });
    setIsNewInternDialogOpen(false);
    setNewIntern({
      name: "",
      university: "",
      major: "",
      gpa: "",
      year: "Freshman",
      skills: [""],
      status: "Unassigned"
    });
  };

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setIsViewCompanyDialogOpen(true);
  };

  const handleAssignIntern = (intern: any) => {
    setSelectedIntern(intern);
    setAssignmentDetails({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      supervisor: "",
      notes: ""
    });
    setIsAssignInternDialogOpen(true);
  };

  const handleSubmitAssignment = () => {
    console.log("Assignment details:", { intern: selectedIntern, ...assignmentDetails });
    toast({
      title: "Intern Assigned!",
      description: `${selectedIntern.name} has been assigned to ${assignmentDetails.company}.`,
    });
    setIsAssignInternDialogOpen(false);
  };

  const handleLocationUpdate = (updatedJobs: any[]) => {
    if (updatedJobs.length > 0 && updatedJobs[0].id === "workplace") {
      const workplaceJob = updatedJobs[0];
      setNewVacancy({
        ...newVacancy,
        location: workplaceJob.location.address || "",
        coordinates: {
          latitude: workplaceJob.location.latitude,
          longitude: workplaceJob.location.longitude
        }
      });
    }
  };

  const closeDialog = (selector: string) => {
    const element = document.querySelector(selector);
    if (element && 'click' in element) {
      (element as HTMLElement).click();
    }
  };

  const createWorkplaceJob = (latitude: number, longitude: number, address: string = "") => {
    return [{
      id: "workplace",
      title: "Workplace Location",
      company: newVacancy.title || "New Position",
      location: {
        latitude,
        longitude,
        address: address || newVacancy.location || "Workplace Location"
      }
    }];
  };

  const selectedVacancyJobs = selectedVacancy ? [{
    id: selectedVacancy.id.toString(),
    title: selectedVacancy.title,
    company: selectedVacancy.department,
    location: {
      latitude: selectedVacancy.coordinates.latitude,
      longitude: selectedVacancy.coordinates.longitude,
      address: selectedVacancy.location
    }
  }] : [];

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.university.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.major.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.skills.some(skill => skill.toLowerCase().includes(internSearchQuery.toLowerCase()));
    
    const matchesFilter = internFilter === "All" || intern.status === internFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(companySearchQuery.toLowerCase())
  );
  
  const handleScheduleInterview = (interviewData: any) => {
    console.log("Scheduling interview:", interviewData);
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${interviewData.candidateName} for ${interviewData.position} scheduled on ${interviewData.date.toLocaleDateString()} at ${interviewData.time}.`,
    });
    setIsScheduleInterviewDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vacancies">Vacancy Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Search</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="interns">Intern Tracking</TabsTrigger>
          <TabsTrigger value="companies">Company Partners</TabsTrigger>
        </TabsList>
        
        {/* Vacancies Tab */}
        <TabsContent value="vacancies" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search vacancies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setIsNewVacancyDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Vacancy
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <Card key={vacancy.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-start">
                    <span>{vacancy.title}</span>
                    <Badge variant={
                      vacancy.status === "Open" ? "default" :
                      vacancy.status === "Draft" ? "secondary" : "destructive"
                    }>
                      {vacancy.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Briefcase className="mr-1 h-4 w-4" /> {vacancy.department}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="mr-1 h-4 w-4" /> {vacancy.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Clock className="mr-1 h-4 w-4" /> {vacancy.type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="mr-1 h-4 w-4" /> Posted: {vacancy.datePosted}
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewVacancy(vacancy)}>
                      <FileEdit className="mr-1 h-4 w-4" /> Details
                    </Button>
                    <Button size="sm" variant="outline" 
                      onClick={() => handleShowAIMatches(vacancy)}
                      disabled={vacancy.status !== "Open"}
                    >
                      <Users className="mr-1 h-4 w-4" /> AI Matches
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Candidates Tab */}
        <TabsContent value="candidates" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" /> 
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg bg-muted/30">
              <div>
                <Label htmlFor="location-filter">Location</Label>
                <Select 
                  value={candidateFilters.location} 
                  onValueChange={(value) => setCandidateFilters({...candidateFilters, location: value})}
                >
                  <SelectTrigger id="location-filter">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Locations</SelectItem>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experience-filter">Experience</Label>
                <Select 
                  value={candidateFilters.experience} 
                  onValueChange={(value) => setCandidateFilters({...candidateFilters, experience: value})}
                >
                  <SelectTrigger id="experience-filter">
                    <SelectValue placeholder="Select experience range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Experience Levels</SelectItem>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-8">6-8 years</SelectItem>
                    <SelectItem value="9">9+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="availability-filter">Availability</Label>
                <Select 
                  value={candidateFilters.availability} 
                  onValueChange={(value) => setCandidateFilters({...candidateFilters, availability: value})}
                >
                  <SelectTrigger id="availability-filter">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Availability</SelectItem>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="Negotiable">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold flex items-center">
                        <User className="mr-2 h-5 w-5" /> {candidate.name}
                      </h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" /> {candidate.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="mr-1 h-4 w-4" /> {candidate.experience} years
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" /> {candidate.availability}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">Education</p>
                        <p className="text-sm">{candidate.education}</p>
                      </div>
                    </div>
                    <div className="md:text-right">
                      <Button variant="outline" size="sm">
                        View Profile <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Interviews Tab (New) */}
        <TabsContent value="interviews" className="mt-6">
          <InterviewCalendar 
            onScheduleInterview={() => setIsScheduleInterviewDialogOpen(true)} 
          />
        </TabsContent>
        
        {/* Interns Tab */}
        <TabsContent value="interns" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search interns..."
                value={internSearchQuery}
                onChange={(e) => setInternSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={internFilter}
                onValueChange={setInternFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Interns</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => setIsNewInternDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Intern
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredInterns.map((intern) => (
              <Card key={intern.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-semibold flex items-center">
                        <User className="mr-2 h-5 w-5" /> {intern.name}
                        <Badge className="ml-2" variant={intern.status === "Assigned" ? "default" : "secondary"}>
                          {intern.status}
                        </Badge>
                      </h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-
