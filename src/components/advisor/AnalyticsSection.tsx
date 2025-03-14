
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PerformanceData } from "@/types/student";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

interface AnalyticsSectionProps {
  performanceData: PerformanceData[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ performanceData }) => {
  const [selectedProgram, setSelectedProgram] = useState<string>("All");
  const [selectedView, setSelectedView] = useState<string>("performance");
  
  // Process data for the GPA bar chart
  const gpaChartData = React.useMemo(() => {
    const filteredData = selectedProgram === "All" 
      ? performanceData 
      : performanceData.filter(d => d.program === selectedProgram);
    
    // Group by semester and calculate average GPA
    const semesters = Array.from(new Set(filteredData.map(d => d.semester)));
    
    return semesters.map(semester => {
      const semesterData = filteredData.filter(d => d.semester === semester);
      const averageGPA = semesterData.reduce((acc, d) => acc + d.averageGPA, 0) / semesterData.length;
      
      return {
        semester,
        averageGPA: parseFloat(averageGPA.toFixed(2))
      };
    });
  }, [performanceData, selectedProgram]);

  // Get unique programs for filter
  const programs = ["All", ...Array.from(new Set(performanceData.map(d => d.program)))];

  // Data for advising status distribution
  const advisingStatusData = [
    { name: "On Track", value: 3, color: "#16a34a" },  // Green
    { name: "Needs Attention", value: 1, color: "#f59e0b" },  // Amber
    { name: "At Risk", value: 1, color: "#dc2626" }  // Red
  ];

  // Program completion data
  const completionData = [
    { program: "Computer Science", completion: 82 },
    { program: "Business Administration", completion: 75 },
    { program: "Mechanical Engineering", completion: 88 },
    { program: "Psychology", completion: 79 },
    { program: "Finance", completion: 71 }
  ];

  // New: Skills assessment data for radar chart
  const skillsAssessmentData = [
    { skill: "Technical Knowledge", score: 80, fullMark: 100 },
    { skill: "Problem Solving", score: 75, fullMark: 100 },
    { skill: "Communication", score: 65, fullMark: 100 },
    { skill: "Teamwork", score: 90, fullMark: 100 },
    { skill: "Critical Thinking", score: 70, fullMark: 100 },
    { skill: "Leadership", score: 60, fullMark: 100 }
  ];

  // New: Career readiness trend
  const careerReadinessData = [
    { month: "Jan", readiness: 65 },
    { month: "Feb", readiness: 68 },
    { month: "Mar", readiness: 72 },
    { month: "Apr", readiness: 75 },
    { month: "May", readiness: 80 },
    { month: "Jun", readiness: 85 }
  ];

  return (
    <div>
      <div className="mb-6">
        <Tabs value={selectedView} onValueChange={setSelectedView}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Academic Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            <TabsTrigger value="career">Career Readiness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Student Performance Overview</CardTitle>
                      <CardDescription>Average GPA trends over semesters</CardDescription>
                    </div>
                    <select 
                      className="border rounded p-1 text-sm"
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                    >
                      {programs.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gpaChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 4]} />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'GPA']}
                          labelFormatter={(label) => `Semester: ${label}`}
                        />
                        <Legend />
                        <Bar 
                          dataKey="averageGPA" 
                          name="Average GPA" 
                          fill="#2c4a2e" 
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advising Status Distribution</CardTitle>
                  <CardDescription>Current student advising status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={advisingStatusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                          animationDuration={1000}
                        >
                          {advisingStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} Students`, 'Count']}
                        />
                        <Legend 
                          verticalAlign="bottom"
                          align="center"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Program Completion Rates</CardTitle>
                <CardDescription>Progress tracking across programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {completionData.map((item) => (
                    <div key={item.program}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{item.program}</span>
                        <span>{item.completion}%</span>
                      </div>
                      <Progress value={item.completion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Skills Assessment</CardTitle>
                  <CardDescription>Comprehensive skills evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={skillsAssessmentData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Skills"
                          dataKey="score"
                          stroke="#2c4a2e"
                          fill="#2c4a2e"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills Gap Analysis</CardTitle>
                  <CardDescription>Comparison between required skills and current level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillsAssessmentData.map((item) => (
                      <div key={item.skill}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>{item.skill}</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={item.score} className="h-2" />
                          {item.skill === "Communication" && (
                            <div className="absolute top-0 h-2 border-r-2 border-red-500" style={{ left: "75%" }}></div>
                          )}
                          {item.skill === "Leadership" && (
                            <div className="absolute top-0 h-2 border-r-2 border-red-500" style={{ left: "80%" }}></div>
                          )}
                        </div>
                        {item.skill === "Communication" && (
                          <div className="text-xs text-muted-foreground mt-1">Target: 75% | Gap: -10%</div>
                        )}
                        {item.skill === "Leadership" && (
                          <div className="text-xs text-muted-foreground mt-1">Target: 80% | Gap: -20%</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="career" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Readiness Trend</CardTitle>
                  <CardDescription>Student's progress towards career readiness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={careerReadinessData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="readiness" 
                          stroke="#2c4a2e" 
                          fill="#2c4a2e" 
                          fillOpacity={0.2}
                          name="Readiness Score"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Industry Alignment</CardTitle>
                  <CardDescription>Student's skill alignment with chosen industry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Technology Sector Alignment</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Digital Marketing Alignment</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Finance Sector Alignment</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Recommended Focus Areas:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                        <span>Gain practical experience in cloud technologies</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                        <span>Strengthen programming fundamentals</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        <span>Pursue relevant certifications</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsSection;
