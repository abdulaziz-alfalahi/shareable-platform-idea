
import React, { useState } from "react";
import RoleDashboardLayout, { DashboardTab, DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { TabsContent } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Calendar, LineChart, Eye, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data
const childData = {
  name: "Rashid Al Maktoum",
  grade: "12th Grade",
  school: "Emirates International School",
  recentAssessments: [
    { id: 1, subject: "Mathematics", score: 92, date: "2023-10-15" },
    { id: 2, subject: "Physics", score: 88, date: "2023-10-20" },
    { id: 3, subject: "Computer Science", score: 95, date: "2023-10-25" }
  ],
  upcomingEvents: [
    { id: 1, title: "Parent-Teacher Meeting", date: "2023-11-15", time: "4:00 PM" },
    { id: 2, title: "Career Fair", date: "2023-11-20", time: "10:00 AM" }
  ]
};

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const dashboardTabs: DashboardTab[] = [
    { value: "overview", label: "Overview" },
    { value: "academics", label: "Academics" },
    { value: "career", label: "Career Planning" },
    { value: "communication", label: "Communication" },
    { value: "resources", label: "Resources" }
  ];

  const dashboardMetrics: DashboardMetric[] = [
    { 
      label: "Academic Progress", 
      value: "92%", 
      change: "+3% this semester", 
      trend: "up", 
      icon: <GraduationCap className="w-4 h-4" />
    },
    { 
      label: "Courses Enrolled", 
      value: 6, 
      description: "Current semester", 
      icon: <BookOpen className="w-4 h-4" />
    },
    { 
      label: "Upcoming Events", 
      value: 2, 
      description: "Next: Parent-Teacher Meeting", 
      icon: <Calendar className="w-4 h-4" />
    },
    { 
      label: "Career Assessment", 
      value: "Completed", 
      description: "View recommended paths", 
      icon: <LineChart className="w-4 h-4" />
    }
  ];

  const dashboardActions = [
    {
      label: "View Student Profile",
      onClick: () => navigate("/student-dashboard"),
      icon: <Eye className="h-4 w-4" />
    },
    {
      label: "Message Teacher",
      onClick: () => setActiveTab("communication"),
      icon: <MessageSquare className="h-4 w-4" />,
      variant: "outline" as const
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab childData={childData} />;
      case "academics":
        return <AcademicsTab />;
      case "career":
        return <CareerPlanningTab />;
      case "communication":
        return <CommunicationTab />;
      case "resources":
        return <ResourcesTab />;
      default:
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Parent Dashboard"
      subtitle={`Monitoring ${childData.name}'s educational journey`}
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="parent"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

interface ChildDataProps {
  childData: {
    name: string;
    grade: string;
    school: string;
    recentAssessments: Array<{
      id: number;
      subject: string;
      score: number;
      date: string;
    }>;
    upcomingEvents: Array<{
      id: number;
      title: string;
      date: string;
      time: string;
    }>;
  };
}

const OverviewTab: React.FC<ChildDataProps> = ({ childData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Recent Assessments</h3>
      <div className="space-y-3">
        {childData.recentAssessments.map((assessment) => (
          <div key={assessment.id} className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
            <div>
              <p className="font-medium">{assessment.subject}</p>
              <p className="text-sm text-muted-foreground">Date: {assessment.date}</p>
            </div>
            <div className="bg-emirati-oasisGreen/10 px-3 py-1 rounded text-emirati-oasisGreen font-medium">
              {assessment.score}%
            </div>
          </div>
        ))}
      </div>
    </Card>
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        {childData.upcomingEvents.map((event) => (
          <div key={event.id} className="flex justify-between items-center p-3 bg-emirati-sandBeige/10 rounded">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {event.date} at {event.time}
              </p>
            </div>
            <Button variant="outline" size="sm">Add to Calendar</Button>
          </div>
        ))}
      </div>
    </Card>
    <Card className="p-4 md:col-span-2">
      <h3 className="text-lg font-medium mb-4">Student Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-emirati-sandBeige/10 rounded">
          <p className="text-sm text-muted-foreground">Student Name</p>
          <p className="font-medium">{childData.name}</p>
        </div>
        <div className="p-3 bg-emirati-sandBeige/10 rounded">
          <p className="text-sm text-muted-foreground">Grade Level</p>
          <p className="font-medium">{childData.grade}</p>
        </div>
        <div className="p-3 bg-emirati-sandBeige/10 rounded">
          <p className="text-sm text-muted-foreground">School</p>
          <p className="font-medium">{childData.school}</p>
        </div>
      </div>
    </Card>
  </div>
);

const AcademicsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Academic Performance</h2>
    <p>Detailed academic records and performance metrics will be displayed here.</p>
  </div>
);

const CareerPlanningTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Career Planning</h2>
    <p>Career assessment results and recommended pathways will be displayed here.</p>
  </div>
);

const CommunicationTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">School Communication</h2>
    <p>Messages and communication with teachers and school administrators will be displayed here.</p>
  </div>
);

const ResourcesTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Educational Resources</h2>
    <p>Supporting educational materials and resources will be displayed here.</p>
  </div>
);

export default ParentDashboard;
