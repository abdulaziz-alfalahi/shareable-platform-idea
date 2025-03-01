
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Search, ChevronRight, Filter, Star, MessageSquare, 
  Calendar, Clock, FileText, User, GraduationCap, BookOpen,
  CheckCircle, XCircle, AlertCircle, BarChart2, Award, TrendingUp,
  Plus
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const students = [
  {
    id: 1,
    name: "Alex Johnson",
    program: "Computer Science",
    year: 3,
    gpa: 3.78,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 75,
    lastMeeting: "2023-09-15",
    nextMeeting: "2023-11-10",
    careerPath: "Software Engineering",
    flagged: false,
    coursesCompleted: 24,
    totalCourses: 32,
    achievements: [
      "Dean's List 2023",
      "Hackathon Winner",
      "Research Assistant"
    ],
    notes: "Alex is making excellent progress. Shows particular aptitude for machine learning concepts. Has expressed interest in graduate studies.",
    goals: [
      {
        id: 101,
        title: "Complete Internship Application",
        deadline: "2023-11-30",
        status: "In Progress"
      },
      {
        id: 102,
        title: "Research Graduate Programs",
        deadline: "2024-01-15",
        status: "Not Started"
      }
    ],
    feedback: [
      {
        id: 201,
        type: "Academic",
        date: "2023-09-15",
        content: "Strong performance in algorithm analysis. Should consider taking advanced AI courses next semester.",
        advisor: "Dr. Smith"
      }
    ]
  },
  {
    id: 2,
    name: "Taylor Rivera",
    program: "Business Administration",
    year: 2,
    gpa: 3.25,
    advisingStatus: "Needs Attention",
    riskLevel: "Medium",
    progress: 48,
    lastMeeting: "2023-08-22",
    nextMeeting: "2023-10-25",
    careerPath: "Marketing",
    flagged: true,
    coursesCompleted: 15,
    totalCourses: 32,
    achievements: [
      "Marketing Club President",
      "Case Competition Finalist"
    ],
    notes: "Taylor has good leadership skills but is struggling with quantitative courses. Has missed two appointments in the past semester.",
    goals: [
      {
        id: 103,
        title: "Improve Mathematics Grade",
        deadline: "2023-12-15",
        status: "In Progress"
      },
      {
        id: 104,
        title: "Join Business Analytics Project",
        deadline: "2023-11-05",
        status: "Completed"
      }
    ],
    feedback: [
      {
        id: 202,
        type: "Academic",
        date: "2023-08-22",
        content: "Struggling with Business Statistics. Recommended tutoring services.",
        advisor: "Prof. Johnson"
      },
      {
        id: 203,
        type: "Personal",
        date: "2023-07-10",
        content: "Discussed work-life balance strategies. Taylor is overcommitted to extracurriculars.",
        advisor: "Prof. Johnson"
      }
    ]
  },
  {
    id: 3,
    name: "Jordan Chen",
    program: "Mechanical Engineering",
    year: 4,
    gpa: 3.91,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 94,
    lastMeeting: "2023-09-05",
    nextMeeting: "2023-11-15",
    careerPath: "Aerospace Engineering",
    flagged: false,
    coursesCompleted: 30,
    totalCourses: 32,
    achievements: [
      "Engineering Scholar Award",
      "Research Publication",
      "NASA Internship"
    ],
    notes: "Jordan is an exceptional student ready for graduation. Has already received job offers from top aerospace companies.",
    goals: [
      {
        id: 105,
        title: "Complete Senior Project",
        deadline: "2023-12-01",
        status: "In Progress"
      },
      {
        id: 106,
        title: "Evaluate Job Offers",
        deadline: "2023-11-30",
        status: "In Progress"
      }
    ],
    feedback: [
      {
        id: 204,
        type: "Career",
        date: "2023-09-05",
        content: "Discussed job offers and career trajectory. Provided guidance on evaluating compensation packages.",
        advisor: "Dr. Martinez"
      }
    ]
  },
  {
    id: 4,
    name: "Morgan Williams",
    program: "Psychology",
    year: 1,
    gpa: 2.45,
    advisingStatus: "At Risk",
    riskLevel: "High",
    progress: 15,
    lastMeeting: "2023-09-20",
    nextMeeting: "2023-10-15",
    careerPath: "Clinical Psychology",
    flagged: true,
    coursesCompleted: 5,
    totalCourses: 32,
    achievements: [],
    notes: "Morgan is struggling with the transition to university. Has missed several classes and is at risk of academic probation.",
    goals: [
      {
        id: 107,
        title: "Improve Attendance",
        deadline: "2023-10-30",
        status: "Not Started"
      },
      {
        id: 108,
        title: "Meet with Academic Success Coach",
        deadline: "2023-10-10",
        status: "Not Started"
      }
    ],
    feedback: [
      {
        id: 205,
        type: "Academic",
        date: "2023-09-20",
        content: "Serious concerns about academic performance. Recommended academic probation intervention program.",
        advisor: "Dr. Patel"
      },
      {
        id: 206,
        type: "Personal",
        date: "2023-09-20",
        content: "Discussed personal challenges affecting academics. Referred to university counseling services.",
        advisor: "Dr. Patel"
      }
    ]
  },
  {
    id: 5,
    name: "Jamie Lee",
    program: "Finance",
    year: 3,
    gpa: 3.67,
    advisingStatus: "On Track",
    riskLevel: "Low",
    progress: 70,
    lastMeeting: "2023-08-30",
    nextMeeting: "2023-11-05",
    careerPath: "Investment Banking",
    flagged: false,
    coursesCompleted: 22,
    totalCourses: 32,
    achievements: [
      "Financial Analysis Competition Winner",
      "Investment Club Treasurer"
    ],
    notes: "Jamie shows strong analytical skills and leadership potential. Has secured a summer internship at Goldman Sachs.",
    goals: [
      {
        id: 109,
        title: "CFA Level 1 Preparation",
        deadline: "2024-02-15",
        status: "In Progress"
      },
      {
        id: 110,
        title: "Network with Alumni in Banking",
        deadline: "2023-12-01",
        status: "In Progress"
      }
    ],
    feedback: [
      {
        id: 207,
        type: "Career",
        date: "2023-08-30",
        content: "Excellent progress on career development. Discussed post-graduation options and MBA possibilities.",
        advisor: "Dr. Rodriguez"
      }
    ]
  }
];

const performanceData = [
  { program: "Computer Science", semester: "Fall 2022", averageGPA: 3.4 },
  { program: "Computer Science", semester: "Spring 2023", averageGPA: 3.5 },
  { program: "Computer Science", semester: "Fall 2023", averageGPA: 3.6 },
  { program: "Business Administration", semester: "Fall 2022", averageGPA: 3.2 },
  { program: "Business Administration", semester: "Spring 2023", averageGPA: 3.3 },
  { program: "Business Administration", semester: "Fall 2023", averageGPA: 3.1 },
  { program: "Mechanical Engineering", semester: "Fall 2022", averageGPA: 3.5 },
  { program: "Mechanical Engineering", semester: "Spring 2023", averageGPA: 3.6 },
  { program: "Mechanical Engineering", semester: "Fall 2023", averageGPA: 3.7 },
  { program: "Psychology", semester: "Fall 2022", averageGPA: 3.3 },
  { program: "Psychology", semester: "Spring 2023", averageGPA: 3.4 },
  { program: "Psychology", semester: "Fall 2023", averageGPA: 3.2 },
  { program: "Finance", semester: "Fall 2022", averageGPA: 3.4 },
  { program: "Finance", semester: "Spring 2023", averageGPA: 3.5 },
  { program: "Finance", semester: "Fall 2023", averageGPA: 3.3 }
];

interface FeedbackForm {
  studentId: number;
  type: string;
  content: string;
}

interface GoalForm {
  studentId: number;
  title: string;
  deadline: string;
}

const AdvisorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isViewStudentDialogOpen, setIsViewStudentDialogOpen] = useState(false);
  const [isAddFeedbackDialogOpen, setIsAddFeedbackDialogOpen] = useState(false);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    studentId: 0,
    type: "Academic",
    content: ""
  });
  const [goalForm, setGoalForm] = useState<GoalForm>({
    studentId: 0,
    title: "",
    deadline: ""
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || student.advisingStatus === statusFilter;
    const matchesRisk = riskFilter === "All" || student.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setIsViewStudentDialogOpen(true);
  };

  const handleOpenAddFeedback = (student: any) => {
    setSelectedStudent(student);
    setFeedbackForm({
      studentId: student.id,
      type: "Academic",
      content: ""
    });
    setIsAddFeedbackDialogOpen(true);
  };

  const handleOpenAddGoal = (student: any) => {
    setSelectedStudent(student);
    setGoalForm({
      studentId: student.id,
      title: "",
      deadline: ""
    });
    setIsAddGoalDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", feedbackForm);
    toast({
      title: "Feedback Added",
      description: `Feedback has been added for ${selectedStudent.name}.`
    });
    setIsAddFeedbackDialogOpen(false);
  };

  const handleSubmitGoal = () => {
    console.log("Submitting goal:", goalForm);
    toast({
      title: "Goal Added",
      description: `A new goal has been added for ${selectedStudent.name}.`
    });
    setIsAddGoalDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "On Track": return "default";
      case "Needs Attention": return "secondary";
      case "At Risk": return "destructive";
      default: return "default";
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "outline";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mr-4"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="students">
            <User className="mr-2 h-4 w-4" /> Student Management
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="On Track">On Track</SelectItem>
                  <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                  <SelectItem value="At Risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={riskFilter}
                onValueChange={setRiskFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Risk Levels</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className={`overflow-hidden ${student.flagged ? 'border-red-300' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold">{student.name}</h3>
                        {student.flagged && (
                          <Badge variant="destructive" className="ml-2">Flagged</Badge>
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 md:gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <GraduationCap className="mr-1 h-4 w-4" /> {student.program}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" /> Year {student.year}
                        </div>
                        <div className="flex items-center">
                          <Award className="mr-1 h-4 w-4" /> GPA: {student.gpa}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4" /> {student.careerPath}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>{student.advisingStatus}</Badge>
                        <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>Risk: {student.riskLevel}</Badge>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>

                      <div className="mt-3 text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="mr-1 h-4 w-4" /> 
                          <span className="mr-1 font-medium">Last Meeting:</span> {formatDate(student.lastMeeting)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" /> 
                          <span className="mr-1 font-medium">Next Meeting:</span> {formatDate(student.nextMeeting)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <Button onClick={() => handleViewStudent(student)}>
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => handleOpenAddFeedback(student)}>
                        <MessageSquare className="mr-1 h-4 w-4" /> Add Feedback
                      </Button>
                      <Button variant="outline" onClick={() => handleOpenAddGoal(student)}>
                        <CheckCircle className="mr-1 h-4 w-4" /> Add Goal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
                <CardDescription>Average GPA trends over semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Bar chart visualization would be displayed here
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advising Status Distribution</CardTitle>
                <CardDescription>Current student advising status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Pie chart visualization would be displayed here
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Program Completion Rates</CardTitle>
              <CardDescription>Progress tracking across programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Computer Science</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Business Administration</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Mechanical Engineering</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Psychology</span>
                    <span>79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Finance</span>
                    <span>71%</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Generate and download student reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium">Student Progress Summary</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Overview of all students' academic progress, goals, and advising status.
                    </p>
                    <Button>Generate Report</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium">At-Risk Students</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Detailed report of students needing intervention or additional support.
                    </p>
                    <Button>Generate Report</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium">Advising Activity Log</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Summary of all advising sessions, feedback provided, and goals set.
                    </p>
                    <Button>Generate Report</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium">Program Completion Forecast</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Projections for program completion rates and graduation timelines.
                    </p>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedStudent && (
        <Dialog open={isViewStudentDialogOpen} onOpenChange={setIsViewStudentDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Student Profile: {selectedStudent.name}</DialogTitle>
              <DialogDescription>
                Comprehensive view of student's academic progress and advising history
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Program Details</h3>
                    <div className="mt-1 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Program:</span>
                        <span>{selectedStudent.program}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{selectedStudent.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPA:</span>
                        <span>{selectedStudent.gpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={getStatusBadgeVariant(selectedStudent.advisingStatus) as any}>
                          {selectedStudent.advisingStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Risk Level:</span>
                        <Badge variant={getRiskBadgeVariant(selectedStudent.riskLevel) as any}>
                          {selectedStudent.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Career Path:</span>
                        <span>{selectedStudent.careerPath}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Progress</h3>
                    <div className="mt-1">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Overall Progress</span>
                        <span>{selectedStudent.progress}%</span>
                      </div>
                      <Progress value={selectedStudent.progress} className="h-2 mb-2" />
                      <div className="text-sm text-center">
                        {selectedStudent.coursesCompleted} of {selectedStudent.totalCourses} courses completed
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Achievements</h3>
                    <div className="mt-1 space-y-1">
                      {selectedStudent.achievements.map((achievement: string, index: number) => (
                        <div key={index} className="flex items-center text-sm">
                          <Star className="mr-2 h-4 w-4 text-yellow-500" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Advising Notes</h3>
                    <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                      {selectedStudent.notes}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Goals</h3>
                    <div className="space-y-3">
                      {selectedStudent.goals.map((goal: any) => (
                        <div key={goal.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{goal.title}</h4>
                              <div className="text-sm text-muted-foreground">
                                Deadline: {formatDate(goal.deadline)}
                              </div>
                            </div>
                            <Badge variant={
                              goal.status === "Completed" ? "default" :
                              goal.status === "In Progress" ? "outline" : "secondary"
                            }>
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleOpenAddGoal(selectedStudent)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add New Goal
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Feedback History</h3>
                    <div className="space-y-3">
                      {selectedStudent.feedback.map((feedback: any) => (
                        <div key={feedback.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline">{feedback.type} Feedback</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(feedback.date)}
                            </span>
                          </div>
                          <p className="text-sm mb-1">{feedback.content}</p>
                          <div className="text-xs text-muted-foreground">
                            Provided by: {feedback.advisor}
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleOpenAddFeedback(selectedStudent)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add New Feedback
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium">Meeting Schedule</h3>
                    <div className="mt-2 space-y-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <div>
                              <div className="font-medium">Last Meeting</div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(selectedStudent.lastMeeting)}
                              </div>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <div>
                              <div className="font-medium">Next Meeting</div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(selectedStudent.nextMeeting)}
                              </div>
                            </div>
                          </div>
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedStudent && (
        <Dialog open={isAddFeedbackDialogOpen} onOpenChange={setIsAddFeedbackDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Feedback for {selectedStudent.name}</DialogTitle>
              <DialogDescription>
                Provide feedback and comments on the student's progress or performance
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select 
                  value={feedbackForm.type} 
                  onValueChange={(value) => setFeedbackForm({...feedbackForm, type: value})}
                >
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback-content">Feedback Content</Label>
                <Textarea 
                  id="feedback-content"
                  placeholder="Enter your feedback here..."
                  value={feedbackForm.content}
                  onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
                  className="min-h-[120px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFeedbackDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedStudent && (
        <Dialog open={isAddGoalDialogOpen} onOpenChange={setIsAddGoalDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Goal for {selectedStudent.name}</DialogTitle>
              <DialogDescription>
                Set a new academic or career goal for the student
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input 
                  id="goal-title"
                  placeholder="Enter goal title..."
                  value={goalForm.title}
                  onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-deadline">Deadline</Label>
                <Input 
                  id="goal-deadline"
                  type="date"
                  value={goalForm.deadline}
                  onChange={(e) => setGoalForm({...goalForm, deadline: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGoalDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdvisorDashboard;
