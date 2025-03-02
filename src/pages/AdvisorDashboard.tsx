
import React, { useState, useEffect } from "react";
import { User, BarChart2, FileText, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { notifyAdvisor, notifySuccess } from "@/utils/notification";

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
  const { toast, toasts, markAsRead } = useToast();
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

  // Demo notifications on component mount
  useEffect(() => {
    // Simulate notifications for demo purposes
    setTimeout(() => {
      notifyAdvisor({
        title: "Student at Risk",
        description: "Ahmed Al-Mansoori has missed 3 consecutive classes",
      });
    }, 2000);

    setTimeout(() => {
      notifyAdvisor({
        title: "Upcoming Meetings",
        description: "You have 3 student meetings scheduled for today",
      });
    }, 4000);
  }, []);

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

  const unreadNotificationsCount = toasts.filter(toast => !toast.read).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader title="Advisor Dashboard" />
        
        <div className="relative">
          <Button 
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </Button>
          
          {showNotificationsPanel && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border z-50">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {toasts.length > 0 ? (
                  <div className="divide-y">
                    {toasts.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-center gap-2">
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                          <h4 className="font-medium">{notification.title}</h4>
                        </div>
                        {notification.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
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
