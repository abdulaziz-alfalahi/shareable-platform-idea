
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgramsTab from "@/components/training/dashboard/tabs/ProgramsTab";
import StudentsTab from "@/components/training/dashboard/tabs/StudentsTab";
import AssessmentsTab from "@/components/training/dashboard/tabs/AssessmentsTab";
import MetricsTab from "@/components/training/dashboard/tabs/MetricsTab";
import PartnersTab from "@/components/training/dashboard/tabs/PartnersTab";

const TrainingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("programs");
  
  // Mock training data with required upcomingCourses property
  const trainingData = {
    programs: [
      { id: 1, name: "Web Development Fundamentals", enrolledStudents: 42, duration: "12 weeks" },
      { id: 2, name: "Data Science with Python", enrolledStudents: 38, duration: "10 weeks" },
      { id: 3, name: "UI/UX Design Principles", enrolledStudents: 25, duration: "8 weeks" },
    ],
    upcomingCourses: [
      { id: 1, title: "React Advanced", startDate: "2023-07-15", enrolledStudents: 28 },
      { id: 2, title: "Machine Learning Fundamentals", startDate: "2023-08-01", enrolledStudents: 35 },
      { id: 3, title: "Mobile App Development", startDate: "2023-07-20", enrolledStudents: 22 },
    ]
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Training Center Dashboard</h1>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="programs">
          <ProgramsTab trainingData={trainingData} />
        </TabsContent>
        
        <TabsContent value="students">
          <StudentsTab />
        </TabsContent>
        
        <TabsContent value="assessments">
          <AssessmentsTab />
        </TabsContent>
        
        <TabsContent value="metrics">
          <MetricsTab />
        </TabsContent>
        
        <TabsContent value="partners">
          <PartnersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingDashboard;
