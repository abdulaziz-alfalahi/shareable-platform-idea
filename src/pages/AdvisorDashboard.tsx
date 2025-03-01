
import React, { useState } from "react";
import { User, BarChart2, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import custom components
import StudentList from "@/components/advisor/StudentList";
import AnalyticsSection from "@/components/advisor/AnalyticsSection";
import ReportsSection from "@/components/advisor/ReportsSection";
import DashboardHeader from "@/components/advisor/DashboardHeader";
import DashboardFilters from "@/components/advisor/DashboardFilters";
import StudentDialogs from "@/components/advisor/StudentDialogs";

// Import utilities
import { getStatusBadgeVariant, getRiskBadgeVariant, formatDate } from "@/utils/advisorUtils";

// Import types and data
import { Student, FeedbackForm, GoalForm } from "@/types/student";
import { students, performanceData } from "@/data/mockData";

const AdvisorDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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
    toast({
      title: "Feedback Added",
      description: `Feedback has been added for ${selectedStudent?.name}.`
    });
    setIsAddFeedbackDialogOpen(false);
  };

  const handleSubmitGoal = () => {
    console.log("Submitting goal:", goalForm);
    toast({
      title: "Goal Added",
      description: `A new goal has been added for ${selectedStudent?.name}.`
    });
    setIsAddGoalDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <DashboardHeader title="Advisor Dashboard" />

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
          {activeTab === "students" && (
            <>
              <DashboardFilters 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                riskFilter={riskFilter}
                setRiskFilter={setRiskFilter}
              />
              
              <StudentList 
                students={students}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                riskFilter={riskFilter}
                setRiskFilter={setRiskFilter}
                onViewStudent={handleViewStudent}
                onAddFeedback={handleOpenAddFeedback}
                onAddGoal={handleOpenAddGoal}
                getStatusBadgeVariant={getStatusBadgeVariant}
                getRiskBadgeVariant={getRiskBadgeVariant}
                formatDate={formatDate}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsSection performanceData={performanceData} />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <ReportsSection />
        </TabsContent>
      </Tabs>

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
        getStatusBadgeVariant={getStatusBadgeVariant}
        getRiskBadgeVariant={getRiskBadgeVariant}
        formatDate={formatDate}
        onAddFeedback={handleOpenAddFeedback}
        onAddGoal={handleOpenAddGoal}
      />
    </div>
  );
};

export default AdvisorDashboard;
