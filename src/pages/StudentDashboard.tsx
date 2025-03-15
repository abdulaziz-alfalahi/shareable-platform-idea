import React, { useState } from "react";
import RoleDashboardLayout, { DashboardTab, DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { TabsContent } from "@/components/ui/tabs";
import { BookOpen, Trophy, Users, Calendar, PlusCircle, FileText } from "lucide-react";
import PassportWidget from "@/components/passport/PassportWidget";
import LeaderboardCard from "@/components/passport/LeaderboardCard";
import { useNavigate } from "react-router-dom";
import { Student } from "@/types/student";

// Mock student data that conforms to the Student type
const studentData: Student = {
  id: 123,
  name: "Mohammed Al Mansoori",
  program: "Computer Science",
  year: 3,
  gradeLevel: "university-3",
  gpa: 3.75,
  advisingStatus: "On Track",
  riskLevel: "Low",
  progress: 65,
  lastMeeting: "2023-10-10",
  nextMeeting: "2023-11-15",
  careerPath: "Software Engineering",
  flagged: false,
  coursesCompleted: 12,
  totalCourses: 32,
  achievements: ["Dean's List 2023", "Hackathon Winner"],
  notes: "Mohammed is making excellent progress in his studies.",
  goals: [],
  feedback: [],
  passportStamps: [],
  careerMilestones: [],
  passportLevel: 3,
  totalPoints: 3620,
  leaderboardRank: 4,
  inProgressCourses: 3,
  nextAssessment: "2023-11-15T13:00:00"
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const dashboardTabs: DashboardTab[] = [
    { value: "overview", label: "Overview" },
    { value: "courses", label: "Courses" },
    { value: "assessments", label: "Assessments" },
    { value: "career", label: "Career Path" },
    { value: "mentors", label: "Mentors" }
  ];

  const dashboardMetrics: DashboardMetric[] = [
    { 
      label: "Courses Completed", 
      value: studentData.coursesCompleted, 
      change: "+2 this month", 
      trend: "up", 
      icon: <BookOpen className="w-4 h-4" />
    },
    { 
      label: "Passport Level", 
      value: studentData.passportLevel, 
      description: `${studentData.totalPoints} total points`, 
      icon: <Trophy className="w-4 h-4" />
    },
    { 
      label: "Active Mentors", 
      value: 2, 
      change: "1 new connection", 
      trend: "up", 
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Next Assessment", 
      value: "In 3 days", 
      description: "Programming Skills",
      icon: <Calendar className="w-4 h-4" />
    }
  ];

  const dashboardActions = [
    {
      label: "New Course",
      onClick: () => navigate("/educational-resources"),
      icon: <PlusCircle className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Resume",
      onClick: () => navigate("/resume-builder"),
      icon: <FileText className="h-4 w-4" />
    }
  ];

  const leaderboardData = [
    { name: "Ahmed M.", score: 4250, position: 1 },
    { name: "Fatima K.", score: 3980, position: 2 },
    { name: "Mohammed A.", score: 3780, position: 3 },
    { name: studentData.name, score: studentData.totalPoints, position: studentData.leaderboardRank, isCurrentUser: true },
    { name: "Omar S.", score: 3450, position: 5 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                <PassportWidget student={studentData} />
                <UpcomingAssessments />
              </div>
            </div>
            <div>
              <LeaderboardCard 
                data={leaderboardData}
                title="Passport Leaderboard"
                description="Top achievers this month"
                category="Career Growth"
              />
            </div>
          </div>
        );
      case "courses":
        return <CoursesTab />;
      case "assessments":
        return <AssessmentsTab />;
      case "career":
        return <CareerPathTab />;
      case "mentors":
        return <MentorsTab />;
      default:
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Student Dashboard"
      subtitle="Welcome back, Mohammed. Continue your journey to excellence."
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="student"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

const UpcomingAssessments = () => (
  <div className="rounded-lg border p-4">
    <h3 className="text-lg font-medium mb-4">Upcoming Assessments</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
        <div>
          <p className="font-medium">Programming Skills Assessment</p>
          <p className="text-sm text-muted-foreground">Due in 3 days</p>
        </div>
        <button className="text-emirati-oasisGreen text-sm font-medium">Prepare</button>
      </div>
      <div className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
        <div>
          <p className="font-medium">Technical Interview Practice</p>
          <p className="text-sm text-muted-foreground">Due in 1 week</p>
        </div>
        <button className="text-emirati-oasisGreen text-sm font-medium">Schedule</button>
      </div>
    </div>
  </div>
);

const CoursesTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Courses</h2>
    <p>Course content will be displayed here.</p>
  </div>
);

const AssessmentsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Assessments</h2>
    <p>Assessment details will be displayed here.</p>
  </div>
);

const CareerPathTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Career Pathway</h2>
    <p>Career path visualization will be displayed here.</p>
  </div>
);

const MentorsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">My Mentors</h2>
    <p>Mentor connections will be displayed here.</p>
  </div>
);

export default StudentDashboard;
