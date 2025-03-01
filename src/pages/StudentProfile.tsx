
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/types/student";

// Custom components
import ProfileHeader from "@/components/student/ProfileHeader";
import AcademicSidebar from "@/components/student/AcademicSidebar";
import NotesSection from "@/components/student/NotesSection";
import GoalsSection from "@/components/student/GoalsSection";
import FeedbackSection from "@/components/student/FeedbackSection";
import FeedbackDialog from "@/components/advisor/FeedbackDialog";
import GoalDialog from "@/components/advisor/GoalDialog";

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
      <ProfileHeader 
        student={student} 
        onAddFeedback={handleOpenAddFeedback} 
        onAddGoal={handleOpenAddGoal} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Academic Info */}
        <div>
          <AcademicSidebar student={student} />
        </div>

        {/* Right Column - Two-thirds width */}
        <div className="lg:col-span-2 space-y-6">
          <NotesSection notes={student.notes} />
          <GoalsSection student={student} onAddGoal={handleOpenAddGoal} />
          <FeedbackSection student={student} onAddFeedback={handleOpenAddFeedback} />
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
