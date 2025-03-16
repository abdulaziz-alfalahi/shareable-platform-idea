
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/toast";
import { UserRole } from "../types";
import { 
  notifyRecruiter, 
  notifyAdvisor,
  notifyStudent,
  notifyAdmin 
} from "@/utils/notification";

export const useRoleNotifications = (role: UserRole) => {
  const { toasts } = useToast();
  
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

  return {
    filteredToasts,
    unreadNotificationsCount
  };
};
