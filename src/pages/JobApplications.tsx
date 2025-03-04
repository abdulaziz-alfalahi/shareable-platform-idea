
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BriefcaseIcon, 
  BuildingIcon, 
  CalendarIcon,
  ChevronLeftIcon,
  MapPinIcon,
  PlusIcon,
  SendIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  ArrowUpCircleIcon,
  GlobeIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import JobMap from "@/components/JobMap";
import { notifySuccess } from "@/utils/notification";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes: string;
}

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  requiredSkills: string[];
  missingSkills: string[];
  salary: string;
  postedDate: string;
}

interface TrainingProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  skills: string[];
  rating: number;
}

// Sample job data with locations
const sampleJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Dubai Tech Solutions',
    location: {
      latitude: 25.2048,
      longitude: 55.2708,
      address: 'Downtown Dubai, UAE'
    }
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Abu Dhabi Marketing Group',
    location: {
      latitude: 24.4539,
      longitude: 54.3773,
      address: 'Al Reem Island, Abu Dhabi, UAE'
    }
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Emirati Finance',
    location: {
      latitude: 25.0657,
      longitude: 55.1713,
      address: 'Dubai Marina, UAE'
    }
  },
  {
    id: '4',
    title: 'HR Specialist',
    company: 'Global HR Solutions',
    location: {
      latitude: 25.1123,
      longitude: 55.1862,
      address: 'Jumeirah, Dubai, UAE'
    }
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction UAE',
    location: {
      latitude: 25.2744,
      longitude: 55.3032,
      address: 'Deira, Dubai, UAE'
    }
  }
];

const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "Dubai Future Foundation",
      position: "Senior Web Developer",
      date: "2023-05-15",
      status: "interview",
      notes: "Second interview scheduled"
    },
    {
      id: "2",
      company: "Etihad Airways",
      position: "UX Designer",
      date: "2023-05-10",
      status: "applied",
      notes: "Application submitted"
    }
  ]);
  
  const [showNewForm, setShowNewForm] = useState(false);
  const [newApplication, setNewApplication] = useState<Omit<JobApplication, "id">>({
    company: "",
    position: "",
    date: new Date().toISOString().split('T')[0],
    status: "applied",
    notes: ""
  });

  const [vacancies] = useState<Vacancy[]>([
    {
      id: "1",
      title: "Front-end Developer",
      company: "Etisalat Digital",
      location: "Dubai Internet City",
      matchPercentage: 95,
      requiredSkills: ["React", "TypeScript", "Tailwind CSS"],
      missingSkills: [],
      salary: "25,000 - 30,000 AED",
      postedDate: "2 days ago"
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Emirates NBD",
      location: "DIFC, Dubai",
      matchPercentage: 90,
      requiredSkills: ["React", "Node.js", "MongoDB"],
      missingSkills: [],
      salary: "27,000 - 32,000 AED",
      postedDate: "1 week ago"
    },
    {
      id: "3",
      title: "Senior UX Designer",
      company: "Dubai Media Inc",
      location: "Media City, Dubai",
      matchPercentage: 85,
      requiredSkills: ["Figma", "User Research", "Prototyping"],
      missingSkills: [],
      salary: "30,000 - 35,000 AED",
      postedDate: "3 days ago"
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "Abu Dhabi Digital Authority",
      location: "Abu Dhabi",
      matchPercentage: 80,
      requiredSkills: ["Kubernetes", "Docker", "CI/CD"],
      missingSkills: ["AWS", "Terraform"],
      salary: "28,000 - 33,000 AED",
      postedDate: "5 days ago"
    },
    {
      id: "5",
      title: "Data Scientist",
      company: "Majid Al Futtaim",
      location: "Dubai",
      matchPercentage: 75,
      requiredSkills: ["Python", "SQL", "Data Analysis"],
      missingSkills: ["TensorFlow", "Machine Learning"],
      salary: "26,000 - 31,000 AED",
      postedDate: "1 week ago"
    },
    {
      id: "6",
      title: "Project Manager",
      company: "Emaar Properties",
      location: "Downtown Dubai",
      matchPercentage: 85,
      requiredSkills: ["Agile", "Scrum", "Project Planning"],
      missingSkills: [],
      salary: "32,000 - 38,000 AED",
      postedDate: "2 weeks ago"
    },
    {
      id: "7",
      title: "Mobile App Developer",
      company: "DU Telecom",
      location: "Dubai",
      matchPercentage: 70,
      requiredSkills: ["React Native", "Redux", "API Integration"],
      missingSkills: ["Flutter", "Swift"],
      salary: "24,000 - 29,000 AED",
      postedDate: "3 days ago"
    },
    {
      id: "8",
      title: "Cybersecurity Analyst",
      company: "First Abu Dhabi Bank",
      location: "Abu Dhabi",
      matchPercentage: 65,
      requiredSkills: ["Network Security", "Threat Analysis"],
      missingSkills: ["CISSP Certification", "Penetration Testing"],
      salary: "29,000 - 34,000 AED",
      postedDate: "1 week ago"
    },
    {
      id: "9",
      title: "AI Specialist",
      company: "Smart Dubai",
      location: "Dubai",
      matchPercentage: 60,
      requiredSkills: ["Python", "Data Science"],
      missingSkills: ["NLP", "Machine Learning", "Deep Learning"],
      salary: "30,000 - 35,000 AED",
      postedDate: "5 days ago"
    },
    {
      id: "10",
      title: "Digital Marketing Manager",
      company: "Etihad Airways",
      location: "Abu Dhabi",
      matchPercentage: 55,
      requiredSkills: ["Social Media Marketing", "Content Strategy"],
      missingSkills: ["SEO", "SEM", "Analytics"],
      salary: "25,000 - 30,000 AED",
      postedDate: "2 weeks ago"
    }
  ]);
  
  const [trainingPrograms] = useState<TrainingProgram[]>([
    {
      id: "1",
      title: "AWS Cloud Certification",
      provider: "Emirates Institute of Technology",
      duration: "3 months",
      skills: ["AWS", "Cloud Architecture", "Terraform"],
      rating: 4.8
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      provider: "Abu Dhabi School of AI",
      duration: "2 months",
      skills: ["Machine Learning", "TensorFlow", "Deep Learning"],
      rating: 4.9
    },
    {
      id: "3",
      title: "Cybersecurity Professional",
      provider: "UAE Cyber Security Council",
      duration: "4 months",
      skills: ["CISSP Certification", "Penetration Testing", "Network Security"],
      rating: 4.7
    },
    {
      id: "4",
      title: "Mobile App Development",
      provider: "Dubai Future Academy",
      duration: "2 months",
      skills: ["Flutter", "Swift", "React Native"],
      rating: 4.6
    },
    {
      id: "5",
      title: "Digital Marketing Masterclass",
      provider: "Sharjah Media City",
      duration: "6 weeks",
      skills: ["SEO", "SEM", "Analytics", "Social Media Strategy"],
      rating: 4.5
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewApplication({
      ...newApplication,
      [name]: value
    });
  };

  const handleAddApplication = () => {
    const application: JobApplication = {
      ...newApplication,
      id: Date.now().toString()
    };
    
    setApplications([application, ...applications]);
    setNewApplication({
      company: "",
      position: "",
      date: new Date().toISOString().split('T')[0],
      status: "applied",
      notes: ""
    });
    setShowNewForm(false);
    
    notifySuccess({
      title: "Application Added",
      description: "Your job application has been tracked successfully."
    });
  };

  const handleApplyToJob = (jobTitle: string, company: string) => {
    const application: JobApplication = {
      company,
      position: jobTitle,
      date: new Date().toISOString().split('T')[0],
      status: "applied",
      notes: "Applied through match recommendation",
      id: Date.now().toString()
    };
    
    setApplications([application, ...applications]);
    
    notifySuccess({
      title: "Application Submitted",
      description: `You've applied to ${jobTitle} at ${company}.`
    });
  };

  const getStatusColor = (status: JobApplication["status"]) => {
    switch(status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "offer": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ChevronLeftIcon size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">Job Applications Tracker</h1>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="mb-6 bg-emirati-sandBeige/20">
          <TabsTrigger value="applications" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <BriefcaseIcon size={16} className="mr-2" /> My Applications
          </TabsTrigger>
          <TabsTrigger value="matching" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <CheckCircleIcon size={16} className="mr-2" /> Matching Vacancies
          </TabsTrigger>
          <TabsTrigger value="upskilling" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <ArrowUpCircleIcon size={16} className="mr-2" /> Upskilling Opportunities
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white">
            <MapPinIcon size={16} className="mr-2" /> Job Locations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <div className="mb-6">
            <Button 
              className="bg-emirati-oasisGreen hover:bg-emirati-desertGold" 
              onClick={() => setShowNewForm(!showNewForm)}
            >
              {showNewForm ? "Cancel" : <><PlusIcon size={16} className="mr-1" /> Add Application</>}
            </Button>
          </div>

          {showNewForm && (
            <Card className="mb-6 border-emirati-desertGold">
              <CardHeader>
                <CardTitle className="text-2xl text-emirati-oasisGreen">Add New Application</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={newApplication.company}
                      onChange={handleInputChange}
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={newApplication.position}
                      onChange={handleInputChange}
                      placeholder="Job title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Application Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newApplication.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={newApplication.status}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={newApplication.notes}
                      onChange={handleInputChange}
                      placeholder="Add any notes about this application"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
                  onClick={handleAddApplication}
                  disabled={!newApplication.company || !newApplication.position}
                >
                  <SendIcon size={16} className="mr-2" /> Submit Application
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="border-emirati-camelBrown hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-emirati-oasisGreen">{app.position}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <BuildingIcon size={16} className="mr-1 text-emirati-camelBrown" /> 
                        {app.company}
                      </CardDescription>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-3 flex items-center">
                    <CalendarIcon size={14} className="mr-1" /> 
                    Applied: {new Date(app.date).toLocaleDateString()}
                  </div>
                  <p className="text-sm">{app.notes}</p>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-emirati-desertGold text-emirati-camelBrown"
                  >
                    <BriefcaseIcon size={14} className="mr-1" /> Update Status
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matching" className="space-y-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Based on your skills and experience, here are the top 10 job vacancies that match your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vacancies.map((vacancy) => (
              <Card key={vacancy.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-emirati-oasisGreen flex items-center">
                        {vacancy.title}
                        <span className={`ml-3 text-sm font-medium ${getMatchColor(vacancy.matchPercentage)}`}>
                          {vacancy.matchPercentage}% Match
                        </span>
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <BuildingIcon size={16} className="mr-1" /> 
                        {vacancy.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
                      {vacancy.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon size={14} className="mr-1 text-emirati-camelBrown" /> 
                      Posted: {vacancy.postedDate}
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      {vacancy.salary}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Required Skills:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {vacancy.requiredSkills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {vacancy.missingSkills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Skills to Develop:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {vacancy.missingSkills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button 
                    className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
                    onClick={() => handleApplyToJob(vacancy.title, vacancy.company)}
                  >
                    <SendIcon size={14} className="mr-1" /> Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upskilling" className="space-y-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Enhance your employability with these training programs designed to help you develop in-demand skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-emirati-oasisGreen">{program.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <BuildingIcon size={16} className="mr-1" /> 
                    {program.provider}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon size={14} className="mr-1" /> 
                      Duration: {program.duration}
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      Rating: {program.rating}/5
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Skills You'll Gain:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {program.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen hover:text-white"
                  >
                    <GraduationCapIcon size={14} className="mr-1" /> Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="location">
          <div className="mb-6">
            <p className="text-gray-600">
              Discover job opportunities near you! Enable location services to see jobs within your preferred radius.
            </p>
          </div>

          <Card className="border-emirati-sandBeige mb-6">
            <CardContent className="p-6">
              <JobMap jobs={sampleJobs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobApplications;
