
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, LayoutDashboard, Users, Briefcase, GraduationCap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { adminDashboardData } from "@/data/adminMockData";

// Import custom components
import StatCard from "@/components/admin/StatCard";
import UserTypeTable from "@/components/admin/UserTypeTable";
import AgeDistributionChart from "@/components/admin/AgeDistributionChart";
import TimeSeriesChart from "@/components/admin/TimeSeriesChart";
import TopListTable from "@/components/admin/TopListTable";
import JobApplicationsChart from "@/components/admin/JobApplicationsChart";
import PlacementMetrics from "@/components/admin/PlacementMetrics";

const AdminDashboard = () => {
  const { toasts, markAsRead } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Interview data for the chart
  const interviewsData = [
    adminDashboardData.interviewsScheduled,
    adminDashboardData.interviewsCompleted
  ];

  // Configure columns for tables
  const pathColumns = [
    { key: "path", label: "Educational Path" },
    { 
      key: "studentsCount", 
      label: "Students", 
      render: (value: number) => value.toLocaleString() 
    },
    { 
      key: "growth", 
      label: "Growth", 
      render: (value: number) => (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          {value > 0 ? "+" : ""}{value}%
        </span>
      )
    }
  ];

  const recruiterColumns = [
    { key: "name", label: "Company" },
    { key: "openPositions", label: "Open Positions" },
    { key: "hires", label: "Hires" }
  ];

  const trainingColumns = [
    { key: "name", label: "Training Center" },
    { key: "programs", label: "Programs" },
    { key: "enrollments", label: "Enrollments" }
  ];

  const unreadNotificationsCount = toasts.filter(toast => !toast.read).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <LayoutDashboard className="mr-2 h-6 w-6" />
          Administrator Dashboard
        </h1>
        
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="halfyear">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Button 
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </Button>
            
            {showNotificationsPanel && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border z-50">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {toasts.length > 0 ? (
                    <div className="divide-y">
                      {toasts.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-center gap-2">
                            {!notification.read && <span className="h-2 w-2 rounded-full bg-amber-500"></span>}
                            <h4 className="font-medium">{notification.title}</h4>
                          </div>
                          {notification.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Platform Overview
          </TabsTrigger>
          <TabsTrigger value="students">
            <Users className="mr-2 h-4 w-4" /> Student Analysis
          </TabsTrigger>
          <TabsTrigger value="recruiters">
            <Briefcase className="mr-2 h-4 w-4" /> Recruiter & Job Metrics
          </TabsTrigger>
          <TabsTrigger value="training">
            <GraduationCap className="mr-2 h-4 w-4" /> Training & Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard metric={adminDashboardData.totalStudents} />
            <StatCard metric={adminDashboardData.totalRecruiters} />
            <StatCard metric={adminDashboardData.totalVacancies} />
            <StatCard metric={adminDashboardData.totalInternships} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <UserTypeTable userData={adminDashboardData.usersByType} />
            <TimeSeriesChart
              title="Platform Growth"
              description="New user registrations over time"
              data={adminDashboardData.registrationsOverTime}
              className="col-span-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimeSeriesChart
              title="Platform Engagement"
              description="Active users over time"
              data={adminDashboardData.activeUsersOverTime}
            />
            <TimeSeriesChart
              title="Interview Activity"
              data={interviewsData}
              colors={['#2c4a2e', '#6b9e76']}
              labels={['Scheduled', 'Completed']}
            />
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard metric={adminDashboardData.totalStudents} />
            <StatCard metric={adminDashboardData.totalAdvisors} />
            <StatCard metric={adminDashboardData.totalParents} />
            <StatCard metric={adminDashboardData.totalInternships} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <AgeDistributionChart data={adminDashboardData.studentsByAgeGroup} />
            <TopListTable
              title="Top Educational Paths"
              data={adminDashboardData.topEducationalPaths}
              columns={pathColumns}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimeSeriesChart
              title="Student Engagement"
              description="Active students over time"
              data={adminDashboardData.activeUsersOverTime}
            />
            <PlacementMetrics
              placementRate={adminDashboardData.placementRate}
              averageTimeToHire={adminDashboardData.averageTimeToHire}
            />
          </div>
        </TabsContent>

        <TabsContent value="recruiters" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard metric={adminDashboardData.totalRecruiters} />
            <StatCard metric={adminDashboardData.totalVacancies} />
            <StatCard metric={adminDashboardData.totalInternships} />
            <StatCard metric={{
              id: "placements",
              name: "Successful Placements",
              value: 624,
              change: 14.3,
              icon: "Award"
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <JobApplicationsChart data={adminDashboardData.jobApplicationsStatus} />
            <TopListTable
              title="Top Recruiters"
              data={adminDashboardData.topRecruiters}
              columns={recruiterColumns}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <TimeSeriesChart
              title="Interview Activity"
              data={interviewsData}
              colors={['#2c4a2e', '#6b9e76']}
              labels={['Scheduled', 'Completed']}
            />
          </div>
        </TabsContent>

        <TabsContent value="training" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard metric={adminDashboardData.totalTrainingCenters} />
            <StatCard metric={adminDashboardData.totalAssessmentCenters} />
            <StatCard metric={{
              id: "programs",
              name: "Active Programs",
              value: 156,
              change: 8.7,
              icon: "GraduationCap"
            }} />
            <StatCard metric={{
              id: "enrollments",
              name: "Enrollments",
              value: 8742,
              change: 12.4,
              icon: "Users"
            }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopListTable
              title="Top Training Centers"
              data={adminDashboardData.topTrainingCenters}
              columns={trainingColumns}
            />
            <TimeSeriesChart
              title="Training Enrollments"
              description="Monthly training program enrollments"
              data={adminDashboardData.registrationsOverTime}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
