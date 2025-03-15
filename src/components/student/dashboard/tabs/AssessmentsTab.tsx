import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelfAssessmentTool from "../../assessment/SelfAssessmentTool";

const AssessmentsTab = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  
  const handleStartAssessment = (assessmentName: string) => {
    setSelectedAssessment(assessmentName);
    setShowSelfAssessment(true);
  };
  
  const handleBackToList = () => {
    setShowSelfAssessment(false);
    setSelectedAssessment(null);
  };
  
  if (showSelfAssessment && selectedAssessment) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={handleBackToList}
          className="mb-4"
        >
          ← Back to Assessments
        </Button>
        
        <SelfAssessmentTool
          assessmentName={selectedAssessment}
          onComplete={handleBackToList}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Assessments</h2>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4 mt-4">
          <Card className="border border-emirati-sandstone/30 hover:shadow-sm transition-all duration-200">
            <CardHeader className="bg-emirati-oasisGreen/5 border-b border-emirati-sandstone/20">
              <CardTitle className="text-lg">Skills Self-Assessment</CardTitle>
              <CardDescription>
                Evaluate your skills to identify areas for growth
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>15-20 minutes</span>
                </div>
                <Button 
                  onClick={() => handleStartAssessment("Skills Self-Assessment")}
                  className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                >
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-emirati-sandstone/30 hover:shadow-sm transition-all duration-200">
            <CardHeader className="bg-emirati-desertGold/5 border-b border-emirati-sandstone/20">
              <CardTitle className="text-lg">Technical Skills Assessment</CardTitle>
              <CardDescription>
                Evaluate your technical capabilities for the UAE job market
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>25-30 minutes</span>
                </div>
                <Button 
                  onClick={() => handleStartAssessment("Technical Skills Assessment")}
                  className="bg-emirati-desertGold hover:bg-emirati-desertGold/90"
                >
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <Card className="border border-emirati-sandstone/30">
            <CardHeader className="bg-emirati-deepBrown/5 border-b border-emirati-sandstone/20">
              <CardTitle className="text-lg">Leadership Potential Assessment</CardTitle>
              <CardDescription>
                Evaluate your leadership skills and potential
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Available in 3 days</span>
                </div>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <Card className="border border-emirati-sandstone/30">
            <CardHeader className="bg-gray-50 border-b border-emirati-sandstone/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Career Interests Assessment</CardTitle>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">Completed</span>
                </div>
              </div>
              <CardDescription>
                Career interests and aptitude evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>Completed on Mar 15, 2023</span>
                </div>
                <Button variant="outline">
                  View Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentsTab;
