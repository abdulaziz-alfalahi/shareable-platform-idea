import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/toast";
import { notifyAdmin } from "@/utils/notification";
import RoleNotifications from "@/components/notifications/RoleNotifications";

const AdminDashboard = () => {
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  
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

  return (
    <div className="container mx-auto py-8">
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
      
      {/* Rest of the dashboard content */}
      <p className="text-gray-600">Welcome to the administrator dashboard. Here you can manage system settings, users, and view analytics.</p>
    </div>
  );
};

export default AdminDashboard;
