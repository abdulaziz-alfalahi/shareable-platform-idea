
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { 
  ArrowLeft, 
  ChevronRight, 
  BarChart2, 
  TrendingUp, 
  Briefcase, 
  CheckCircle,
  Award,
  RefreshCw,
  GraduationCap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Quiz questions and answers
const quizQuestions = [
  {
    id: 1,
    question: "Which type of work environment do you prefer?",
    options: [
      { id: "a", text: "Fast-paced startup with flexible roles" },
      { id: "b", text: "Established corporation with clear structure" },
      { id: "c", text: "Remote work with autonomous scheduling" },
      { id: "d", text: "Creative agency with collaborative projects" }
    ]
  },
  {
    id: 2,
    question: "What type of problem-solving approach appeals to you most?",
    options: [
      { id: "a", text: "Analytical and data-driven solutions" },
      { id: "b", text: "Creative and innovative thinking" },
      { id: "c", text: "Systematic and process-oriented methods" },
      { id: "d", text: "People-centered and communication-based approaches" }
    ]
  },
  {
    id: 3,
    question: "Which skill would you most like to develop further?",
    options: [
      { id: "a", text: "Technical programming or data analysis" },
      { id: "b", text: "Leadership and team management" },
      { id: "c", text: "Creative design and content creation" },
      { id: "d", text: "Strategic planning and project management" }
    ]
  },
  {
    id: 4,
    question: "What aspect of a job brings you the most satisfaction?",
    options: [
      { id: "a", text: "Solving complex technical challenges" },
      { id: "b", text: "Helping others and making a positive impact" },
      { id: "c", text: "Creating innovative products or services" },
      { id: "d", text: "Achieving goals and seeing measurable results" }
    ]
  },
  {
    id: 5,
    question: "How do you prefer to learn new skills?",
    options: [
      { id: "a", text: "Self-directed online courses and tutorials" },
      { id: "b", text: "Structured classroom or workshop environment" },
      { id: "c", text: "Hands-on experience and practical application" },
      { id: "d", text: "Mentorship and guidance from experts" }
    ]
  }
];

// Career pathways data
const careerPathways = [
  {
    id: "tech",
    name: "Technology & Development",
    description: "Careers focused on software development, data science, AI, and cybersecurity",
    jobTitles: ["Software Engineer", "Data Scientist", "Cybersecurity Specialist", "DevOps Engineer"],
    skills: ["Programming", "Data Analysis", "System Architecture", "Cloud Computing"],
    marketDemand: 85,
    salaryRange: "$80,000 - $150,000",
    growthRate: "+25%",
    timeline: [
      { year: "Year 1", role: "Junior Developer", skills: "Core Programming" },
      { year: "Year 3", role: "Mid-level Developer", skills: "Specialized Frameworks" },
      { year: "Year 5", role: "Senior Developer", skills: "Architecture & Leadership" },
      { year: "Year 7+", role: "Tech Lead/Architect", skills: "Strategic Planning" }
    ],
    marketData: [
      { year: '2020', jobs: 8500 },
      { year: '2021', jobs: 10200 },
      { year: '2022', jobs: 12000 },
      { year: '2023', jobs: 14500 },
      { year: '2024', jobs: 17000 },
      { year: '2025', jobs: 19500, projected: true },
      { year: '2026', jobs: 21200, projected: true },
      { year: '2027', jobs: 23000, projected: true },
    ]
  },
  {
    id: "business",
    name: "Business & Management",
    description: "Careers in business administration, marketing, finance, and project management",
    jobTitles: ["Business Analyst", "Project Manager", "Marketing Specialist", "Financial Advisor"],
    skills: ["Strategic Planning", "Data Analysis", "Leadership", "Communication"],
    marketDemand: 80,
    salaryRange: "$65,000 - $130,000",
    growthRate: "+18%",
    timeline: [
      { year: "Year 1", role: "Business Associate", skills: "Communication & Analysis" },
      { year: "Year 3", role: "Team Lead", skills: "Leadership & Project Management" },
      { year: "Year 5", role: "Department Manager", skills: "Strategic Planning" },
      { year: "Year 7+", role: "Director/Executive", skills: "Corporate Leadership" }
    ],
    marketData: [
      { year: '2020', jobs: 12300 },
      { year: '2021', jobs: 13500 },
      { year: '2022', jobs: 15200 },
      { year: '2023', jobs: 16800 },
      { year: '2024', jobs: 18500 },
      { year: '2025', jobs: 20000, projected: true },
      { year: '2026', jobs: 21200, projected: true },
      { year: '2027', jobs: 22500, projected: true },
    ]
  },
  {
    id: "creative",
    name: "Creative & Design",
    description: "Careers in graphic design, UX/UI, content creation, and digital media",
    jobTitles: ["UX/UI Designer", "Graphic Designer", "Content Creator", "Digital Marketing Specialist"],
    skills: ["Design Thinking", "Visual Communication", "User Research", "Creative Software"],
    marketDemand: 75,
    salaryRange: "$60,000 - $120,000",
    growthRate: "+20%",
    timeline: [
      { year: "Year 1", role: "Junior Designer", skills: "Core Design Principles" },
      { year: "Year 3", role: "Designer", skills: "Specialized Design Skills" },
      { year: "Year 5", role: "Senior Designer", skills: "Design Leadership" },
      { year: "Year 7+", role: "Creative Director", skills: "Strategic Direction" }
    ],
    marketData: [
      { year: '2020', jobs: 7800 },
      { year: '2021', jobs: 8900 },
      { year: '2022', jobs: 10300 },
      { year: '2023', jobs: 11800 },
      { year: '2024', jobs: 13500 },
      { year: '2025', jobs: 15200, projected: true },
      { year: '2026', jobs: 16800, projected: true },
      { year: '2027', jobs: 18500, projected: true },
    ]
  },
  {
    id: "education",
    name: "Education & Training",
    description: "Careers in teaching, instructional design, educational technology, and corporate training",
    jobTitles: ["Teacher", "Instructional Designer", "EdTech Specialist", "Corporate Trainer"],
    skills: ["Communication", "Curriculum Development", "Assessment", "Educational Technology"],
    marketDemand: 70,
    salaryRange: "$55,000 - $110,000",
    growthRate: "+15%",
    timeline: [
      { year: "Year 1", role: "Teaching Assistant", skills: "Basic Pedagogy" },
      { year: "Year 3", role: "Teacher/Trainer", skills: "Specialized Teaching" },
      { year: "Year 5", role: "Lead Educator", skills: "Curriculum Development" },
      { year: "Year 7+", role: "Education Director", skills: "Program Management" }
    ],
    marketData: [
      { year: '2020', jobs: 9200 },
      { year: '2021', jobs: 9800 },
      { year: '2022', jobs: 10500 },
      { year: '2023', jobs: 11300 },
      { year: '2024', jobs: 12000 },
      { year: '2025', jobs: 12800, projected: true },
      { year: '2026', jobs: 13500, projected: true },
      { year: '2027', jobs: 14200, projected: true },
    ]
  }
];

// Market trends data
const marketTrends = [
  { 
    skill: "AI & Machine Learning", 
    demand2023: 75, 
    demand2024: 90, 
    projected2025: 95, 
    industries: ["Technology", "Healthcare", "Finance", "Manufacturing"] 
  },
  { 
    skill: "Data Analysis", 
    demand2023: 80, 
    demand2024: 85, 
    projected2025: 90, 
    industries: ["Business", "Healthcare", "Marketing", "Government"] 
  },
  { 
    skill: "UX/UI Design", 
    demand2023: 70, 
    demand2024: 80, 
    projected2025: 85, 
    industries: ["Technology", "E-commerce", "Media", "Education"] 
  },
  { 
    skill: "Cloud Computing", 
    demand2023: 85, 
    demand2024: 90, 
    projected2025: 92, 
    industries: ["Technology", "Finance", "Healthcare", "Retail"] 
  },
  { 
    skill: "Digital Marketing", 
    demand2023: 75, 
    demand2024: 80, 
    projected2025: 83, 
    industries: ["Marketing", "Retail", "Media", "Entertainment"] 
  },
  { 
    skill: "Project Management", 
    demand2023: 78, 
    demand2024: 82, 
    projected2025: 85, 
    industries: ["Construction", "Technology", "Healthcare", "Manufacturing"] 
  }
];

// Future skill requirements
const futureRequirements = [
  {
    category: "Technical Skills",
    skills: [
      { name: "AI & Machine Learning", importance: 90 },
      { name: "Data Science & Analytics", importance: 85 },
      { name: "Cloud Computing", importance: 80 },
      { name: "Cybersecurity", importance: 85 },
      { name: "Blockchain", importance: 70 }
    ]
  },
  {
    category: "Business Skills",
    skills: [
      { name: "Digital Marketing", importance: 80 },
      { name: "Business Analytics", importance: 85 },
      { name: "Project Management", importance: 75 },
      { name: "Financial Literacy", importance: 70 },
      { name: "E-commerce", importance: 75 }
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Critical Thinking", importance: 90 },
      { name: "Adaptability", importance: 85 },
      { name: "Communication", importance: 90 },
      { name: "Creativity", importance: 80 },
      { name: "Emotional Intelligence", importance: 85 }
    ]
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("quiz");
  const [selectedCareerPath, setSelectedCareerPath] = useState("tech");
  const [quizResults, setQuizResults] = useState<{
    topPathways: string[];
    recommendedSkills: string[];
    strengthAreas: string[];
    developmentAreas: string[];
  } | null>(null);

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      processQuizResults();
    }
  };

  // Process quiz results
  const processQuizResults = () => {
    // This is a simplified algorithm to determine career path matches based on answers
    const pathwayScores: Record<string, number> = {
      tech: 0,
      business: 0,
      creative: 0,
      education: 0
    };

    // Count answers that align with different pathways (simplified mapping)
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const qId = parseInt(questionId);
      
      // Simple mapping of answers to career paths
      if (qId === 1) {
        if (answerId === "a") pathwayScores.tech += 2;
        if (answerId === "b") pathwayScores.business += 2;
        if (answerId === "c") pathwayScores.tech += 1;
        if (answerId === "d") pathwayScores.creative += 2;
      }
      else if (qId === 2) {
        if (answerId === "a") pathwayScores.tech += 2;
        if (answerId === "b") pathwayScores.creative += 2;
        if (answerId === "c") pathwayScores.business += 2;
        if (answerId === "d") pathwayScores.education += 2;
      }
      else if (qId === 3) {
        if (answerId === "a") pathwayScores.tech += 2;
        if (answerId === "b") pathwayScores.business += 2;
        if (answerId === "c") pathwayScores.creative += 2;
        if (answerId === "d") pathwayScores.business += 1;
      }
      else if (qId === 4) {
        if (answerId === "a") pathwayScores.tech += 2;
        if (answerId === "b") pathwayScores.education += 2;
        if (answerId === "c") pathwayScores.creative += 2;
        if (answerId === "d") pathwayScores.business += 2;
      }
      else if (qId === 5) {
        if (answerId === "a") pathwayScores.tech += 1;
        if (answerId === "b") pathwayScores.education += 2;
        if (answerId === "c") pathwayScores.creative += 1;
        if (answerId === "d") pathwayScores.business += 1;
      }
    });

    // Sort pathways by scores
    const sortedPathways = Object.entries(pathwayScores)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    // Generate recommended skills based on top pathways
    const recommendedSkills: string[] = [];
    const topPathway = sortedPathways[0];
    const secondPathway = sortedPathways[1];

    // Get skills from top two pathways
    const pathway1 = careerPathways.find(p => p.id === topPathway);
    const pathway2 = careerPathways.find(p => p.id === secondPathway);

    if (pathway1) recommendedSkills.push(...pathway1.skills.slice(0, 2));
    if (pathway2) recommendedSkills.push(...pathway2.skills.slice(0, 1));

    // Add trending skills
    recommendedSkills.push(marketTrends[0].skill);

    // Set quiz results
    setQuizResults({
      topPathways: sortedPathways,
      recommendedSkills,
      strengthAreas: sortedPathways.slice(0, 2),
      developmentAreas: sortedPathways.slice(2)
    });

    // Set the selected career path to the top match
    setSelectedCareerPath(sortedPathways[0]);
    
    // Mark quiz as completed
    setQuizCompleted(true);
    
    // Show toast notification
    toast({
      title: "Quiz Completed!",
      description: "Your career pathway analysis is ready to view.",
      className: "bg-emirati-oasisGreen text-white"
    });
    
    // Switch to Results tab
    setActiveTab("results");
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setActiveTab("quiz");
    setQuizResults(null);
  };

  // Find the selected career pathway
  const selectedPathway = careerPathways.find(path => path.id === selectedCareerPath);

  return (
    <div className="container mx-auto py-8 px-4 bg-emirati-sandstone min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mr-4"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold text-emirati-oasisGreen">Student Dashboard</h1>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant={activeTab === "quiz" ? "default" : "outline"} 
            onClick={() => setActiveTab("quiz")}
            className="flex items-center gap-2"
          >
            <CheckCircle size={18} /> Career Quiz
          </Button>
          <Button 
            variant={activeTab === "results" ? "default" : "outline"} 
            onClick={() => setActiveTab("results")}
            className="flex items-center gap-2"
            disabled={!quizCompleted}
          >
            <Award size={18} /> Results
          </Button>
          <Button 
            variant={activeTab === "pathways" ? "default" : "outline"} 
            onClick={() => setActiveTab("pathways")}
            className="flex items-center gap-2"
          >
            <TrendingUp size={18} /> Career Pathways
          </Button>
          <Button 
            variant={activeTab === "trends" ? "default" : "outline"} 
            onClick={() => setActiveTab("trends")}
            className="flex items-center gap-2"
          >
            <BarChart2 size={18} /> Market Trends
          </Button>
        </div>
      </div>

      {activeTab === "quiz" && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Career Pathway Quiz</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
            </CardTitle>
            <CardDescription>
              Answer these questions to help determine your ideal career pathway.
            </CardDescription>
            <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium mb-4">
              {quizQuestions[currentQuestionIndex].question}
            </div>
            
            <RadioGroup
              value={answers[quizQuestions[currentQuestionIndex].id] || ""}
              onValueChange={(value) => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, value)}
              className="space-y-3"
            >
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-md border hover:bg-slate-50">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNextQuestion}
                disabled={!answers[quizQuestions[currentQuestionIndex].id]}
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? (
                  <>Next Question <ChevronRight size={16} /></>
                ) : (
                  <>Submit Quiz <CheckCircle size={16} /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "results" && quizResults && (
        <div className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Your Career Pathway Results</CardTitle>
              <CardDescription>
                Based on your responses, here are your personalized career insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top Career Pathways</h3>
                  <div className="space-y-4">
                    {quizResults.topPathways.map((pathwayId, index) => {
                      const pathway = careerPathways.find(p => p.id === pathwayId);
                      if (!pathway) return null;
                      
                      return (
                        <div key={pathwayId} className="flex items-center space-x-3">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center 
                            ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                              index === 1 ? 'bg-gray-100 text-gray-800' : 
                              index === 2 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}
                          `}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{pathway.name}</div>
                            <div className="text-sm text-muted-foreground">Match strength: {100 - (index * 15)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recommended Skills to Develop</h3>
                  <ul className="space-y-2">
                    {quizResults.recommendedSkills.map((skill, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-emirati-oasisGreen" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <GraduationCap size={32} className="text-emirati-oasisGreen mb-2" />
                        <h4 className="font-medium">Explore Learning Paths</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Discover courses and programs in your top career pathways
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Briefcase size={32} className="text-emirati-oasisGreen mb-2" />
                        <h4 className="font-medium">Job Market Analysis</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Check trending jobs in your recommended fields
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <FileText size={32} className="text-emirati-oasisGreen mb-2" />
                        <h4 className="font-medium">Update Your Resume</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tailor your resume to highlight relevant skills
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={resetQuiz} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "pathways" && (
        <div className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Career Pathway Explorer</CardTitle>
              <CardDescription>
                Explore different career pathways and their future prospects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={selectedCareerPath} 
                value={selectedCareerPath}
                onValueChange={setSelectedCareerPath}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  {careerPathways.map(pathway => (
                    <TabsTrigger key={pathway.id} value={pathway.id}>
                      {pathway.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {selectedPathway && (
                  <TabsContent value={selectedPathway.id} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-emirati-oasisGreen">{selectedPathway.name}</h3>
                          <p>{selectedPathway.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <h4 className="font-medium mb-2">Common Job Titles</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedPathway.jobTitles.map((title, index) => (
                                  <li key={index}>{title}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Key Skills</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedPathway.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div className="bg-slate-50 p-4 rounded-md">
                              <h4 className="font-medium mb-1">Market Demand</h4>
                              <div className="flex items-center space-x-2">
                                <Progress value={selectedPathway.marketDemand} className="flex-1" />
                                <span className="text-sm font-medium">{selectedPathway.marketDemand}%</span>
                              </div>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-md">
                              <h4 className="font-medium mb-1">Salary Range</h4>
                              <p className="text-emirati-camelBrown font-medium">{selectedPathway.salaryRange}</p>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-md">
                              <h4 className="font-medium mb-1">Growth Rate</h4>
                              <p className="text-green-600 font-medium">{selectedPathway.growthRate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Career Progression Timeline</h4>
                        <div className="relative">
                          {selectedPathway.timeline.map((milestone, index) => (
                            <div key={index} className="ml-6 mb-8 relative">
                              <div className="absolute -left-6 mt-1.5 w-4 h-4 rounded-full bg-emirati-oasisGreen"></div>
                              {index < selectedPathway.timeline.length - 1 && (
                                <div className="absolute -left-4.5 mt-3 bottom-0 top-0 w-0.5 bg-emirati-oasisGreen/20"></div>
                              )}
                              <div className="font-medium">{milestone.year}</div>
                              <div className="text-emirati-camelBrown">{milestone.role}</div>
                              <div className="text-sm text-muted-foreground">Focus: {milestone.skills}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Job Market Trends</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedPathway.marketData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="jobs" 
                              stroke="#2c4a2e" 
                              name="Job Opportunities"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                              strokeDasharray={(d) => d.projected ? "5 5" : "0"}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        Job opportunities by year (dashed line indicates projected growth)
                      </p>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "trends" && (
        <div className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Workforce Market Trends</CardTitle>
              <CardDescription>
                Explore current and projected market trends for in-demand skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="demand2023" name="Demand 2023" fill="#8b5e34" />
                    <Bar dataKey="demand2024" name="Demand 2024" fill="#2c4a2e" />
                    <Bar dataKey="projected2025" name="Projected 2025" fill="#d4a373" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Future Skill Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {futureRequirements.map((category, idx) => (
                    <Card key={idx} className="border-emirati-desertGold">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {category.skills.map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-xs text-muted-foreground">{skill.importance}%</span>
                            </div>
                            <Progress value={skill.importance} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Emerging Technologies & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Short-term Impact (1-2 years)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>Advanced Data Analytics:</strong> Growing demand for professionals who can interpret complex data sets and provide actionable insights.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>DevOps & Cloud Engineering:</strong> Continued evolution of cloud infrastructure requiring specialized skills in management and optimization.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>Digital Marketing Specialists:</strong> Focus on omnichannel approaches and leveraging AI for targeted campaigns.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Long-term Trends (3-5 years)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>AI Ethics & Governance:</strong> Emerging roles focused on ethical implementation and regulation of AI technologies.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>Sustainable Technology:</strong> Growing focus on environmental impact and sustainable practices across all industries.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle size={16} className="mt-1 text-emirati-oasisGreen" />
                        <span><strong>Extended Reality Specialists:</strong> Increased demand for AR/VR expertise as these technologies become more mainstream in business applications.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
