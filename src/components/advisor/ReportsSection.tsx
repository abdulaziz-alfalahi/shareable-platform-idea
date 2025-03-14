
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadCloud, FileText, BarChart2, PieChart } from "lucide-react";

const ReportsSection: React.FC = () => {
  const [reportType, setReportType] = useState("all");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Analytics</CardTitle>
          <CardDescription>Generate, customize and download detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="available">Available Reports</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Student Progress Summary
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Overview of all students' academic progress, goals, and advising status.
                      </p>
                    </div>
                    <Button>Generate Report</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last generated: 3 days ago • Available formats: PDF, Excel
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <BarChart2 className="h-5 w-5 mr-2 text-red-500" />
                        At-Risk Students
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed report of students needing intervention or additional support.
                      </p>
                    </div>
                    <Button>Generate Report</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last generated: 1 week ago • Available formats: PDF, Excel, CSV
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Advising Activity Log
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Summary of all advising sessions, feedback provided, and goals set.
                      </p>
                    </div>
                    <Button>Generate Report</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last generated: 2 days ago • Available formats: PDF, Excel
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-green-500" />
                        Program Completion Forecast
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Projections for program completion rates and graduation timelines.
                      </p>
                    </div>
                    <Button>Generate Report</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last generated: 2 weeks ago • Available formats: PDF, PowerPoint
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="at-risk">At-Risk Students</SelectItem>
                        <SelectItem value="high-performing">High Performing Students</SelectItem>
                        <SelectItem value="career-readiness">Career Readiness</SelectItem>
                        <SelectItem value="skills-gap">Skills Gap Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Range</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Format</label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="ppt">PowerPoint</SelectItem>
                        <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-3">Report Contents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="academic-progress" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="academic-progress" className="text-sm">Academic Progress</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="career-insights" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="career-insights" className="text-sm">Career Insights</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="advising-history" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="advising-history" className="text-sm">Advising History</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="skills-analysis" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="skills-analysis" className="text-sm">Skills Analysis</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="goals-tracking" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="goals-tracking" className="text-sm">Goals Tracking</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="recommendations" 
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="recommendations" className="text-sm">Recommendations</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center">
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Generate Custom Report
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSection;
