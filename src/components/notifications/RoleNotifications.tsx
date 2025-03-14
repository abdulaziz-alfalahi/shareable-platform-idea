
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";
import { 
  notifyRecruiter, 
  notifyAdvisor,
  notifyStudent,
  notifyAdmin 
} from "@/utils/notification";

export type UserRole = "student" | "recruiter" | "advisor" | "admin" | "parent" | "training" | "assessment";

interface RoleNotificationsProps {
  role: UserRole;
  showNotificationsPanel: boolean;
  setShowNotificationsPanel: (show: boolean) => void;
}

const getNotificationClass = (role: UserRole, read: boolean) => {
  if (read) return "";
  
  switch (role) {
    case "recruiter": return "bg-purple-50 dark:bg-purple-900/20";
    case "advisor": return "bg-blue-50 dark:bg-blue-900/20";
    case "student": return "bg-green-50 dark:bg-green-900/20";
    case "admin": return "bg-amber-50 dark:bg-amber-900/20";
    case "parent": return "bg-teal-50 dark:bg-teal-900/20";
    case "training": return "bg-indigo-50 dark:bg-indigo-900/20";
    case "assessment": return "bg-rose-50 dark:bg-rose-900/20";
    default: return "bg-gray-50 dark:bg-gray-900/20";
  }
};

const getDotColor = (role: UserRole) => {
  switch (role) {
    case "recruiter": return "bg-purple-500";
    case "advisor": return "bg-blue-500";
    case "student": return "bg-green-500";
    case "admin": return "bg-amber-500";
    case "parent": return "bg-teal-500";
    case "training": return "bg-indigo-500";
    case "assessment": return "bg-rose-500";
    default: return "bg-gray-500";
  }
};

const RoleNotifications: React.FC<RoleNotificationsProps> = ({
  role,
  showNotificationsPanel,
  setShowNotificationsPanel
}) => {
  const { toasts, markAsRead } = useToast();
  
  // Filter notifications based on user role
  const filteredToasts = toasts.filter(toast => {
    if (!toast.type) return true;
    
    // Match notifications to roles
    if (role === "recruiter" && toast.type === "recruiter") return true;
    if (role === "advisor" && toast.type === "advisor") return true;
    if (role === "student" && toast.type === "student") return true;
    if (role === "admin" && toast.type === "admin") return true;
    if (role === "parent" && toast.type === "student") return true; // Parents see student notifications
    if (role === "training" && (toast.type === "info" || toast.type === "success")) return true;
    if (role === "assessment" && (toast.type === "info" || toast.type === "success")) return true;
    
    // Show generic notifications to everyone
    if (toast.type === "default" || toast.type === "success" || toast.type === "error" || toast.type === "info") return true;
    
    return false;
  });

  const unreadNotificationsCount = filteredToasts.filter(toast => !toast.read).length;

  // Demo notifications for different roles
  useEffect(() => {
    if (role === "recruiter") {
      setTimeout(() => {
        notifyRecruiter({
          title: "New Application",
          description: "Sarah Johnson has applied for UI/UX Designer position",
        });
      }, 2500);
    } else if (role === "advisor") {
      setTimeout(() => {
        notifyAdvisor({
          title: "Student Progress Update",
          description: "Ahmed has completed 3 new skills this week",
        });
      }, 2500);
    } else if (role === "student") {
      setTimeout(() => {
        notifyStudent({
          title: "New Job Match",
          description: "A new job matching your skills is available",
        });
      }, 2500);
    } else if (role === "admin") {
      setTimeout(() => {
        notifyAdmin({
          title: "System Alert",
          description: "New user registration spike detected",
        });
      }, 2500);
    }
  }, [role]);

  return (
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
            {filteredToasts.length > 0 ? (
              <div className="divide-y">
                {filteredToasts.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${getNotificationClass(role, !!notification.read)}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center gap-2">
                      {!notification.read && <span className={`h-2 w-2 rounded-full ${getDotColor(role)}`}></span>}
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
  );
};

export default RoleNotifications;
