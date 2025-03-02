
import React, { useState } from "react";
import { useToast } from "@/hooks/toast/use-toast";
import { notifySuccess } from "@/utils/notification";

// Import custom components
import DashboardHeader from "@/components/advisor/DashboardHeader";
import StudentDialogs from "@/components/advisor/StudentDialogs";
import NotificationsPanel from "@/components/advisor/NotificationsPanel";
import DashboardTabs from "@/components/advisor/DashboardTabs";
import DashboardDemoNotifications from "@/components/advisor/DashboardDemoNotifications";

// Import types and data
import { Student, FeedbackForm, GoalForm } from "@/types/student";
import { students, performanceData } from "@/data/mockData";

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewStudentDialogOpen, setIsViewStudentDialogOpen] = useState(false);
  const [isAddFeedbackDialogOpen, setIsAddFeedbackDialogOpen] = useState(false);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
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

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewStudentDialogOpen(true);
  };

  const handleOpenAddFeedback = (student: Student) => {
    setSelectedStudent(student);
    setFeedbackForm({
      studentId: student.id,
      type: "Academic",
      content: ""
    });
    setIsAddFeedbackDialogOpen(true);
  };

  const handleOpenAddGoal = (student: Student) => {
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
    notifySuccess({
      title: "Feedback Added",
      description: `Feedback has been added for ${selectedStudent?.name}.`
    });
    setIsAddFeedbackDialogOpen(false);
  };

  const handleSubmitGoal = () => {
    console.log("Submitting goal:", goalForm);
    notifySuccess({
      title: "Goal Added",
      description: `A new goal has been added for ${selectedStudent?.name}.`
    });
    setIsAddGoalDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <DashboardDemoNotifications />
      
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader title="Advisor Dashboard" />
        
        <NotificationsPanel 
          showNotificationsPanel={showNotificationsPanel}
          setShowNotificationsPanel={setShowNotificationsPanel}
        />
      </div>

      <DashboardTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        students={students}
        performanceData={performanceData}
        onViewStudent={handleViewStudent}
        onAddFeedback={handleOpenAddFeedback}
        onAddGoal={handleOpenAddGoal}
      />

      <StudentDialogs 
        selectedStudent={selectedStudent}
        isViewStudentDialogOpen={isViewStudentDialogOpen}
        setIsViewStudentDialogOpen={setIsViewStudentDialogOpen}
        isAddFeedbackDialogOpen={isAddFeedbackDialogOpen}
        setIsAddFeedbackDialogOpen={setIsAddFeedbackDialogOpen}
        isAddGoalDialogOpen={isAddGoalDialogOpen}
        setIsAddGoalDialogOpen={setIsAddGoalDialogOpen}
        feedbackForm={feedbackForm}
        setFeedbackForm={setFeedbackForm}
        goalForm={goalForm}
        setGoalForm={setGoalForm}
        handleSubmitFeedback={handleSubmitFeedback}
        handleSubmitGoal={handleSubmitGoal}
        getStatusBadgeVariant={(status: string) => status}
        getRiskBadgeVariant={(risk: string) => risk}
        formatDate={(dateString: string) => dateString}
        onAddFeedback={handleOpenAddFeedback}
        onAddGoal={handleOpenAddGoal}
      />
    </div>
  );
};

export default AdvisorDashboard;
