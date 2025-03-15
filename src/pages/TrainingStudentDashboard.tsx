
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Award, MessageSquare, TreePalm } from "lucide-react";
import EnrollmentManagement from "@/components/training/EnrollmentManagement";
import TrainingCalendar from "@/components/training/TrainingCalendar";
import CertificateGenerator from "@/components/training/CertificateGenerator";
import ProgramReviews from "@/components/training/ProgramReviews";
import { UaeGeometricPattern } from "@/components/ui/uae";

const TrainingStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("enrollments");

  return (
    <div className="container mx-auto py-8 px-4 relative">
      <div className="absolute right-0 top-0 w-full h-64 overflow-hidden -z-10 opacity-10">
        <UaeGeometricPattern type="dune" position="background" size="lg" className="w-full h-full" />
      </div>

      {/* Header with cultural styling */}
      <div className="mb-8 relative">
        <UaeGeometricPattern type="arabesque" position="corner" opacity={0.08} />
        
        <div className="relative py-2">
          <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2 font-serif">My Training Dashboard</h1>
          <h2 className="text-xl font-medium text-emirati-camelBrown mb-4 font-serif opacity-70">لوحة التدريب الخاصة بي</h2>
          <p className="text-gray-600">
            Manage your enrolled programs, view your schedule, and access certificates
          </p>
        </div>
        
        {/* Decorative divider inspired by UAE heritage */}
        <div className="h-1 bg-gradient-to-r from-transparent via-emirati-desertGold/50 to-transparent w-full my-4 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
            <TreePalm className="h-4 w-4 text-emirati-desertGold" />
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-emirati-sandBeige/50 border border-emirati-desertGold/20">
          <TabsTrigger value="enrollments" className="flex items-center data-[state=active]:bg-emirati-oasisGreen/10">
            <BookOpen className="h-4 w-4 mr-2" /> My Programs
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center data-[state=active]:bg-emirati-oasisGreen/10">
            <Calendar className="h-4 w-4 mr-2" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center data-[state=active]:bg-emirati-oasisGreen/10">
            <Award className="h-4 w-4 mr-2" /> Certificates
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center data-[state=active]:bg-emirati-oasisGreen/10">
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
      
      {/* Footer with UAE cultural element */}
      <div className="mt-12 text-center text-sm text-emirati-deepBrown/60 py-4 relative">
        <UaeGeometricPattern type="mashrabiya" position="divider" size="sm" className="mx-auto" />
        <p className="mt-2">"Seek knowledge from cradle to grave" - Arabic Proverb</p>
      </div>
    </div>
  );
};

export default TrainingStudentDashboard;
