import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const users = [
  { email: "ahmed@uaeu.example.com", role: "student", points: 150, resume: "Ahmed | Skills: Coding", quiz: "Tech", home: "25.2048,55.2708", university: "uaeu", education: "BSc IT", project: "App Dev", internStatus: null },
  { email: "fatima@khalifa.example.com", role: "student", points: 200, resume: "Fatima | Skills: Design", quiz: "Arts", home: "24.4539,54.3773", university: "khalifa", education: "BA Design", project: "Portfolio Site", internStatus: null }
];

const quizzes = {
  interests: {
    title: "Career Interest Assessment",
    description: "Discover which career paths align with your interests and strengths.",
    questions: [
      {
        id: 1,
        question: "Which activity would you enjoy most in your free time?",
        options: [
          { id: "a", text: "Building or fixing things", category: "Technical" },
          { id: "b", text: "Creating art or design projects", category: "Creative" },
          { id: "c", text: "Analyzing data and solving puzzles", category: "Analytical" },
          { id: "d", text: "Organizing events or leading groups", category: "Leadership" }
        ]
      },
      {
        id: 2,
        question: "In a group project, which role do you naturally take?",
        options: [
          { id: "a", text: "The problem solver who addresses technical challenges", category: "Technical" },
          { id: "b", text: "The creative who comes up with new ideas", category: "Creative" },
          { id: "c", text: "The planner who researches and organizes information", category: "Analytical" },
          { id: "d", text: "The coordinator who manages the team", category: "Leadership" }
        ]
      },
      {
        id: 3,
        question: "Which work environment appeals to you most?",
        options: [
          { id: "a", text: "A workshop or laboratory with specialized equipment", category: "Technical" },
          { id: "b", text: "A creative studio with freedom to express ideas", category: "Creative" },
          { id: "c", text: "A structured environment with clear processes", category: "Analytical" },
          { id: "d", text: "A collaborative space with team interactions", category: "Leadership" }
        ]
      },
      {
        id: 4,
        question: "What type of challenge energizes you?",
        options: [
          { id: "a", text: "Building or improving something concrete", category: "Technical" },
          { id: "b", text: "Designing something visually impressive", category: "Creative" },
          { id: "c", text: "Solving a complex problem with data", category: "Analytical" },
          { id: "d", text: "Influencing others and building consensus", category: "Leadership" }
        ]
      },
      {
        id: 5,
        question: "Which achievement would make you most proud?",
        options: [
          { id: "a", text: "Creating an innovative product or system", category: "Technical" },
          { id: "b", text: "Having your creative work recognized", category: "Creative" },
          { id: "c", text: "Finding an efficient solution to a complex problem", category: "Analytical" },
          { id: "d", text: "Successfully leading a team to achieve goals", category: "Leadership" }
        ]
      }
    ]
  },
  skills: {
    title: "Skills Assessment",
    description: "Identify your strongest skills and areas for development.",
    questions: [
      {
        id: 1,
        question: "How comfortable are you with learning new technologies?",
        options: [
          { id: "a", text: "Very comfortable - I enjoy learning new tech", category: "Technical" },
          { id: "b", text: "Somewhat comfortable", category: "Mixed" },
          { id: "c", text: "Neutral", category: "Neutral" },
          { id: "d", text: "Prefer familiar technologies", category: "Non-Technical" }
        ]
      }
    ]
  }
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [university, setUniversity] = useState("uaeu");
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState("No Badge");
  const [activeTab, setActiveTab] = useState("student-tab");
  const [quizResult, setQuizResult] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [activeQuiz, setActiveQuiz] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});
  const [recommendedPaths, setRecommendedPaths] = useState<string[]>([]);

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      setUserName(email.split("@")[0]);
      setUserRole(role);
      
      const user = users.find(u => u.email === email);
      if (user) {
        setPoints(user.points);
        updateBadge(user.points);
      } else {
        setPoints(0);
        updateBadge(0);
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome, ${email.split("@")[0]}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter email and password",
        variant: "destructive",
      });
    }
  };

  const updateBadge = (points: number) => {
    const levels = [
      { threshold: 0, name: "Explorer" },
      { threshold: 150, name: "Pioneer" },
      { threshold: 300, name: "Visionary" }
    ];
    
    const level = levels.slice().reverse().find(l => points >= l.threshold);
    if (level) {
      setBadge(`${level.name} (Level ${levels.indexOf(level) + 1})`);
    }
  };

  const answerQuiz = (choice: string) => {
    const newPoints = points + 50;
    setPoints(newPoints);
    setQuizResult(`You'd excel in ${choice}! Consider studying ${choice}-related fields.`);
    updateBadge(newPoints);
  };

  const startQuiz = (quizType: string) => {
    setActiveQuiz(quizType);
    setCurrentQuestion(1);
    setAnswers({});
    setQuizCompleted(false);
    setQuizResults({});
    setRecommendedPaths([]);
  };

  const handleQuizAnswer = (questionId: number, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const goToNextQuestion = () => {
    if (activeQuiz && quizzes[activeQuiz as keyof typeof quizzes]) {
      const quiz = quizzes[activeQuiz as keyof typeof quizzes];
      if (currentQuestion < quiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateQuizResults();
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateQuizResults = () => {
    const quiz = quizzes[activeQuiz as keyof typeof quizzes];
    const results: Record<string, number> = {};
    
    Object.values(quiz.questions).forEach(question => {
      question.options.forEach(option => {
        if (!results[option.category]) {
          results[option.category] = 0;
        }
      });
    });
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quiz.questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const selectedOption = question.options.find(opt => opt.id === answerId);
        if (selectedOption) {
          results[selectedOption.category] = (results[selectedOption.category] || 0) + 1;
        }
      }
    });
    
    setQuizResults(results);
    
    const sortedCategories = Object.entries(results)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category);
    
    const recommendations: string[] = [];
    
    if (sortedCategories[0] === "Technical") {
      recommendations.push("Software Development", "IT Security", "Network Engineering");
    } else if (sortedCategories[0] === "Creative") {
      recommendations.push("UX/UI Design", "Digital Marketing", "Media Production");
    } else if (sortedCategories[0] === "Analytical") {
      recommendations.push("Data Analysis", "Business Intelligence", "Financial Analysis");
    } else if (sortedCategories[0] === "Leadership") {
      recommendations.push("Project Management", "Business Administration", "Human Resources");
    }
    
    setRecommendedPaths(recommendations);
    setQuizCompleted(true);
    
    const newPoints = points + 100;
    setPoints(newPoints);
    updateBadge(newPoints);
    
    toast({
      title: "Quiz Completed!",
      description: `You've earned 100 Heritage Points for completing the ${quiz.title}.`,
    });
  };

  const renderActiveQuestion = () => {
    if (!activeQuiz || !quizzes[activeQuiz as keyof typeof quizzes]) return null;
    
    const quiz = quizzes[activeQuiz as keyof typeof quizzes];
    const question = quiz.questions.find(q => q.id === currentQuestion);
    
    if (!question) return null;
    
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{question.question}</h3>
          <Progress 
            value={(currentQuestion / quiz.questions.length) * 100} 
            className="h-2 w-full"
          />
          <p className="text-sm text-gray-500">Question {currentQuestion} of {quiz.questions.length}</p>
        </div>
        
        <RadioGroup 
          value={answers[question.id] || ""}
          onValueChange={(value) => handleQuizAnswer(question.id, value)}
          className="space-y-2"
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-[#f5e8c7]">
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 1}
            className="border-[#d4a373] text-[#2c4a2e]"
          >
            Previous
          </Button>
          
          <Button
            onClick={goToNextQuestion}
            disabled={!answers[question.id]}
            className="bg-[#2c4a2e] hover:bg-[#3d6b40]"
          >
            {currentQuestion === quiz.questions.length ? "Complete Quiz" : "Next Question"}
          </Button>
        </div>
      </div>
    );
  };

  const renderQuizResults = () => {
    if (!activeQuiz || !quizCompleted) return null;
    
    const quiz = quizzes[activeQuiz as keyof typeof quizzes];
    const totalQuestions = quiz.questions.length;
    const sortedResults = Object.entries(quizResults)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / totalQuestions) * 100)
      }));
    
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Your Results</h3>
          <p className="text-gray-600">Based on your answers, here's a breakdown of your profile:</p>
        </div>
        
        <div className="space-y-4">
          {sortedResults.map((result) => (
            <div key={result.category} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">{result.category}</span>
                <span>{result.percentage}%</span>
              </div>
              <Progress value={result.percentage} className="h-2 w-full" />
            </div>
          ))}
        </div>
        
        <div className="space-y-2 bg-[#f5e8c7] p-4 rounded-lg border border-[#d4a373]">
          <h4 className="font-bold">Recommended Career Paths</h4>
          <ul className="list-disc list-inside space-y-1">
            {recommendedPaths.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveQuiz("")}
            className="border-[#d4a373] text-[#2c4a2e]"
          >
            Back to Quizzes
          </Button>
          <Button 
            onClick={() => {
              setActiveQuiz("");
              toast({
                title: "Results Saved",
                description: "Your quiz results have been saved to your profile."
              });
            }}
            className="bg-[#2c4a2e] hover:bg-[#3d6b40]"
          >
            Save Results
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5e8c7] text-[#2c4a2e]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center py-6 bg-gradient-to-b from-[#d4a373] to-[#c68e5a] text-white rounded-t-lg mb-6">
          <h1 className="text-3xl font-bold">Emirati Journey</h1>
          <p className="text-xl">Your Path from School to Success</p>
          {isLoggedIn && (
            <div className="mt-2">
              Welcome, <span className="font-semibold">{userName}</span> (<span>{userRole}</span>)
            </div>
          )}
        </header>

        {!isLoggedIn ? (
          <Card className="border-2 border-[#d4a373] bg-white">
            <CardHeader>
              <CardTitle>Login (UAEPass Simulator)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student/Job Seeker/Employee</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="intern-coord">Internship Coordinator</SelectItem>
                    <SelectItem value="training-rep">Training Rep</SelectItem>
                    <SelectItem value="assessment-rep">Assessment Rep</SelectItem>
                    <SelectItem value="advisor">Career Advisor</SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
                
                {(role === "intern-coord" || role === "student") && (
                  <Select value={university} onValueChange={setUniversity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uaeu">UAE University</SelectItem>
                      <SelectItem value="khalifa">Khalifa University</SelectItem>
                      <SelectItem value="zu">Zayed University</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                <Input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                
                <Button 
                  className="w-full bg-[#2c4a2e] hover:bg-[#3d6b40]"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                
                {role === "training-rep" && (
                  <Button 
                    className="w-full mt-2 bg-[#8b5e34] hover:bg-[#a67447]"
                  >
                    Register as Training Provider
                  </Button>
                )}
                
                {role === "assessment-rep" && (
                  <Button 
                    className="w-full mt-2 bg-[#8b5e34] hover:bg-[#a67447]"
                  >
                    Register as Assessment Center
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-6">
            <Tabs defaultValue="student-tab" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full flex flex-wrap border-b-2 border-[#d4a373] bg-transparent">
                <TabsTrigger 
                  value="student-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Student/Job Seeker
                </TabsTrigger>
                <TabsTrigger 
                  value="parent-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Parent
                </TabsTrigger>
                <TabsTrigger 
                  value="recruiter-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Recruiter
                </TabsTrigger>
                <TabsTrigger 
                  value="intern-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Intern Coord
                </TabsTrigger>
                <TabsTrigger 
                  value="training-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Training
                </TabsTrigger>
                <TabsTrigger 
                  value="assessment-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Assessment
                </TabsTrigger>
                <TabsTrigger 
                  value="advisor-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Advisor
                </TabsTrigger>
                <TabsTrigger 
                  value="coach-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Coach
                </TabsTrigger>
                <TabsTrigger 
                  value="admin-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Admin
                </TabsTrigger>
                <TabsTrigger 
                  value="leadership-tab"
                  className="rounded-t-lg data-[state=active]:bg-[#d4a373] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#2c4a2e] data-[state=inactive]:hover:bg-[#e8d5a8]"
                >
                  Leadership
                </TabsTrigger>
              </TabsList>
              
              <div className="p-4 bg-white border-2 border-[#d4a373] border-t-0 rounded-b-lg">
                <TabsContent value="student-tab">
                  <p className="mb-4">Heritage Points: <span className="font-semibold">{points}</span> | <span>{badge}</span></p>
                  
                  {!activeQuiz ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-8">
                        <Card className="mb-6 border-2 border-[#d4a373]">
                          <CardHeader>
                            <CardTitle>Career Exploration</CardTitle>
                            <CardDescription>Discover your strengths and ideal career paths</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {quizzes.interests && (
                              <Card className="overflow-hidden">
                                <div className="bg-[#f5e8c7] p-4">
                                  <h3 className="text-lg font-bold">{quizzes.interests.title}</h3>
                                  <p className="text-sm">{quizzes.interests.description}</p>
                                </div>
                                <CardContent className="p-4">
                                  <p className="mb-2 text-sm">5 questions • Approximately 3-5 minutes</p>
                                  <Button 
                                    onClick={() => startQuiz("interests")}
                                    className="w-full bg-[#2c4a2e] hover:bg-[#3d6b40]"
                                  >
                                    Start Quiz
                                  </Button>
                                </CardContent>
                              </Card>
                            )}
                            
                            {quizzes.skills && (
                              <Card className="overflow-hidden">
                                <div className="bg-[#f5e8c7] p-4">
                                  <h3 className="text-lg font-bold">{quizzes.skills.title}</h3>
                                  <p className="text-sm">{quizzes.skills.description}</p>
                                </div>
                                <CardContent className="p-4">
                                  <p className="mb-2 text-sm">Coming soon</p>
                                  <Button 
                                    disabled
                                    className="w-full bg-gray-400"
                                  >
                                    Coming Soon
                                  </Button>
                                </CardContent>
                              </Card>
                            )}
                            
                            <div className="bg-[#f5e8c7] p-4 rounded-lg border border-[#d4a373]">
                              <h3 className="font-semibold">Why Take Career Assessments?</h3>
                              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li>Discover your natural strengths and interests</li>
                                <li>Find careers that match your personality</li>
                                <li>Earn Heritage Points for your journey</li>
                                <li>Get personalized recommendations</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="mb-6 border-2 border-[#d4a373]">
                          <CardHeader>
                            <CardTitle>Workshops & Awareness</CardTitle>
                            <CardDescription>Expand your knowledge with expert-led sessions</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="bg-[#f5e8c7] rounded-lg divide-y divide-[#d4a373] overflow-hidden">
                              <li className="p-3 hover:bg-[#e8d5a8]">
                                <a href="#" className="text-[#2c4a2e] hover:underline">Tech Careers 2025 (TechCorp)</a>
                              </li>
                              <li className="p-3 hover:bg-[#e8d5a8]">
                                <a href="#" className="text-[#2c4a2e] hover:underline">Business Trends in UAE (BizInst)</a>
                              </li>
                              <li className="p-3 hover:bg-[#e8d5a8]">
                                <a href="#" className="text-[#2c4a2e] hover:underline">Creative Futures (ArtCo)</a>
                              </li>
                            </ul>
                            <p className="mt-4">More sessions coming soon!</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="md:col-span-4">
                        <h3 className="text-xl font-bold mb-4">Your Journey</h3>
                        <div className="h-[300px] border-2 border-[#d4a373] rounded-lg bg-gray-100">
                          <div className="flex items-center justify-center h-full">
                            <p className="text-center text-gray-500">Map visualization coming soon</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Card className="border-2 border-[#d4a373]">
                      <CardHeader>
                        <CardTitle>{quizzes[activeQuiz as keyof typeof quizzes]?.title}</CardTitle>
                        <CardDescription>
                          {quizzes[activeQuiz as keyof typeof quizzes]?.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {quizCompleted ? renderQuizResults() : renderActiveQuestion()}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="parent-tab">
                  <h3 className="text-xl font-bold mb-4">Parent Dashboard</h3>
                  <p>Parent dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="recruiter-tab">
                  <h3 className="text-xl font-bold mb-4">Recruiter Dashboard</h3>
                  <p>Recruiter dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="intern-tab">
                  <h3 className="text-xl font-bold mb-4">Internship Coordinator Dashboard</h3>
                  <p>Internship coordinator dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="training-tab">
                  <h3 className="text-xl font-bold mb-4">Training Provider Dashboard</h3>
                  <p>Training provider dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="assessment-tab">
                  <h3 className="text-xl font-bold mb-4">Assessment Center Dashboard</h3>
                  <p>Assessment center dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="advisor-tab">
                  <h3 className="text-xl font-bold mb-4">Career Advisor</h3>
                  <p>Career advisor dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="coach-tab">
                  <h3 className="text-xl font-bold mb-4">Coach Dashboard</h3>
                  <p>Coach dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="admin-tab">
                  <h3 className="text-xl font-bold mb-4">Admin Dashboard</h3>
                  <p>Admin dashboard content will be implemented in the next phase.</p>
                </TabsContent>
                
                <TabsContent value="leadership-tab">
                  <h3 className="text-xl font-bold mb-4">Leadership Dashboard</h3>
                  <p>Leadership dashboard content will be implemented in the next phase.</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
