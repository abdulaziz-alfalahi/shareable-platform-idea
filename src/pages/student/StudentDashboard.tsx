
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "@/components/student/dashboard/tabs/OverviewTab";
import AssessmentsTab from "@/components/student/dashboard/tabs/AssessmentsTab";
import CoursesTab from "@/components/student/dashboard/tabs/CoursesTab";
import CareerPathTab from "@/components/student/dashboard/tabs/CareerPathTab";
import MentorsTab from "@/components/student/dashboard/tabs/MentorsTab";
import ScholarshipsTab from "@/components/student/dashboard/tabs/ScholarshipsTab";

const StudentDashboard: React.FC = () => {
  // Mock student data
  const student = {
    id: 1,
    name: "Ahmed Mohammed",
    email: "ahmed.m@example.com",
    avatar: "/images/avatars/ahmed.jpg",
    grade: "A",
    level: 3,
    progress: 75,
    completedCourses: 12,
    enrolledCourses: 4,
    // Add any other student properties needed by the components
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="career-path">Career Path</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab student={student} />
        </TabsContent>
        
        <TabsContent value="assessments">
          <AssessmentsTab />
        </TabsContent>
        
        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
        
        <TabsContent value="career-path">
          <CareerPathTab />
        </TabsContent>
        
        <TabsContent value="mentors">
          <MentorsTab />
        </TabsContent>
        
        <TabsContent value="scholarships">
          <ScholarshipsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
