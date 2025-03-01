
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const users = [
  { email: "ahmed@uaeu.example.com", role: "student", points: 150, resume: "Ahmed | Skills: Coding", quiz: "Tech", home: "25.2048,55.2708", university: "uaeu", education: "BSc IT", project: "App Dev", internStatus: null },
  { email: "fatima@khalifa.example.com", role: "student", points: 200, resume: "Fatima | Skills: Design", quiz: "Arts", home: "24.4539,54.3773", university: "khalifa", education: "BA Design", project: "Portfolio Site", internStatus: null }
];

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

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      setUserName(email.split("@")[0]);
      setUserRole(role);
      
      // Find user or create new one
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
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8">
                      <Card className="mb-6 border-2 border-[#d4a373]">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Interest Quiz</h3>
                          <p className="mb-2">Discover your path:</p>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              className="bg-[#8b5e34] hover:bg-[#a67447]"
                              onClick={() => answerQuiz("Tech")}
                            >
                              Tech
                            </Button>
                            <Button 
                              className="bg-[#8b5e34] hover:bg-[#a67447]"
                              onClick={() => answerQuiz("Business")}
                            >
                              Business
                            </Button>
                            <Button 
                              className="bg-[#8b5e34] hover:bg-[#a67447]"
                              onClick={() => answerQuiz("Arts")}
                            >
                              Arts
                            </Button>
                          </div>
                          {quizResult && (
                            <p className="mt-4 font-medium">{quizResult}</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card className="mb-6 border-2 border-[#d4a373]">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2">Workshops & Awareness</h3>
                          <p className="mb-2">Watch recorded sessions from our partners:</p>
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
                      
                      {/* We'll add additional student tab content in the next implementation phase */}
                    </div>
                    
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-4">Your Journey</h3>
                      <div className="h-[300px] border-2 border-[#d4a373] rounded-lg bg-gray-100">
                        {/* Map will be implemented in the next phase */}
                        <div className="flex items-center justify-center h-full">
                          <p className="text-center text-gray-500">Map visualization coming soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
