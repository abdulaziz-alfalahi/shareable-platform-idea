
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  FileText, 
  Users, 
  BarChart, 
  Search, 
  Filter 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";

const AssessmentsTab = () => {
  const [activeTab, setActiveTab] = useState("assessments");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Assessment Tools</h2>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Assessment
        </Button>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assessments..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessments" className="space-y-4 mt-4">
          <Card className="border border-emirati-sandstone/30 hover:shadow-sm transition-all duration-200">
            <CardHeader className="bg-emirati-oasisGreen/5 border-b border-emirati-sandstone/20">
              <div className="flex justify-between">
                <CardTitle className="text-lg">Technical Skills Assessment</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
              <CardDescription>
                Comprehensive assessment of technical skills for IT professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempts:</span>
                  <span>142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Score:</span>
                  <span>76%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>May 10, 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-emirati-sandstone/20 gap-2 flex justify-end">
              <Button variant="outline" size="sm">
                <FileText className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Users className="mr-1 h-3 w-3" />
                Assign
              </Button>
              <Button 
                size="sm"
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-emirati-sandstone/30 hover:shadow-sm transition-all duration-200">
            <CardHeader className="bg-emirati-desertGold/5 border-b border-emirati-sandstone/20">
              <div className="flex justify-between">
                <CardTitle className="text-lg">Leadership Capacity Assessment</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
              <CardDescription>
                Evaluates leadership potential and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempts:</span>
                  <span>98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Score:</span>
                  <span>82%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>June 5, 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t border-emirati-sandstone/20 gap-2 flex justify-end">
              <Button variant="outline" size="sm">
                <FileText className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Users className="mr-1 h-3 w-3" />
                Assign
              </Button>
              <Button 
                size="sm"
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="mt-4">
          <Card className="border border-emirati-sandstone/30">
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
              <CardDescription>
                View and analyze student assessment results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select an assessment to view detailed results and analytics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4">
          <Card className="border border-emirati-sandstone/30">
            <CardHeader>
              <CardTitle>Assessment Analytics</CardTitle>
              <CardDescription>
                Analyze assessment performance and identify trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart className="h-12 w-12 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Create a new assessment tool for your students
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Assessment creation functionality will be implemented in a future update.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentsTab;
