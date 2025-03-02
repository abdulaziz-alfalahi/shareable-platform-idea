
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from "recharts";
import { Users, Briefcase, Calendar, UserCheck, UserX, UserPlus, TrendingUp } from "lucide-react";

// Mock data for the monitoring dashboard
const interviewData = [
  { month: "Jan", scheduled: 15, completed: 12, canceled: 3 },
  { month: "Feb", scheduled: 18, completed: 15, canceled: 3 },
  { month: "Mar", scheduled: 25, completed: 22, canceled: 3 },
  { month: "Apr", scheduled: 32, completed: 28, canceled: 4 },
  { month: "May", scheduled: 28, completed: 24, canceled: 4 },
  { month: "Jun", scheduled: 35, completed: 30, canceled: 5 },
];

const candidateStatusData = [
  { name: "Accepted", value: 124, color: "#16a34a" },
  { name: "Rejected", value: 87, color: "#dc2626" },
  { name: "In Process", value: 53, color: "#3b82f6" },
  { name: "On Hold", value: 29, color: "#f59e0b" },
];

const vacancyData = [
  { month: "Jan", open: 25, filled: 18 },
  { month: "Feb", open: 32, filled: 24 },
  { month: "Mar", open: 30, filled: 22 },
  { month: "Apr", open: 35, filled: 28 },
  { month: "May", open: 42, filled: 30 },
  { month: "Jun", open: 38, filled: 32 },
];

const advisorySessionsData = [
  { month: "Jan", sessions: 45 },
  { month: "Feb", sessions: 52 },
  { month: "Mar", sessions: 49 },
  { month: "Apr", sessions: 63 },
  { month: "May", sessions: 58 },
  { month: "Jun", sessions: 72 },
];

const userGrowthData = [
  { month: "Jan", students: 250, recruiters: 45, advisors: 15 },
  { month: "Feb", students: 280, recruiters: 48, advisors: 16 },
  { month: "Mar", students: 320, recruiters: 52, advisors: 18 },
  { month: "Apr", students: 350, recruiters: 55, advisors: 22 },
  { month: "May", students: 390, recruiters: 60, advisors: 25 },
  { month: "Jun", students: 420, recruiters: 65, advisors: 28 },
];

const statsCards = [
  { 
    title: "Total Jobseekers", 
    value: "420", 
    change: "+8.3%", 
    trend: "up", 
    icon: <Users className="h-8 w-8 text-blue-500" />,
    description: "Active students and graduates seeking employment"
  },
  { 
    title: "Open Vacancies", 
    value: "38", 
    change: "-9.5%", 
    trend: "down", 
    icon: <Briefcase className="h-8 w-8 text-purple-500" />,
    description: "Currently open positions across all companies"
  },
  { 
    title: "Interviews This Month", 
    value: "35", 
    change: "+25.0%", 
    trend: "up", 
    icon: <Calendar className="h-8 w-8 text-green-500" />,
    description: "Scheduled interviews for current month"
  },
  { 
    title: "Candidates Placed", 
    value: "124", 
    change: "+12.7%", 
    trend: "up", 
    icon: <UserCheck className="h-8 w-8 text-emerald-500" />,
    description: "Successfully employed candidates year-to-date"
  },
];

const MonitoringDashboard = () => {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Monitoring Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="interviews">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
          <TabsTrigger value="growth">Platform Growth</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interviews" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Trends</CardTitle>
                <CardDescription>Monthly interviews scheduled, completed, and canceled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                      <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                      <Bar dataKey="canceled" fill="#ff8042" name="Canceled" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advisory Sessions</CardTitle>
                <CardDescription>Monthly career advisory sessions conducted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={advisorySessionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3} 
                        name="Sessions"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="candidates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Status Distribution</CardTitle>
                <CardDescription>Overview of candidate placement outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={candidateStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {candidateStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} Candidates`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Candidate Performance</CardTitle>
                  <CardDescription>Detailed analytics of candidate placement</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Placement Success Rate</p>
                      <p className="text-sm font-medium">58.9%</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "58.9%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Interview to Offer Ratio</p>
                      <p className="text-sm font-medium">42.3%</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "42.3%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">Offer Acceptance Rate</p>
                      <p className="text-sm font-medium">89.7%</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "89.7%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">90-Day Retention</p>
                      <p className="text-sm font-medium">94.2%</p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94.2%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="vacancies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vacancy Trends</CardTitle>
                <CardDescription>Open vs. filled positions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vacancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="open" 
                        stroke="#8884d8" 
                        name="Open Positions" 
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="filled" 
                        stroke="#82ca9d" 
                        name="Filled Positions" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Vacancy Metrics</CardTitle>
                  <CardDescription>Key performance indicators for job vacancies</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Vacancy Distribution by Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <p className="text-sm flex-1">Full-time</p>
                        <p className="text-sm font-medium">65%</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-sm flex-1">Part-time</p>
                        <p className="text-sm font-medium">15%</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <p className="text-sm flex-1">Contract</p>
                        <p className="text-sm font-medium">12%</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                        <p className="text-sm flex-1">Remote</p>
                        <p className="text-sm font-medium">8%</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Time-to-Fill Statistics (Days)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Average</p>
                        <p className="text-xl font-bold">38</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Median</p>
                        <p className="text-xl font-bold">32</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Tech Roles</p>
                        <p className="text-xl font-bold">45</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Non-Tech</p>
                        <p className="text-xl font-bold">30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform User Growth</CardTitle>
                <CardDescription>Growth of different user types over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="students" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Students"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="recruiters" 
                        stackId="1"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Recruiters"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="advisors" 
                        stackId="1"
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        name="Advisors"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Key platform usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Daily Active Users</h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">245</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        +18.2%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Average Session Duration</h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">14m 32s</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        +2.4%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Interactions per Session</h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">8.3</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        +5.1%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Monthly Active Users</h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold mr-2">1,834</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        +12.7%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringDashboard;
