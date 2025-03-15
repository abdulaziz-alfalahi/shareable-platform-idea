
import React, { useState } from "react";
import RoleDashboardLayout, { DashboardTab, DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { Target, Users, Calendar, FileSpreadsheet, PlusCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock data
const advisorData = {
  name: "Fatima Al Hashemi",
  specialization: "Technology & Engineering Careers",
  assignedStudents: 18,
  upcomingMeetings: 3,
  feedback: 24,
  completedAssessments: 72
};

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();

  const dashboardTabs: DashboardTab[] = [
    { value: "students", label: "My Students" },
    { value: "meetings", label: "Meetings" },
    { value: "feedback", label: "Feedback" },
    { value: "reports", label: "Reports" },
    { value: "resources", label: "Resources" }
  ];

  const dashboardMetrics: DashboardMetric[] = [
    { 
      label: "Assigned Students", 
      value: advisorData.assignedStudents, 
      change: "+2 new", 
      trend: "up", 
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Upcoming Meetings", 
      value: advisorData.upcomingMeetings, 
      description: "Next: Today at 3:00 PM", 
      icon: <Calendar className="w-4 h-4" />
    },
    { 
      label: "Pending Feedback", 
      value: 7, 
      change: "-2 this week", 
      trend: "down", 
      icon: <MessageSquare className="w-4 h-4" />
    },
    { 
      label: "Assessments", 
      value: advisorData.completedAssessments, 
      description: "Completed this year", 
      icon: <FileSpreadsheet className="w-4 h-4" />
    }
  ];

  const dashboardActions = [
    {
      label: "Schedule Meeting",
      onClick: () => console.log("Schedule meeting clicked"),
      icon: <Calendar className="h-4 w-4" />
    },
    {
      label: "Add Student",
      onClick: () => navigate("/student-dashboard"),
      icon: <PlusCircle className="h-4 w-4" />,
      variant: "outline" as const
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentsTab />;
      case "meetings":
        return <MeetingsTab />;
      case "feedback":
        return <FeedbackTab />;
      case "reports":
        return <ReportsTab />;
      case "resources":
        return <ResourcesTab />;
      default:
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Advisor Dashboard"
      subtitle="Guide students on their career journey"
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="advisor"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

// Tab contents
const StudentsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Students</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((student) => (
        <Card key={student} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-emirati-sandBeige/50 flex items-center justify-center">
              <Users className="w-6 h-6 text-emirati-desertRed" />
            </div>
            <div>
              <h3 className="font-medium">Student {student}</h3>
              <p className="text-sm text-muted-foreground">Computer Science, Year 3</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <span className="text-sm text-emirati-oasisGreen font-medium">Progress: 78%</span>
            <Button variant="link" size="sm" className="p-0">
              View Profile
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const MeetingsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Scheduled Meetings</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((meeting) => (
        <Card key={meeting} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Career Guidance Session</h3>
              <p className="text-sm text-muted-foreground">With Ahmed Al Mansouri</p>
              <p className="text-sm">Today at {3 + meeting}:00 PM</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button size="sm">Join</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const FeedbackTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Student Feedback</h2>
    <p>Feedback and assessment forms will be displayed here.</p>
  </div>
);

const ReportsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Progress Reports</h2>
    <p>Student progress reports and analytics will be displayed here.</p>
  </div>
);

const ResourcesTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Career Resources</h2>
    <p>Resources to share with students will be displayed here.</p>
  </div>
);

export default AdvisorDashboard;
