
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  User,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  X,
  Plus,
  Eye,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock data for candidates
const initialCandidates = [
  {
    id: 1,
    name: "Fatima Al-Sayegh",
    university: "UAE University",
    degree: "Computer Science",
    gpa: 3.8,
    skills: ["React", "TypeScript", "UI/UX", "User Research"],
    experience: [
      { title: "UI Developer Intern", company: "Dubai Digital", duration: "3 months" }
    ],
    matchScore: 92,
  },
  {
    id: 2,
    name: "Mohammed Al-Mansoori",
    university: "Khalifa University",
    degree: "Artificial Intelligence",
    gpa: 3.9,
    skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning"],
    experience: [
      { title: "Data Science Intern", company: "Abu Dhabi Smart Solutions", duration: "6 months" }
    ],
    matchScore: 88,
  },
  {
    id: 3,
    name: "Sara Al-Nuaimi",
    university: "American University of Sharjah",
    degree: "Business Analytics",
    gpa: 3.7,
    skills: ["SQL", "Tableau", "Power BI", "Statistical Analysis"],
    experience: [
      { title: "Business Analyst", company: "Emirates Group", duration: "1 year" }
    ],
    matchScore: 85,
  },
  {
    id: 4,
    name: "Ahmed Al-Khouri",
    university: "New York University Abu Dhabi",
    degree: "Computer Engineering",
    gpa: 3.6,
    skills: ["Java", "Spring Boot", "Microservices", "Docker"],
    experience: [
      { title: "Software Engineer Intern", company: "Etisalat Digital", duration: "4 months" }
    ],
    matchScore: 81,
  },
  {
    id: 5,
    name: "Maryam Al-Hashmi",
    university: "Zayed University",
    degree: "Information Systems",
    gpa: 3.5,
    skills: ["Project Management", "Agile", "JIRA", "Confluence"],
    experience: [
      { title: "IT Project Coordinator", company: "Dubai Health Authority", duration: "8 months" }
    ],
    matchScore: 79,
  },
  {
    id: 6,
    name: "Omar Al-Zaabi",
    university: "UAE University",
    degree: "Data Science",
    gpa: 3.7,
    skills: ["R", "Python", "Statistical Modeling", "Big Data"],
    experience: [
      { title: "Data Analyst Intern", company: "ADNOC", duration: "5 months" }
    ],
    matchScore: 77,
  },
  {
    id: 7,
    name: "Noura Al-Dhaheri",
    university: "Khalifa University",
    degree: "Cybersecurity",
    gpa: 3.8,
    skills: ["Network Security", "Ethical Hacking", "Security Auditing", "SIEM"],
    experience: [
      { title: "Security Analyst Intern", company: "Dubai Electronic Security Center", duration: "6 months" }
    ],
    matchScore: 75,
  },
  {
    id: 8,
    name: "Khalid Al-Marzouqi",
    university: "American University of Dubai",
    degree: "Marketing",
    gpa: 3.6,
    skills: ["Digital Marketing", "Social Media", "SEO", "Content Strategy"],
    experience: [
      { title: "Marketing Intern", company: "Emaar Properties", duration: "4 months" }
    ],
    matchScore: 71,
  },
  {
    id: 9,
    name: "Aisha Al-Ali",
    university: "Zayed University",
    degree: "Human Resource Management",
    gpa: 3.5,
    skills: ["Recruitment", "Employee Relations", "Compensation", "Talent Management"],
    experience: [
      { title: "HR Coordinator", company: "Dubai Airports", duration: "1 year" }
    ],
    matchScore: 68,
  },
  {
    id: 10,
    name: "Saeed Al-Shamsi",
    university: "Higher Colleges of Technology",
    degree: "Software Engineering",
    gpa: 3.4,
    skills: ["C#", ".NET", "SQL Server", "Azure"],
    experience: [
      { title: "Junior Developer", company: "Smart Dubai", duration: "9 months" }
    ],
    matchScore: 67,
  },
];

// Mock data for job vacancies
const vacancies = [
  {
    id: 1,
    title: "UI/UX Designer",
    department: "Digital Products",
    location: "Dubai",
    type: "Full-time",
    requirements: ["UI/UX design experience", "Figma proficiency", "User research"],
    status: "Open",
    datePosted: "2023-10-15",
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Analytics",
    location: "Abu Dhabi",
    type: "Full-time",
    requirements: ["Python", "Machine Learning", "Statistical Analysis"],
    status: "Open",
    datePosted: "2023-10-10",
  },
  {
    id: 3,
    title: "Software Engineer",
    department: "IT",
    location: "Sharjah",
    type: "Full-time",
    requirements: ["Java", "Spring Boot", "Microservices"],
    status: "Draft",
    datePosted: "2023-10-18",
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Operations",
    location: "Dubai",
    type: "Contract",
    requirements: ["Project Management", "Agile methodologies", "Stakeholder management"],
    status: "Closed",
    datePosted: "2023-09-05",
  }
];

// Component for the vacancy form
const VacancyForm = ({ onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    type: initialData?.type || "Full-time",
    requirements: initialData?.requirements ? initialData.requirements.join(", ") : "",
    status: initialData?.status || "Draft"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert requirements back to array
    const requirementsArray = formData.requirements
      .split(",")
      .map(req => req.trim())
      .filter(req => req.length > 0);
    
    onSave({
      ...formData,
      requirements: requirementsArray,
      id: initialData?.id || Date.now(),
      datePosted: initialData?.datePosted || new Date().toISOString().split("T")[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="department">Department</Label>
        <Input 
          id="department" 
          name="department" 
          value={formData.department} 
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
          required 
        />
      </div>
      <div>
        <Label htmlFor="type">Employment Type</Label>
        <select 
          id="type" 
          name="type" 
          value={formData.type} 
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div>
        <Label htmlFor="requirements">Requirements (comma-separated)</Label>
        <Input 
          id="requirements" 
          name="requirements" 
          value={formData.requirements} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select 
          id="status" 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        >
          <option value="Draft">Draft</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save Vacancy</Button>
      </div>
    </form>
  );
};

// Component for displaying candidate details
const CandidateProfile = ({ candidate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
          <User size={30} className="text-slate-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground">{candidate.university}, {candidate.degree}</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="bg-slate-100 px-2 py-1 rounded-md text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Experience</h4>
        {candidate.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm font-medium">{exp.title}</p>
            <p className="text-xs text-muted-foreground">{exp.company}, {exp.duration}</p>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Education</h4>
        <p className="text-sm">{candidate.degree}</p>
        <p className="text-xs text-muted-foreground">{candidate.university}, GPA: {candidate.gpa}</p>
      </div>
      
      <div className="pt-2 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Match Score</span>
          <span className={`text-sm font-semibold ${
            candidate.matchScore >= 85 ? "text-green-600" : 
            candidate.matchScore >= 70 ? "text-amber-600" : 
            "text-red-600"
          }`}>
            {candidate.matchScore}%
          </span>
        </div>
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(initialCandidates);
  const [jobVacancies, setJobVacancies] = useState(vacancies);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeVacancy, setActiveVacancy] = useState(null);
  const [isAddingVacancy, setIsAddingVacancy] = useState(false);
  const [isEditingVacancy, setIsEditingVacancy] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "matchScore", direction: "desc" });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // All unique skills from candidates
  const allSkills = [...new Set(candidates.flatMap(candidate => candidate.skills))];

  // Sort candidates
  useEffect(() => {
    let sortedCandidates = [...filteredCandidates];
    
    if (sortConfig.key) {
      sortedCandidates.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredCandidates(sortedCandidates);
  }, [sortConfig]);

  // Filter candidates based on search and selected skills
  useEffect(() => {
    let results = candidates;
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(candidate => 
        candidate.name.toLowerCase().includes(lowercasedSearch) ||
        candidate.university.toLowerCase().includes(lowercasedSearch) ||
        candidate.degree.toLowerCase().includes(lowercasedSearch) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    // Filter by selected skills
    if (selectedSkills.length > 0) {
      results = results.filter(candidate => 
        selectedSkills.every(skill => candidate.skills.includes(skill))
      );
    }
    
    setFilteredCandidates(results);
  }, [searchTerm, selectedSkills, candidates]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const toggleSkillFilter = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    setFilteredCandidates(candidates);
  };

  const handleSaveVacancy = (vacancyData) => {
    if (isEditingVacancy) {
      setJobVacancies(prev => prev.map(v => v.id === vacancyData.id ? vacancyData : v));
      setIsEditingVacancy(false);
      toast({
        title: "Vacancy Updated",
        description: `${vacancyData.title} has been updated successfully.`
      });
    } else {
      setJobVacancies(prev => [...prev, vacancyData]);
      setIsAddingVacancy(false);
      toast({
        title: "Vacancy Added",
        description: `${vacancyData.title} has been added successfully.`
      });
    }
  };

  const handleViewTopCandidates = (vacancy) => {
    setActiveVacancy(vacancy);
    
    // Simulate AI matching by recalculating match scores based on vacancy requirements
    const matchedCandidates = candidates.map(candidate => {
      // Calculate match score based on how many requirements the candidate meets
      const matchingSkills = candidate.skills.filter(skill => 
        vacancy.requirements.some(req => skill.toLowerCase().includes(req.toLowerCase()))
      );
      
      const matchScore = Math.min(100, Math.round(
        (matchingSkills.length / vacancy.requirements.length) * 100 + Math.random() * 10
      ));
      
      return {
        ...candidate,
        matchScore
      };
    });
    
    // Sort by match score
    const sortedCandidates = matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    
    // Update candidates with new match scores
    setCandidates(sortedCandidates);
    setFilteredCandidates(sortedCandidates);
    
    toast({
      title: "AI Matching Complete",
      description: `Found ${sortedCandidates.length} potential candidates for ${vacancy.title}`
    });
  };

  const handleEditVacancy = (vacancy) => {
    setActiveVacancy(vacancy);
    setIsEditingVacancy(true);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">Manage vacancies and find the perfect candidates</p>
        </div>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>

      <Tabs defaultValue="vacancies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vacancies">Job Vacancies</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Pool</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vacancies" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Current Vacancies</CardTitle>
              <Button onClick={() => {
                setActiveVacancy(null);
                setIsAddingVacancy(true);
              }}>
                <Plus size={16} className="mr-1" /> Add New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b bg-slate-50 px-4 py-3 text-sm font-medium">
                  <div>Job Title</div>
                  <div>Department</div>
                  <div>Location</div>
                  <div>Type</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                
                {jobVacancies.map(vacancy => (
                  <div key={vacancy.id} className="grid grid-cols-6 border-b px-4 py-3 text-sm">
                    <div className="font-medium">{vacancy.title}</div>
                    <div>{vacancy.department}</div>
                    <div>{vacancy.location}</div>
                    <div>{vacancy.type}</div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        vacancy.status === "Open" ? "bg-green-100 text-green-800" :
                        vacancy.status === "Closed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {vacancy.status}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditVacancy(vacancy)}
                      >
                        Edit
                      </Button>
                      {vacancy.status === "Open" && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleViewTopCandidates(vacancy)}
                        >
                          View Top Candidates
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {jobVacancies.length === 0 && (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    No vacancies found. Create your first job vacancy.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {activeVacancy && (
            <Card>
              <CardHeader>
                <CardTitle>Top Candidates for {activeVacancy.title}</CardTitle>
                <CardDescription>
                  AI-matched candidates based on the job requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and filter */}
                  <div className="flex gap-2 pb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search candidates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Filter size={16} className="mr-2" /> Filter
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Filter Candidates</DialogTitle>
                          <DialogDescription>
                            Select skills to filter the candidate list
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-2 py-4">
                          {allSkills.map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Button
                                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleSkillFilter(skill)}
                                className="w-full justify-start"
                              >
                                {selectedSkills.includes(skill) ? (
                                  <CheckCircle size={16} className="mr-2" />
                                ) : (
                                  <div className="w-4 mr-2" />
                                )}
                                {skill}
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={resetFilters}>
                            Reset Filters
                          </Button>
                          <Button onClick={() => document.querySelector('[role="dialog"] button[aria-label="Close"]').click()}>
                            Apply Filters
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Filter pills */}
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSkills.map(skill => (
                        <span 
                          key={skill} 
                          className="bg-primary/10 text-primary text-xs rounded-full px-2.5 py-1 flex items-center"
                        >
                          {skill}
                          <button 
                            onClick={() => toggleSkillFilter(skill)}
                            className="ml-1.5 rounded-full bg-primary/20 p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      <button 
                        onClick={resetFilters}
                        className="text-xs text-muted-foreground underline"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                  
                  {/* Candidates table */}
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 border-b bg-slate-50 px-4 py-3 text-sm font-medium">
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                        Name
                        {sortConfig.key === "name" && (
                          sortConfig.direction === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                      <div>University</div>
                      <div>Degree</div>
                      <div>Skills</div>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("matchScore")}>
                        Match Score
                        {sortConfig.key === "matchScore" && (
                          sortConfig.direction === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                        )}
                      </div>
                      <div className="text-right">Action</div>
                    </div>
                    
                    {filteredCandidates.slice(0, 10).map(candidate => (
                      <div key={candidate.id} className="grid grid-cols-6 border-b px-4 py-3 text-sm">
                        <div className="font-medium">{candidate.name}</div>
                        <div>{candidate.university}</div>
                        <div>{candidate.degree}</div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill, i) => (
                            <span key={i} className="bg-slate-100 px-1.5 py-0.5 rounded-sm text-xs">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{candidate.skills.length - 2}</span>
                          )}
                        </div>
                        <div>
                          <span className={`font-medium ${
                            candidate.matchScore >= 85 ? "text-green-600" : 
                            candidate.matchScore >= 70 ? "text-amber-600" : 
                            "text-red-600"
                          }`}>
                            {candidate.matchScore}%
                          </span>
                        </div>
                        <div className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedCandidate(candidate)}
                              >
                                <Eye size={14} className="mr-1" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Candidate Profile</DialogTitle>
                              </DialogHeader>
                              {selectedCandidate && <CandidateProfile candidate={selectedCandidate} />}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                    
                    {filteredCandidates.length === 0 && (
                      <div className="px-4 py-8 text-sm text-muted-foreground text-center">
                        No candidates found matching your criteria.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Candidates</CardTitle>
              <CardDescription>View and search the entire candidate pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and filter */}
                <div className="flex gap-2 pb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Filter size={16} className="mr-2" /> Filter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filter Candidates</DialogTitle>
                        <DialogDescription>
                          Select skills to filter the candidate list
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-2 py-4">
                        {allSkills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Button
                              variant={selectedSkills.includes(skill) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleSkillFilter(skill)}
                              className="w-full justify-start"
                            >
                              {selectedSkills.includes(skill) ? (
                                <CheckCircle size={16} className="mr-2" />
                              ) : (
                                <div className="w-4 mr-2" />
                              )}
                              {skill}
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={resetFilters}>
                          Reset Filters
                        </Button>
                        <Button onClick={() => document.querySelector('[role="dialog"] button[aria-label="Close"]').click()}>
                          Apply Filters
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Filter pills */}
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSkills.map(skill => (
                      <span 
                        key={skill} 
                        className="bg-primary/10 text-primary text-xs rounded-full px-2.5 py-1 flex items-center"
                      >
                        {skill}
                        <button 
                          onClick={() => toggleSkillFilter(skill)}
                          className="ml-1.5 rounded-full bg-primary/20 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <button 
                      onClick={resetFilters}
                      className="text-xs text-muted-foreground underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
                
                {/* Candidates grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCandidates.map(candidate => (
                    <Card key={candidate.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center mb-4">
                          <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center mb-2">
                            <User size={30} className="text-slate-500" />
                          </div>
                          <h3 className="font-semibold">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.degree}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-1">University</p>
                            <p className="text-sm">{candidate.university}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.map((skill, index) => (
                                <span key={index} className="bg-slate-100 px-2 py-0.5 rounded-md text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Experience</p>
                            {candidate.experience.map((exp, index) => (
                              <p key={index} className="text-sm">{exp.title} at {exp.company}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedCandidate(candidate)}
                              >
                                <FileText size={14} className="mr-1" /> View Full Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Candidate Profile</DialogTitle>
                              </DialogHeader>
                              {selectedCandidate && <CandidateProfile candidate={selectedCandidate} />}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredCandidates.length === 0 && (
                    <div className="col-span-full px-4 py-8 text-sm text-muted-foreground text-center">
                      No candidates found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add/Edit Vacancy Dialog */}
      <Dialog open={isAddingVacancy || isEditingVacancy} onOpenChange={open => {
        if (!open) {
          setIsAddingVacancy(false);
          setIsEditingVacancy(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditingVacancy ? "Edit Vacancy" : "Add New Vacancy"}</DialogTitle>
            <DialogDescription>
              {isEditingVacancy 
                ? "Update the details for this job vacancy" 
                : "Fill in the details to create a new job vacancy"
              }
            </DialogDescription>
          </DialogHeader>
          <VacancyForm 
            onSave={handleSaveVacancy} 
            initialData={isEditingVacancy ? activeVacancy : null} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruiterDashboard;
