import { useState } from "react";
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
import { useToast } from "@/hooks/toast";
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

// Grade 10 student self-assessment questionnaire - expanded to 10 questions
const selfAssessmentQuestions = [
  {
    question: "Which subjects do you consistently perform well in and enjoy studying?",
    options: [
      { id: "a", text: "Mathematics, Physics, or Computer Science", specialization: "stem" },
      { id: "b", text: "Business Studies, Economics, or Accounting", specialization: "business" },
      { id: "c", text: "Languages, History, or Social Studies", specialization: "humanities" },
      { id: "d", text: "Visual Arts, Design, or Music", specialization: "arts" }
    ]
  },
  {
    question: "How do you prefer to approach problem-solving?",
    options: [
      { id: "a", text: "Using logical reasoning, formulas, and systematic analysis", specialization: "stem" },
      { id: "b", text: "Evaluating practical implications, resources, and financial feasibility", specialization: "business" },
      { id: "c", text: "Considering different perspectives, historical context, and social impacts", specialization: "humanities" },
      { id: "d", text: "Finding creative and innovative solutions through design thinking", specialization: "arts" }
    ]
  },
  {
    question: "What type of projects or activities do you enjoy most in your free time?",
    options: [
      { id: "a", text: "Building things, programming, or conducting experiments", specialization: "stem" },
      { id: "b", text: "Managing resources, planning events, or entrepreneurial activities", specialization: "business" },
      { id: "c", text: "Reading, writing essays, debating, or volunteering", specialization: "humanities" },
      { id: "d", text: "Drawing, photography, performance, or creating digital content", specialization: "arts" }
    ]
  },
  {
    question: "What role do you typically take in group projects?",
    options: [
      { id: "a", text: "Technical specialist who handles complex problems", specialization: "stem" },
      { id: "b", text: "Leader who organizes the workflow and manages the team", specialization: "business" },
      { id: "c", text: "Researcher who gathers information and writes content", specialization: "humanities" },
      { id: "d", text: "Creative contributor who handles design and presentation", specialization: "arts" }
    ]
  },
  {
    question: "Which career achievements would bring you the most satisfaction?",
    options: [
      { id: "a", text: "Making a scientific discovery or technological breakthrough", specialization: "stem" },
      { id: "b", text: "Building a successful business or managing a large organization", specialization: "business" },
      { id: "c", text: "Making a positive impact on society or influencing public policy", specialization: "humanities" },
      { id: "d", text: "Creating influential artistic works or innovative designs", specialization: "arts" }
    ]
  },
  {
    question: "When learning something new, how do you prefer to approach it?",
    options: [
      { id: "a", text: "Through technical manuals, practical experimentation, and logic", specialization: "stem" },
      { id: "b", text: "Through case studies, real-world examples, and best practices", specialization: "business" },
      { id: "c", text: "Through reading literature, discussions, and critical analysis", specialization: "humanities" },
      { id: "d", text: "Through visual demonstrations, creative exploration, and practice", specialization: "arts" }
    ]
  },
  {
    question: "What type of work environment would you thrive in?",
    options: [
      { id: "a", text: "High-tech laboratory, research center, or engineering firm", specialization: "stem" },
      { id: "b", text: "Corporate office, financial institution, or entrepreneurial setting", specialization: "business" },
      { id: "c", text: "Educational institution, government agency, or non-profit organization", specialization: "humanities" },
      { id: "d", text: "Design studio, media production house, or creative agency", specialization: "arts" }
    ]
  },
  {
    question: "Which topics do you find yourself researching or reading about in your spare time?",
    options: [
      { id: "a", text: "Scientific discoveries, technology trends, or mathematical concepts", specialization: "stem" },
      { id: "b", text: "Business news, investment strategies, or management techniques", specialization: "business" },
      { id: "c", text: "Current events, historical topics, philosophy, or psychology", specialization: "humanities" },
      { id: "d", text: "Art movements, design principles, or creative techniques", specialization: "arts" }
    ]
  },
  {
    question: "What types of challenges energize rather than drain you?",
    options: [
      { id: "a", text: "Complex technical problems requiring analytical thinking", specialization: "stem" },
      { id: "b", text: "Strategic decisions involving resources and competitive analysis", specialization: "business" },
      { id: "c", text: "Understanding complex social issues and human behavior", specialization: "humanities" },
      { id: "d", text: "Expressing ideas through creative and artistic mediums", specialization: "arts" }
    ]
  },
  {
    question: "If you could choose one skill to master instantly, what would it be?",
    options: [
      { id: "a", text: "Advanced programming, engineering, or scientific research", specialization: "stem" },
      { id: "b", text: "Financial analysis, strategic planning, or negotiation", specialization: "business" },
      { id: "c", text: "Persuasive writing, critical analysis, or foreign languages", specialization: "humanities" },
      { id: "d", text: "Professional-level artistic skills or multimedia production", specialization: "arts" }
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
      type: "success"
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
      description: "Your comprehensive specialization recommendation is ready to view.",
      type: "success"
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
                  <TabsContent value={selectedSpec.id}>
                    <div className="grid md:grid-cols-2 gap-6 p-4">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <selectedSpec.icon className="h-8 w-8 text-emirati-oasisGreen" />
                          <h3 className="text-xl font-semibold">{selectedSpec.name}</h3>
                        </div>
                        <p className="text-gray-700 mb-4">{selectedSpec.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-emirati-oasisGreen mb-2">Key Subjects</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedSpec.subjects.map((subject, index) => (
                              <li key={index}>{subject}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <h4 className="font-medium text-emirati-oasisGreen mb-2">Potential Career Paths</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedSpec.careerPaths.map((path, index) => (
                              <li key={index}>{path}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-emirati-oasisGreen mb-2">Recommended Universities</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedSpec.universities.map((uni, index) => (
                              <li key={index}>{uni}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about selecting a specialization in Grade 10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I change my specialization later?</AccordionTrigger>
                  <AccordionContent>
                    Yes, it's possible to change specializations, but it becomes more challenging as you progress. Some changes may require additional coursework to meet prerequisites for your new direction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does my specialization affect university admission?</AccordionTrigger>
                  <AccordionContent>
                    Your specialization affects which university programs you qualify for. For example, STEM specialization is typically required for engineering or medicine, while business specialization is preferred for commerce or finance programs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Should I choose based on career goals or subjects I enjoy?</AccordionTrigger>
                  <AccordionContent>
                    Ideally, consider both factors. Enjoyment of subjects leads to better performance and learning, while alignment with career goals ensures practical outcomes. The self-assessment tool can help identify where your interests and aptitudes align.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How can I get more guidance about specializations?</AccordionTrigger>
                  <AccordionContent>
                    You can schedule a meeting with your school counselor, attend specialization orientation sessions, talk with teachers in specific subject areas, or connect with university representatives during education fairs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Self Assessment Quiz */}
      {activeTab === "assessment" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Specialization Self-Assessment</h2>
            <p className="text-gray-700 mb-4">
              Answer a few questions to help identify which specialization might be the best fit for your interests, strengths, and goals.
            </p>
            {selfAssessmentCompleted ? (
              <Button onClick={resetSelfAssessment} variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} /> Retake Assessment
              </Button>
            ) : null}
          </div>
          
          {!selfAssessmentCompleted ? (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emirati-oasisGreen">Question {selfAssessmentCurrentQuestion + 1} of {selfAssessmentQuestions.length}</CardTitle>
                <CardDescription>
                  {selfAssessmentQuestions[selfAssessmentCurrentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup className="space-y-3" 
                  value={selfAssessmentAnswers[selfAssessmentCurrentQuestion] || ""}
                  onValueChange={(value) => handleSelfAssessmentSelect(selfAssessmentCurrentQuestion, value)}
                >
                  {selfAssessmentQuestions[selfAssessmentCurrentQuestion].options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      <Label htmlFor={`option-${option.id}`} className="flex-1">{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelfAssessmentCurrentQuestion(Math.max(0, selfAssessmentCurrentQuestion - 1))} 
                    disabled={selfAssessmentCurrentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleSelfAssessmentNext}
                    disabled={!selfAssessmentAnswers[selfAssessmentCurrentQuestion]}
                  >
                    {selfAssessmentCurrentQuestion === selfAssessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen">Your Assessment Results</CardTitle>
                  <CardDescription>
                    Based on your responses, here's how well each specialization matches your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Your Top Match: <span className="text-emirati-oasisGreen font-semibold">{grade10Specializations.find(s => s.id === selfAssessmentResults?.topSpecialization)?.name}</span></h3>
                      <p className="text-gray-700">
                        This specialization appears to align well with your interests, preferences, and learning style based on your detailed responses.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Match Percentages</h3>
                      {selfAssessmentResults && Object.entries(selfAssessmentResults.matchPercentages).sort((a, b) => b[1] - a[1]).map(([specId, percentage]) => {
                        const spec = grade10Specializations.find(s => s.id === specId);
                        return (
                          <div key={specId} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{spec?.name}</span>
                              <span>{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-emirati-sand p-2 rounded-full">
                        <FileText size={18} className="text-emirati-oasisGreen" />
                      </div>
                      <div>
                        <h4 className="font-medium">Explore Your Top Match</h4>
                        <p className="text-gray-700">Click on the "Specializations" tab to learn more about your recommended specialization and what it offers.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-emirati-sand p-2 rounded-full">
                        <GraduationCap size={18} className="text-emirati-oasisGreen" />
                      </div>
                      <div>
                        <h4 className="font-medium">Discuss With Your Advisor</h4>
                        <p className="text-gray-700">Schedule a meeting with your school counselor to discuss these results and get personalized guidance.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-emirati-sand p-2 rounded-full">
                        <BookOpen size={18} className="text-emirati-oasisGreen" />
                      </div>
                      <div>
                        <h4 className="font-medium">Review Resources</h4>
                        <p className="text-gray-700">Check the "Resources" tab for materials that can help you learn more about your educational options.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
      
      {/* Educational Resources */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Educational Resources</h2>
            <p className="text-gray-700 mb-4">
              Access helpful resources for planning your educational journey and career path in the UAE.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.map((resource, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <span className="bg-emirati-sand text-emirati-oasisGreen text-xs font-medium px-2.5 py-0.5 rounded">
                      {resource.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <Button asChild variant="outline" className="w-full flex items-center gap-2">
                    <a href={resource.link}>
                      Access Resource <ChevronRight size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-white shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Schedule Counseling Session</CardTitle>
              <CardDescription>
                Get personalized guidance from our education advisors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-emirati-sand rounded-md text-center">
                <p className="mb-4 text-gray-700">
                  Our education counselors are available to help you navigate your educational choices and create a personalized plan.
                </p>
                <Button className="flex items-center gap-2">
                  <GraduationCap size={18} /> Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Career Quiz */}
      {activeTab === "quiz" && !quizCompleted && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Career Pathway Quiz</h2>
            <p className="text-gray-700 mb-4">
              Answer a few questions to identify potential career paths that match your interests and preferences.
            </p>
          </div>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardTitle>
              <CardDescription>
                {quizQuestions[currentQuestionIndex].question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup className="space-y-3" 
                value={answers[quizQuestions[currentQuestionIndex].id] || ""}
                onValueChange={(value) => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, value)}
              >
                {quizQuestions[currentQuestionIndex].options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={option.id} id={`question-${quizQuestions[currentQuestionIndex].id}-option-${option.id}`} />
                    <Label htmlFor={`question-${quizQuestions[currentQuestionIndex].id}-option-${option.id}`} className="flex-1">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))} 
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!answers[quizQuestions[currentQuestionIndex].id]}
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Complete Quiz' : 'Next Question'}
                </Button>
              </div>
              
              <Progress className="mt-4 h-2" value={(currentQuestionIndex + 1) / quizQuestions.length * 100} />
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Quiz Results */}
      {activeTab === "results" && quizResults && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Your Career Pathway Results</h2>
            <p className="text-gray-700 mb-4">
              Based on your responses, we've identified potential career pathways that align with your interests and preferences.
            </p>
            <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2">
              <RefreshCw size={16} /> Retake Quiz
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emirati-oasisGreen">Recommended Career Pathways</CardTitle>
                <CardDescription>
                  Career fields that match your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizResults.topPathways.map((pathwayId, index) => {
                    const pathway = careerPathways.find(p => p.id === pathwayId);
                    if (!pathway) return null;
                    
                    return (
                      <div key={pathway.id} className={`p-4 rounded-md ${index === 0 ? 'bg-emirati-sand border-l-4 border-emirati-oasisGreen' : 'border'}`}>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {index === 0 && <Star className="h-4 w-4 text-emirati-oasisGreen" />}
                          {pathway.name}
                          {index === 0 && <span className="text-xs bg-emirati-oasisGreen text-white px-2 py-0.5 rounded">Top Match</span>}
                        </h3>
                        <p className="text-gray-700 text-sm mt-1">{pathway.description}</p>
                        
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs" 
                            onClick={() => {
                              setSelectedCareerPath(pathway.id);
                              setActiveTab("pathways");
                            }}
                          >
                            Explore This Pathway
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-emirati-oasisGreen">Skill Development Recommendations</CardTitle>
                <CardDescription>
                  Skills to focus on based on your career interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Recommended Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {quizResults.recommendedSkills.map((skill, i) => (
                      <span key={i} className="bg-emirati-sand text-emirati-oasisGreen px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Areas of Strength</h3>
                    <div className="flex flex-wrap gap-2">
                      {quizResults.strengthAreas.map((area, i) => {
                        const pathway = careerPathways.find(p => p.id === area);
                        return pathway ? (
                          <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {pathway.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Areas for Development</h3>
                    <div className="flex flex-wrap gap-2">
                      {quizResults.developmentAreas.map((area, i) => {
                        const pathway = careerPathways.find(p => p.id === area);
                        return pathway ? (
                          <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                            {pathway.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <div className="bg-emirati-sand p-3 rounded-full mb-3">
                    <TrendingUp size={24} className="text-emirati-oasisGreen" />
                  </div>
                  <h3 className="font-medium mb-2">Explore Pathways</h3>
                  <p className="text-sm text-gray-700">Dive deeper into your recommended career pathways to understand job roles and requirements.</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <div className="bg-emirati-sand p-3 rounded-full mb-3">
                    <BarChart2 size={24} className="text-emirati-oasisGreen" />
                  </div>
                  <h3 className="font-medium mb-2">Review Market Trends</h3>
                  <p className="text-sm text-gray-700">Understand the job market demand and future outlook for your areas of interest.</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-md">
                  <div className="bg-emirati-sand p-3 rounded-full mb-3">
                    <Briefcase size={24} className="text-emirati-oasisGreen" />
                  </div>
                  <h3 className="font-medium mb-2">Explore Internships</h3>
                  <p className="text-sm text-gray-700">Find internship opportunities that align with your career interests to gain practical experience.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Career Pathways */}
      {activeTab === "pathways" && selectedPathway && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-1">{selectedPathway.name}</h2>
                <p className="text-gray-700">{selectedPathway.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-600">Market Demand:</span>
                  <span className="font-medium">{selectedPathway.marketDemand}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Growth Rate:</span>
                  <span className="font-medium text-green-600">{selectedPathway.growthRate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card className="bg-white shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen">Key Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Common Job Titles</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedPathway.jobTitles.map((title, index) => (
                          <li key={index}>{title}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Key Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPathway.skills.map((skill, index) => (
                          <span key={index} className="bg-emirati-sand text-emirati-oasisGreen px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Salary Range</h3>
                      <p className="text-lg font-semibold text-emirati-oasisGreen">{selectedPathway.salaryRange}</p>
                      <p className="text-xs text-gray-500">Annual salary in UAE (approximate)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen">Career Progression</CardTitle>
                  <CardDescription>
                    Typical career development path in {selectedPathway.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-8 relative">
                      {selectedPathway.timeline.map((stage, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-8 h-8 bg-emirati-oasisGreen rounded-full flex items-center justify-center text-white z-10">
                            {index + 1}
                          </div>
                          <div className="flex-1 bg-gray-50 p-4 rounded-md shadow-sm">
                            <h3 className="font-medium">{stage.year}: {stage.role}</h3>
                            <p className="text-sm text-gray-700">{stage.skills}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-emirati-oasisGreen">Job Market Outlook</CardTitle>
                  <CardDescription>
                    Job openings in UAE (actual and projected)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedPathway.marketData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="jobs" 
                          fill="#2e7d32"
                          name="Job Openings" 
                          radius={[4, 4, 0, 0]}
                          barSize={24}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Data beyond 2024 represents projected job openings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Market Trends */}
      {activeTab === "trends" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-emirati-oasisGreen mb-3">Market Trends & Future Skills</h2>
            <p className="text-gray-700 mb-4">
              Stay informed about the latest job market trends and skills that will be in demand in the UAE job market.
            </p>
          </div>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">In-Demand Skills</CardTitle>
              <CardDescription>
                Skills with high market demand in the UAE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketTrends}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="skill" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="demand2023" fill="#f0ba70" name="2023" barSize={10} />
                    <Bar dataKey="demand2024" fill="#6b9b77" name="2024" barSize={10} />
                    <Bar dataKey="projected2025" fill="#2e7d32" name="2025 (Projected)" barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {marketTrends.slice(0, 3).map((trend, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <h3 className="font-medium text-emirati-oasisGreen mb-2">{trend.skill}</h3>
                    <p className="text-sm text-gray-700 mb-3">Top industries: {trend.industries.join(", ")}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Growth:</span>
                      <Progress value={(trend.projected2025 - trend.demand2023)} max={25} className="h-2 flex-1" />
                      <span className="text-xs font-medium">+{trend.projected2025 - trend.demand2023}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">Future Skill Requirements</CardTitle>
              <CardDescription>
                Skills predicted to be critical in the next 5 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={futureRequirements[0].category}>
                <TabsList className="grid grid-cols-3 mb-4">
                  {futureRequirements.map((category, index) => (
                    <TabsTrigger key={index} value={category.category}>
                      {category.category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {futureRequirements.map((category, catIndex) => (
                  <TabsContent key={catIndex} value={category.category} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{skill.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              skill.importance >= 85 ? 'bg-red-100 text-red-800' :
                              skill.importance >= 75 ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {skill.importance >= 85 ? 'Critical' :
                               skill.importance >= 75 ? 'Important' :
                               'Valuable'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">Importance:</span>
                            <Progress value={skill.importance} className="h-2 flex-1" />
                            <span className="text-xs font-medium">{skill.importance}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-emirati-oasisGreen">UAE Job Market Insights</CardTitle>
              <CardDescription>
                Key trends and statistics about the UAE employment landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-4xl font-bold text-emirati-oasisGreen mb-2">68%</h3>
                  <p className="text-gray-700">of UAE employers plan to increase hiring in the next year</p>
                </div>
                
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-4xl font-bold text-emirati-oasisGreen mb-2">42%</h3>
                  <p className="text-gray-700">of jobs will require new skill sets in the next 5 years</p>
                </div>
                
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-4xl font-bold text-emirati-oasisGreen mb-2">3.8x</h3>
                  <p className="text-gray-700">increase in remote work opportunities since 2020</p>
                </div>
              </div>
              
              <div className="mt-6 bg-emirati-sand rounded-md p-4">
                <h3 className="font-medium mb-2">UAE Vision 2031 Employment Goals</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Increase Emirati participation in the private sector by 75%</li>
                  <li>Develop specialized knowledge economy sectors</li>
                  <li>Enhance entrepreneurship and innovation ecosystem</li>
                  <li>Create 160,000 new jobs in emerging technology sectors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
