
import React, { useState } from "react";
import RoleDashboardLayout, { DashboardTab, DashboardMetric } from "@/components/dashboard/RoleDashboardLayout";
import { TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Users, Award, TrendingUp, PlusCircle, FileText, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data
const trainingData = {
  instituteName: "Emirates Skills Development Center",
  activePrograms: 12,
  totalStudents: 345,
  completionRate: 86,
  upcomingCourses: [
    { id: 1, title: "Advanced Cybersecurity", startDate: "2023-11-20", enrolledStudents: 24 },
    { id: 2, title: "AI for Business", startDate: "2023-11-25", enrolledStudents: 18 },
    { id: 3, title: "Project Management Professional", startDate: "2023-12-05", enrolledStudents: 30 }
  ]
};

const TrainingInstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const navigate = useNavigate();

  const dashboardTabs: DashboardTab[] = [
    { value: "programs", label: "Programs" },
    { value: "students", label: "Students" },
    { value: "assessments", label: "Assessments" },
    { value: "metrics", label: "Performance Metrics" },
    { value: "partners", label: "Industry Partners" }
  ];

  const dashboardMetrics: DashboardMetric[] = [
    { 
      label: "Active Programs", 
      value: trainingData.activePrograms, 
      change: "+2 this quarter", 
      trend: "up", 
      icon: <GraduationCap className="w-4 h-4" />
    },
    { 
      label: "Total Students", 
      value: trainingData.totalStudents, 
      change: "+45 this month", 
      trend: "up", 
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Completion Rate", 
      value: `${trainingData.completionRate}%`, 
      change: "+3% vs last quarter", 
      trend: "up", 
      icon: <Award className="w-4 h-4" />
    },
    { 
      label: "Placement Rate", 
      value: "72%", 
      description: "Graduates in relevant jobs", 
      icon: <Trending className="w-4 h-4" />
    }
  ];

  const dashboardActions = [
    {
      label: "Add Program",
      onClick: () => console.log("Add program clicked"),
      icon: <PlusCircle className="h-4 w-4" />
    },
    {
      label: "Reports",
      onClick: () => setActiveTab("metrics"),
      icon: <FileText className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Analytics",
      onClick: () => console.log("Analytics clicked"),
      icon: <BarChart2 className="h-4 w-4" />,
      variant: "secondary" as const
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "programs":
        return <ProgramsTab trainingData={trainingData} />;
      case "students":
        return <StudentsTab />;
      case "assessments":
        return <AssessmentsTab />;
      case "metrics":
        return <MetricsTab />;
      case "partners":
        return <PartnersTab />;
      default:
        return null;
    }
  };

  return (
    <RoleDashboardLayout
      title="Training Institute Dashboard"
      subtitle="Develop the skills of tomorrow's workforce"
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role="training"
      metrics={dashboardMetrics}
      actions={dashboardActions}
    >
      {renderTabContent()}
    </RoleDashboardLayout>
  );
};

interface TrainingDataProps {
  trainingData: {
    instituteName: string;
    activePrograms: number;
    totalStudents: number;
    completionRate: number;
    upcomingCourses: Array<{
      id: number;
      title: string;
      startDate: string;
      enrolledStudents: number;
    }>;
  };
}

const ProgramsTab: React.FC<TrainingDataProps> = ({ trainingData }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Training Programs</h2>
      <Button>Create New Program</Button>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upcoming Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingData.upcomingCourses.map((course) => (
          <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-emirati-desertRed">{course.title}</h4>
            <div className="mt-2 text-sm">
              <p>Start Date: {course.startDate}</p>
              <p>Enrolled: {course.enrolledStudents} students</p>
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Active Programs</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4].map((program) => (
                <tr key={program}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Program {program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">12 weeks</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{15 + program * 5} students</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const StudentsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Enrolled Students</h2>
    <p>Student enrollment and management interface will be displayed here.</p>
  </div>
);

const AssessmentsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Assessment Tools</h2>
    <p>Assessment creation and management tools will be displayed here.</p>
  </div>
);

const MetricsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
    <p>Program effectiveness and student outcome metrics will be displayed here.</p>
  </div>
);

const PartnersTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Industry Partners</h2>
    <p>Partner companies and collaboration opportunities will be displayed here.</p>
  </div>
);

export default TrainingInstituteDashboard;
