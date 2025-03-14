
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, GraduationCap, Building, Target } from "lucide-react";
import TrainingCenterForm from "@/components/data-entry/form/TrainingCenterForm";
import AssessmentCenterForm from "@/components/data-entry/form/AssessmentCenterForm";
import SchoolDataEntryForm from "@/components/data-entry/form/SchoolDataEntryForm";
import UniversityDataEntryForm from "@/components/data-entry/form/UniversityDataEntryForm";
import StudentForm from "@/components/data-entry/form/StudentForm";

const DataEntryPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Set initial tab based on location state or default to "students"
    if (location.state?.tab) {
      return location.state.tab;
    }
    return "students";
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-emirati-deepBlue mb-6">Data Entry</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="students" className="flex items-center">
            <School className="mr-2 h-4 w-4" />
            <span>Students</span>
          </TabsTrigger>
          <TabsTrigger value="schools" className="flex items-center">
            <School className="mr-2 h-4 w-4" />
            <span>Schools</span>
          </TabsTrigger>
          <TabsTrigger value="universities" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Universities</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            <span>Training</span>
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center">
            <Target className="mr-2 h-4 w-4" />
            <span>Assessment</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Records</CardTitle>
              <CardDescription>
                Enter student information, grades, and academic records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>School Data Entry</CardTitle>
              <CardDescription>
                Register school details and upload student grades and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SchoolDataEntryForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="universities">
          <Card>
            <CardHeader>
              <CardTitle>University Data Entry</CardTitle>
              <CardDescription>
                Register university programs, upload grades, reports, and training details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UniversityDataEntryForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Center Data Entry</CardTitle>
              <CardDescription>
                Register training centers and their offered programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrainingCenterForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessment">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Center Data Entry</CardTitle>
              <CardDescription>
                Register assessment centers and the types of assessments they offer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssessmentCenterForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataEntryPage;
