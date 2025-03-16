
import React, { useState, useEffect } from "react";
import Header from "@/components/home/Header";
import { adminDashboardData } from "@/data/adminMockData";
import TabNavigation from "@/components/admin/TabNavigation";
import { notifyAdmin } from "@/utils/notification";
import RoleNotifications from "@/components/notifications/RoleNotifications";
import { Bell, Users, Briefcase, GraduationCap } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [timeRange, setTimeRange] = useState("halfyear");
  
  // Demo notifications
  useEffect(() => {
    setTimeout(() => {
      notifyAdmin({
        title: "System Alert",
        description: "New user registration spike detected in the last hour",
      });
    }, 2500);

    setTimeout(() => {
      notifyAdmin({
        title: "Database Maintenance",
        description: "Scheduled maintenance in 2 hours",
      });
    }, 5000);
  }, []);

  // Prepare the necessary data for the admin dashboard
  const interviewsData = [
    { date: 'Jan 2025', Scheduled: 185, Completed: 142 },
    { date: 'Feb 2025', Scheduled: 192, Completed: 157 },
    { date: 'Mar 2025', Scheduled: 215, Completed: 178 },
    { date: 'Apr 2025', Scheduled: 238, Completed: 195 },
    { date: 'May 2025', Scheduled: 256, Completed: 215 },
    { date: 'Jun 2025', Scheduled: 275, Completed: 230 },
  ];

  // Column definitions for the tables in different tabs
  const pathColumns = [
    { key: 'path', label: 'Educational Path' },
    { key: 'studentsCount', label: 'Students', render: (value: number) => value.toLocaleString() },
    { key: 'growth', label: 'Growth', render: (value: number) => `${value}%` }
  ];

  const recruiterColumns = [
    { key: 'name', label: 'Company' },
    { key: 'openPositions', label: 'Open Positions' },
    { key: 'hires', label: 'Hires YTD' }
  ];

  const trainingColumns = [
    { key: 'name', label: 'Training Center' },
    { key: 'programs', label: 'Programs' },
    { key: 'enrollments', label: 'Enrollments' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/10">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emirati-desertRed">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <RoleNotifications 
              role="admin"
              showNotificationsPanel={showNotificationsPanel}
              setShowNotificationsPanel={setShowNotificationsPanel}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            adminDashboardData={adminDashboardData}
            interviewsData={interviewsData}
            pathColumns={pathColumns}
            recruiterColumns={recruiterColumns}
            trainingColumns={trainingColumns}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
