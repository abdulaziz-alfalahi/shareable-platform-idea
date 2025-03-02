<lov-code>
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
  GraduationCap,
  FileText,
  BookOpen,
  Brain,
  Lightbulb,
  Users,
  Building,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Grade 10 specialization options
const grade10Specializations = [
  {
    id: "stem",
    name: "Science, Technology, Engineering & Mathematics",
    description: "Focus on advanced math, physics, chemistry, biology, and computer science. Prepares for careers in engineering, medicine, research, and technology.",
    subjects: ["Advanced Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"],
    careerPaths: ["Engineer", "Doctor", "Scientist", "Software Developer", "Mathematician"],
    universities: ["UAE University", "Khalifa University", "American University of Sharjah"],
    icon: Brain
  },
  {
    id: "business",
    name: "Business & Economics",
    description: "Focus on economics, accounting, business studies, and mathematics. Prepares for careers in business, finance, entrepreneurship, and management.",
    subjects: ["Business Studies", "Economics", "Accounting", "Mathematics", "Statistics"],
    careerPaths: ["Business Analyst", "Accountant", "Entrepreneur", "Financial Advisor", "Marketing Specialist"],
    universities: ["Zayed University", "American University in Dubai", "Higher Colleges of Technology"],
    icon: Building
  },
  {
    id: "humanities",
    name: "Humanities & Social Sciences",
    description: "Focus on history, geography, psychology, sociology, and literature. Prepares for careers in law, education, journalism, and public service.",
    subjects: ["History", "Geography", "Psychology", "Sociology", "Literature"],
    careerPaths: ["Lawyer", "Teacher", "Journalist", "Diplomat", "Social Worker"],
    universities: ["United Arab Emirates University", "American University of Sharjah", "Paris-Sorbonne University Abu Dhabi"],
    icon: Users
  },
  {
    id: "arts",
    name: "Arts & Design",
    description: "Focus on visual arts, design, music, drama, and creative writing. Prepares for careers in design, media, entertainment, and creative industries.",
    subjects: ["Visual Arts", "Design", "Media Studies", "Drama", "Creative Writing"],
    careerPaths: ["Graphic Designer", "Media Producer", "Architect", "Fashion Designer", "Film Director"],
    universities: ["American University in Dubai", "Zayed University", "Canadian University Dubai"],
    icon: Lightbulb
  }
];

// Grade 10 counseling resources
const resourcesData = [
  {
    title: "Understanding UAE Education Pathways",
    description: "Comprehensive guide to educational pathways in the UAE, from high school to higher education.",
    type: "Article",
    link: "#article-1"
  },
  {
    title: "Choosing the Right Specialization",
    description: "Interactive workshop with career advisors to help students identify their strengths and interests.",
    type: "Workshop",
    link: "#workshop-1"
  },
  {
    title: "Career Exploration Series",
    description: "Video interviews with professionals in various fields sharing their educational and career journeys.",
    type: "Video Series",
    link: "#video-1"
  },
  {
    title: "University Admission Requirements",
    description: "Overview of admission requirements for popular universities in UAE and abroad.",
    type: "Guide",
    link: "#guide-1"
  },
  {
    title: "Skill Assessment Tools",
    description: "Interactive assessments to help identify your natural aptitudes and strengths.",
    type: "Assessment",
    link: "#assessment-1"
  }
];

// Grade 10 student self-assessment questionnaire
const selfAssessmentQuestions = [
  {
    question: "Which subjects do you enjoy studying the most?",
    options: [
      { id: "a", text: "Mathematics and Sciences", specialization: "stem" },
      { id: "b", text: "Business and Economics", specialization: "business" },
      { id: "c", text: "History, Languages, and Social Studies", specialization: "humanities" },
      { id: "d", text: "Art, Design, and Creative Subjects", specialization: "arts" }
    ]
  },
  {
    question: "How do you prefer to solve problems?",
    options: [
      { id: "a", text: "Using logical reasoning and analysis", specialization: "stem" },
      { id: "b", text: "Considering practical implications and efficiency", specialization: "business" },
      { id: "c", text: "Exploring different perspectives and social factors", specialization: "humanities" },
      { id: "d", text: "Finding creative and innovative solutions", specialization: "arts" }
    ]
  },
  {
    question: "What type of activities do you enjoy in your free time?",
    options: [
      { id: "a", text: "Building things, experimenting, or programming", specialization: "stem" },
      { id: "b", text: "Planning events, managing resources, or entrepreneurial activities", specialization: "business" },
      { id: "c", text: "Reading, writing, debating, or community service", specialization: "humanities" },
      { id: "d", text: "Drawing, designing, performing, or creating", specialization: "arts" }
    ]
  },
  {
    question: "What type of work environment appeals to you most?",
    options: [
      { id: "a", text: "Laboratory, research center, or technical setting", specialization: "stem" },
      { id: "b", text: "Office, boardroom, or entrepreneurial environment", specialization: "business" },
      { id: "c", text: "Classroom, courtroom, or community-oriented setting", specialization: "humanities" },
      { id: "d", text: "Studio, design agency, or creative space", specialization: "arts" }
    ]
  },
  {
    question: "What skills would you like to develop further?",
    options: [
      { id: "a", text: "Technical, analytical, and problem-solving skills", specialization: "stem" },
      { id: "b", text: "Leadership, management, and financial skills", specialization: "business" },
      { id: "c", text: "Communication, research, and critical thinking skills", specialization: "humanities" },
      { id: "d", text: "Creative, visual, and design skills", specialization: "arts" }
    ]
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("grade10");
  const [selectedCareerPath, setSelectedCareerPath] = useState("tech");
  const [quizResults, setQuizResults] = useState<{
    topPathways: string[];
    recommendedSkills: string[];
    strengthAreas: string[];
    developmentAreas: string[];
  } | null>(null);
  const [studentGrade, setStudentGrade] = useState("10");
  const [selectedSpecialization, setSelectedSpecialization] = useState("stem");
  const [selfAssessmentCurrentQuestion, setSelfAssessmentCurrentQuestion] = useState(0);
  const [selfAssessmentAnswers, setSelfAssessmentAnswers] = useState<Record<number, string>>({});
  const [selfAssessmentCompleted, setSelfAssessmentCompleted] = useState(false);
  const [selfAssessmentResults, setSelfAssessmentResults] = useState<{
    topSpecialization: string;
    matchPercentages: Record<string, number>;
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

  // Handle self-assessment answer selection
  const handleSelfAssessmentSelect = (questionIndex: number, answerId: string) => {
    setSelfAssessmentAnswers({
      ...selfAssessmentAnswers,
      [questionIndex]: answerId
    });
  };

  // Handle next question for self-assessment
  const handleSelfAssessmentNext = () => {
    if (selfAssessmentCurrentQuestion < selfAssessmentQuestions.length - 1) {
      setSelfAssessmentCurrentQuestion(selfAssessmentCurrentQuestion + 1);
    } else {
      processSelfAssessmentResults();
    }
  };

  // Process self-assessment results
  const processSelfAssessmentResults = () => {
    // Count specialization matches
    const specializationCounts: Record<string, number> = {
      stem: 0,
      business: 0,
      humanities: 0,
      arts: 0
    };

    // Calculate matches
    Object.entries(selfAssessmentAnswers).forEach(([questionIndex, answerId]) => {
      const question = selfAssessmentQuestions[parseInt(questionIndex)];
      const selectedOption = question.options.find(option => option.id === answerId);
      
      if (selectedOption) {
        specializationCounts[selectedOption.specialization] += 1;
      }
    });

    // Calculate percentages
    const totalQuestions = selfAssessmentQuestions.length;
    const matchPercentages: Record<string, number> = {};
    Object.entries(specializationCounts).forEach(([specialization, count]) => {
      matchPercentages[specialization] = Math.round((count / totalQuestions) * 100);
    });

    // Find top specialization
    const topSpecialization = Object.entries(specializationCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])[0];

    // Set results
    setSelfAssessmentResults({
      topSpecialization,
      matchPercentages
    });

    // Set selected specialization to top match
    setSelectedSpecialization(topSpecialization);
    
    // Mark self-assessment as completed
    setSelfAssessmentCompleted(true);
    
    // Show toast notification
    toast({
      title: "Self-Assessment Completed!",
      description: "Your specialization recommendation is ready to view.",
      className: "bg-emirati-oasisGreen text-white"
    });
  };

  // Reset self-assessment
  const resetSelfAssessment = () => {
    setSelfAssessmentCurrentQuestion(0);
    setSelfAssessmentAnswers({});
    setSelfAssessmentCompleted(false);
    setSelfAssessmentResults(null);
  };

  // Find the selected career pathway
  const selectedPathway = careerPathways.find(path => path.id === selectedCareerPath);
  
  // Find the selected specialization
  const selectedSpec = grade10Specializations.find(spec => spec.id === selectedSpecialization);

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
        
        <div className="flex items-center gap-4">
          <Select value={studentGrade} onValueChange={setStudentGrade}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
          
          {studentGrade === "10" ? (
            <div className="flex gap-4">
              <Button 
                variant={activeTab === "grade10" ? "default" : "outline"} 
                onClick={() => setActiveTab("grade10")}
                className="flex items-center gap-2"
              >
                <BookOpen size={18} /> Specializations
              </Button>
              <Button 
                variant={activeTab === "assessment" ? "default" : "outline"} 
                onClick={() => setActiveTab("assessment")}
                className="flex items-center gap-2"
              >
                <Brain size={18} /> Self-Assessment
              </Button>
              <Button 
                variant={activeTab === "resources" ? "default" : "outline"} 
                onClick={() => setActiveTab("resources")}
                className="flex items-center gap-2"
              >
                <GraduationCap size={18} /> Resources
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Grade 10 Specialization Explorer */}
      {activeTab === "grade10" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Choosing Your Educational Path</h2>
            <p className="text-gray-700 mb-4">
              Grade 10 is an important time to start thinking about your future education and career path. 
              The specialization you choose now will help shape your future opportunities in higher education and beyond.
            </p>
            <Alert>
              <Star className="h-4 w-4" />
              <AlertTitle>Why this matters</AlertTitle>
              <AlertDescription>
                Your choice of specialization can influence your university options, scholarship opportunities, and future career paths.
              </AlertDescription>
            </Alert>
          </div>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Specialization Options</CardTitle>
              <CardDescription>
                Explore different specialization tracks available for high school students in the UAE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={selectedSpecialization} 
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  {grade10Specializations.map(spec => (
                    <TabsTrigger key={spec.id} value={spec.id}>
                      {spec.name.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {selectedSpec && (
                  <TabsContent value={selectedSpec.id
