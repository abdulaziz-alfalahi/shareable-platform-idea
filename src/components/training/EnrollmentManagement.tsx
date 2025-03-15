
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, GraduationCap, Award } from "lucide-react";
import { useToast } from "@/hooks/toast";
import { supabase } from "@/integrations/supabase/client";

interface EnrollmentProps {
  userId?: string;
}

// Mock data until connected to database
const mockEnrollments = [
  {
    id: "1",
    programName: "Advanced Digital Marketing",
    centerName: "Emirates Skills Hub",
    startDate: "2023-11-15",
    endDate: "2024-01-20",
    progress: 65,
    status: "in-progress",
  },
  {
    id: "2",
    programName: "Project Management Fundamentals",
    centerName: "UAE Career Development Center",
    startDate: "2023-12-05",
    endDate: "2024-02-15",
    progress: 30,
    status: "in-progress",
  },
  {
    id: "3",
    programName: "Introduction to Data Science",
    centerName: "Emirates Skills Hub",
    startDate: "2023-10-10",
    endDate: "2023-11-30",
    progress: 100,
    status: "completed",
  }
];

const EnrollmentManagement: React.FC<EnrollmentProps> = ({ userId }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("current");

  // Will be replaced with actual data fetch
  const enrollments = mockEnrollments;
  
  // Filter enrollments based on active tab
  const filteredEnrollments = enrollments.filter(enrollment => {
    if (activeTab === "current") return enrollment.status === "in-progress";
    if (activeTab === "completed") return enrollment.status === "completed";
    return true; // all tab
  });

  const handleDownloadCertificate = (enrollmentId: string) => {
    toast({
      title: "Certificate Download",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Training Programs</CardTitle>
        <CardDescription>
          Track your enrolled training programs and certificates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Programs</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredEnrollments.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No {activeTab} training programs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnrollments.map((enrollment) => (
                  <div 
                    key={enrollment.id} 
                    className="border rounded-lg p-4 hover:border-emirati-oasisGreen/30 transition-colors hover:shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-emirati-deepBrown">{enrollment.programName}</h3>
                        <p className="text-sm text-muted-foreground">{enrollment.centerName}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <div className="text-xs flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                            <Calendar className="h-3.5 w-3.5" />
                            {enrollment.startDate} to {enrollment.endDate}
                          </div>
                          <Badge 
                            className={
                              enrollment.status === "completed" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" 
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            }
                          >
                            {enrollment.status === "completed" ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                      </div>
                      
                      {enrollment.status === "completed" ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="whitespace-nowrap flex gap-1"
                          onClick={() => handleDownloadCertificate(enrollment.id)}
                        >
                          <Award className="h-4 w-4" /> Certificate
                        </Button>
                      ) : (
                        <div className="text-right">
                          <span className="block text-sm font-medium">
                            {enrollment.progress}% Complete
                          </span>
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full bg-emirati-oasisGreen rounded-full" 
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnrollmentManagement;
