
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PerformanceData } from "@/types/student";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

interface AnalyticsSectionProps {
  performanceData: PerformanceData[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ performanceData }) => {
  const [selectedProgram, setSelectedProgram] = useState<string>("All");

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

  return (
    <div>
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
    </div>
  );
};

export default AnalyticsSection;
