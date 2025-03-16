
import { UserRole } from "../types";

export const getNotificationClass = (role: UserRole, read: boolean): string => {
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

export const getDotColor = (role: UserRole): string => {
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
