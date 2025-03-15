
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Award, MessageSquare } from "lucide-react";
import EnrollmentManagement from "@/components/training/EnrollmentManagement";
import TrainingCalendar from "@/components/training/TrainingCalendar";
import CertificateGenerator from "@/components/training/CertificateGenerator";
import ProgramReviews from "@/components/training/ProgramReviews";

const TrainingStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("enrollments");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">My Training Dashboard</h1>
        <p className="text-gray-600">
          Manage your enrolled programs, view your schedule, and access certificates
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="enrollments" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" /> My Programs
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center">
            <Award className="h-4 w-4 mr-2" /> Certificates
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" /> Reviews
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollments">
          <EnrollmentManagement />
        </TabsContent>
        
        <TabsContent value="calendar">
          <TrainingCalendar />
        </TabsContent>
        
        <TabsContent value="certificates">
          <CertificateGenerator />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ProgramReviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingStudentDashboard;
