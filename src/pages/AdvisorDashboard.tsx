
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Search, ChevronRight, Filter, Star, MessageSquare, 
  Calendar, Clock, FileText, User, GraduationCap, BookOpen,
  CheckCircle, XCircle, AlertCircle, BarChart2, Award, TrendingUp
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

// Sample data for students
const students = [
  {
    id: 1,
    name: "Ahmed Al-Farsi",
    program: "Computer Science",
    year: 3,
    gpa: 3.7,
    advisingStatus: "On Track",
    lastMeeting: "2025-02-15",
    nextMeeting: "2025-03-20",
    careerPath: "Software Development",
    progress: 85,
    riskLevel: "Low",
    flagged: false,
    notes: "Performing well in core classes. Expressed interest in AI specialization.",
    coursesCompleted: 24,
    totalCourses: 40,
    achievements: ["Dean's List (Fall 2024)", "Hackathon Winner", "Research Assistant"],
    goals: [
      { id: 1, title: "Complete AI project", deadline: "2025-04-15", status: "In Progress" },
      { id: 2, title: "Apply for summer internship", deadline: "2025-03-30", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-15", 
        type: "Academic", 
        content: "Excellent progress in programming courses. Consider taking more algorithm-focused electives.",
        advisor: "Dr. Sarah Johnson" 
      },
      { 
        id: 2, 
        date: "2025-01-10", 
        type: "Career", 
        content: "Recommended to build a portfolio showcasing projects. Connect with alumni in tech industry.",
        advisor: "Dr. Sarah Johnson" 
      }
    ]
  },
  {
    id: 2,
    name: "Fatima Al-Zaabi",
    program: "Business Administration",
    year: 2,
    gpa: 3.2,
    advisingStatus: "Needs Attention",
    lastMeeting: "2025-02-01",
    nextMeeting: "2025-03-05",
    careerPath: "Marketing",
    progress: 65,
    riskLevel: "Medium",
    flagged: true,
    notes: "Struggling with finance courses. Has requested additional resources.",
    coursesCompleted: 16,
    totalCourses: 40,
    achievements: ["Marketing Club President"],
    goals: [
      { id: 1, title: "Improve finance grade", deadline: "2025-05-10", status: "In Progress" },
      { id: 2, title: "Complete marketing certification", deadline: "2025-06-30", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-01", 
        type: "Academic", 
        content: "Needs to focus more on finance fundamentals. Recommended tutoring services.",
        advisor: "Dr. Mohammed Hassan" 
      }
    ]
  },
  {
    id: 3,
    name: "Omar Al-Suwaidi",
    program: "Mechanical Engineering",
    year: 4,
    gpa: 3.9,
    advisingStatus: "On Track",
    lastMeeting: "2025-02-20",
    nextMeeting: "2025-04-10",
    careerPath: "Automotive Engineering",
    progress: 95,
    riskLevel: "Low",
    flagged: false,
    notes: "Exceptional student. Working on senior design project with industry partner.",
    coursesCompleted: 36,
    totalCourses: 42,
    achievements: ["Engineering Excellence Award", "Internship at Automotive Company", "Academic Scholarship"],
    goals: [
      { id: 1, title: "Complete capstone project", deadline: "2025-05-15", status: "In Progress" },
      { id: 2, title: "Apply for graduate programs", deadline: "2025-04-01", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-20", 
        type: "Academic", 
        content: "Excellent technical skills. Encouraged to pursue graduate studies in automotive engineering.",
        advisor: "Dr. Ali Rahman" 
      },
      { 
        id: 2, 
        date: "2025-01-05", 
        type: "Career", 
        content: "Connected with alumni in the automotive industry. Resume review completed.",
        advisor: "Dr. Ali Rahman" 
      }
    ]
  },
  {
    id: 4,
    name: "Maryam Al-Mansouri",
    program: "Psychology",
    year: 3,
    gpa: 3.5,
    advisingStatus: "At Risk",
    lastMeeting: "2025-02-10",
    nextMeeting: "2025-03-01",
    careerPath: "Clinical Psychology",
    progress: 70,
    riskLevel: "High",
    flagged: true,
    notes: "Has missed several classes. Family issues affecting performance. Referred to student support services.",
    coursesCompleted: 20,
    totalCourses: 38,
    achievements: ["Research Assistant", "Volunteer at Counseling Center"],
    goals: [
      { id: 1, title: "Improve attendance", deadline: "2025-03-15", status: "In Progress" },
      { id: 2, title: "Complete research project", deadline: "2025-05-20", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-10", 
        type: "Academic", 
        content: "Discussed attendance issues. Created plan to catch up on missed work.",
        advisor: "Dr. Layla Khalid" 
      },
      { 
        id: 2, 
        date: "2025-02-10", 
        type: "Personal", 
        content: "Referred to counseling services for additional support with family situation.",
        advisor: "Dr. Layla Khalid" 
      }
    ]
  },
  {
    id: 5,
    name: "Khalid Al-Nahyan",
    program: "Finance",
    year: 2,
    gpa: 3.3,
    advisingStatus: "On Track",
    lastMeeting: "2025-02-05",
    nextMeeting: "2025-03-15",
    careerPath: "Investment Banking",
    progress: 60,
    riskLevel: "Low",
    flagged: false,
    notes: "Showing improvement in quantitative courses. Interested in investment banking internships.",
    coursesCompleted: 18,
    totalCourses: 40,
    achievements: ["Finance Club Member", "Trading Competition Finalist"],
    goals: [
      { id: 1, title: "Prepare for internship interviews", deadline: "2025-04-30", status: "In Progress" },
      { id: 2, title: "Complete Bloomberg Market Concepts", deadline: "2025-03-10", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-05", 
        type: "Academic", 
        content: "Good progress in financial accounting. Should focus more on financial modeling skills.",
        advisor: "Dr. Tariq Ahmad" 
      }
    ]
  },
  {
    id: 6,
    name: "Noura Al-Maktoum",
    program: "Public Health",
    year: 4,
    gpa: 3.8,
    advisingStatus: "On Track",
    lastMeeting: "2025-02-18",
    nextMeeting: "2025-04-05",
    careerPath: "Healthcare Administration",
    progress: 90,
    riskLevel: "Low",
    flagged: false,
    notes: "Strong academic performance. Working on senior thesis on healthcare policy.",
    coursesCompleted: 34,
    totalCourses: 40,
    achievements: ["Public Health Scholarship", "Research Publication", "Internship at Ministry of Health"],
    goals: [
      { id: 1, title: "Complete thesis research", deadline: "2025-04-20", status: "In Progress" },
      { id: 2, title: "Apply for graduate programs", deadline: "2025-05-15", status: "Not Started" }
    ],
    feedback: [
      { 
        id: 1, 
        date: "2025-02-18", 
        type: "Academic", 
        content: "Excellent thesis progress. Recommended additional research sources.",
        advisor: "Dr. Hessa Al-Jaber" 
      },
      { 
        id: 2, 
        date: "2025-01-20", 
        type: "Career", 
        content: "Discussed graduate program options. Recommended programs with healthcare policy focus.",
        advisor: "Dr. Hessa Al-Jaber" 
      }
    ]
  }
];

// Sample academic performance data
const performanceData = [
  { semester: "Fall 2023", averageGPA: 3.2 },
  { semester: "Spring 2024", averageGPA: 3.4 },
  { semester: "Summer 2024", averageGPA: 3.5 },
  { semester: "Fall 2024", averageGPA: 3.6 },
  { semester: "Spring 2025", averageGPA: 3.7 },
];

// Types for form state
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

  // Filter students based on search query and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || student.advisingStatus === statusFilter;
    const matchesRisk = riskFilter === "All" || student.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  // Handle viewing student details
  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setIsViewStudentDialogOpen(true);
  };

  // Handle opening add feedback dialog
  const handleOpenAddFeedback = (student: any) => {
    setSelectedStudent(student);
    setFeedbackForm({
      studentId: student.id,
      type: "Academic",
      content: ""
    });
    setIsAddFeedbackDialogOpen(true);
  };

  // Handle opening add goal dialog
  const handleOpenAddGoal = (student: any) => {
    setSelectedStudent(student);
    setGoalForm({
      studentId: student.id,
      title: "",
      deadline: ""
    });
    setIsAddGoalDialogOpen(true);
  };

  // Submit feedback
  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", feedbackForm);
    toast({
      title: "Feedback Added",
      description: `Feedback has been added for ${selectedStudent.name}.`
    });
    setIsAddFeedbackDialogOpen(false);
  };

  // Submit goal
  const handleSubmitGoal = () => {
    console.log("Submitting goal:", goalForm);
    toast({
      title: "Goal Added",
      description: `A new goal has been added for ${selectedStudent.name}.`
    });
    setIsAddGoalDialogOpen(false);
  };

  // Get appropriate status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "On Track": return "success";
      case "Needs Attention": return "warning";
      case "At Risk": return "destructive";
      default: return "default";
    }
  };

  // Get appropriate risk badge color
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "outline";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "outline";
    }
  };

  // Format date for display
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

        {/* Students Tab */}
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

        {/* Analytics Tab */}
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

        {/* Reports Tab */}
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

      {/* View Student Dialog */}
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
                              goal.status === "Completed" ? "success" :
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

      {/* Add Feedback Dialog */}
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
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback-content">Feedback Content</Label>
                <Textarea 
                  id="feedback-content"
                  value={feedbackForm.content}
                  onChange={(e) => setFeedbackForm({...feedbackForm, content: e.target.value})}
                  placeholder="Enter your feedback here..."
                  rows={5}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFeedbackDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitFeedback} disabled={!feedbackForm.content.trim()}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Goal Dialog */}
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
                  value={goalForm.title}
                  onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
                  placeholder="Enter goal title"
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
              <Button variant="outline" onClick={() => setIsAddGoalDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitGoal} 
                disabled={!goalForm.title.trim() || !goalForm.deadline}
              >
                Add Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdvisorDashboard;
