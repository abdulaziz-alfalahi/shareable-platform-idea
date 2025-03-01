import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Star, Calendar, Clock, CheckCircle, Plus, MessageSquare, 
  GraduationCap, BookOpen, Award, TrendingUp, User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FeedbackDialog from "@/components/advisor/FeedbackDialog";
import GoalDialog from "@/components/advisor/GoalDialog";
import { Student, StudentGoal, StudentFeedback } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

// This would come from an API in a real app
import { students } from "@/data/mockData";

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [isAddFeedbackDialogOpen, setIsAddFeedbackDialogOpen] = useState(false);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    studentId: 0,
    type: "Academic",
    content: ""
  });
  const [goalForm, setGoalForm] = useState({
    studentId: 0,
    title: "",
    deadline: ""
  });

  useEffect(() => {
    // Find student by ID
    if (id) {
      const foundStudent = students.find(s => s.id === parseInt(id, 10));
      if (foundStudent) {
        setStudent(foundStudent);
        // Initialize forms with student ID
        setFeedbackForm({ ...feedbackForm, studentId: foundStudent.id });
        setGoalForm({ ...goalForm, studentId: foundStudent.id });
      } else {
        // Redirect if student not found
        toast({
          title: "Student Not Found",
          description: "The requested student profile could not be found.",
          variant: "destructive"
        });
        navigate("/advisor-dashboard");
      }
    }
  }, [id, navigate, toast]);

  const handleOpenAddFeedback = () => {
    if (student) {
      setFeedbackForm({
        studentId: student.id,
        type: "Academic",
        content: ""
      });
      setIsAddFeedbackDialogOpen(true);
    }
  };

  const handleOpenAddGoal = () => {
    if (student) {
      setGoalForm({
        studentId: student.id,
        title: "",
        deadline: ""
      });
      setIsAddGoalDialogOpen(true);
    }
  };

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", feedbackForm);
    toast({
      title: "Feedback Added",
      description: `Feedback has been added for ${student?.name}.`
    });
    setIsAddFeedbackDialogOpen(false);
    
    // In a real app, we would update the student data here
    // and refresh the student object
  };

  const handleSubmitGoal = () => {
    console.log("Submitting goal:", goalForm);
    toast({
      title: "Goal Added",
      description: `A new goal has been added for ${student?.name}.`
    });
    setIsAddGoalDialogOpen(false);
    
    // In a real app, we would update the student data here
    // and refresh the student object
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

  if (!student) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center h-[50vh]">
        <Card>
          <CardContent className="py-10 px-6">
            <div className="text-center space-y-3">
              <User className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="text-xl font-semibold">Loading student profile...</h2>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/advisor-dashboard")} 
          className="mr-4"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Student Profile</h1>
      </div>

      {/* Header Card with Basic Info */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                {student.flagged && (
                  <Badge variant="destructive">Flagged</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <Badge variant={getStatusBadgeVariant(student.advisingStatus) as any}>
                  {student.advisingStatus}
                </Badge>
                <Badge variant={getRiskBadgeVariant(student.riskLevel) as any}>
                  Risk: {student.riskLevel}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleOpenAddFeedback}>
                <MessageSquare className="mr-1 h-4 w-4" /> Add Feedback
              </Button>
              <Button variant="outline" onClick={handleOpenAddGoal}>
                <CheckCircle className="mr-1 h-4 w-4" /> Add Goal
              </Button>
              <Button variant="outline">
                <Calendar className="mr-1 h-4 w-4" /> Schedule Meeting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Academic Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Program</span>
                    <span className="font-medium">{student.program}</span>
                  </div>
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">{student.year}</span>
                  </div>
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">GPA</span>
                    <span className="font-medium">{student.gpa}</span>
                  </div>
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Career Path</span>
                    <span className="font-medium">{student.careerPath}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Degree Progress</span>
                    <span className="text-sm font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2 mb-1" />
                  <div className="text-xs text-center text-muted-foreground">
                    {student.coursesCompleted} of {student.totalCourses} courses completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {student.achievements.length > 0 ? (
                <div className="space-y-2">
                  {student.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <Star className="mr-2 h-4 w-4 mt-1 text-yellow-500 flex-shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No achievements recorded yet
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Last Meeting</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(student.lastMeeting)}
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Next Meeting</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(student.nextMeeting)}
                      </div>
                    </div>
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-1 h-4 w-4" /> Schedule New Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Two-thirds width */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advising Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md">
                {student.notes || "No advising notes available."}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Goals</CardTitle>
              <Button size="sm" onClick={handleOpenAddGoal}>
                <Plus className="h-4 w-4 mr-1" /> Add Goal
              </Button>
            </CardHeader>
            <CardContent>
              {student.goals.length > 0 ? (
                <div className="space-y-3">
                  {student.goals.map((goal) => (
                    <div key={goal.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <div className="text-sm text-muted-foreground mt-1">
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
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No goals set yet
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Feedback History</CardTitle>
              <Button size="sm" onClick={handleOpenAddFeedback}>
                <Plus className="h-4 w-4 mr-1" /> Add Feedback
              </Button>
            </CardHeader>
            <CardContent>
              {student.feedback.length > 0 ? (
                <div className="space-y-3">
                  {student.feedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">
                          {feedback.type} Feedback
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(feedback.date)}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{feedback.content}</p>
                      <div className="text-xs text-muted-foreground">
                        Provided by: {feedback.advisor}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No feedback recorded yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Dialog */}
      {student && (
        <FeedbackDialog
          student={student}
          isOpen={isAddFeedbackDialogOpen}
          onOpenChange={setIsAddFeedbackDialogOpen}
          feedbackForm={feedbackForm}
          setFeedbackForm={setFeedbackForm}
          onSubmit={handleSubmitFeedback}
        />
      )}

      {/* Goal Dialog */}
      {student && (
        <GoalDialog
          student={student}
          isOpen={isAddGoalDialogOpen}
          onOpenChange={setIsAddGoalDialogOpen}
          goalForm={goalForm}
          setGoalForm={setGoalForm}
          onSubmit={handleSubmitGoal}
        />
      )}
    </div>
  );
};

export default StudentProfile;
