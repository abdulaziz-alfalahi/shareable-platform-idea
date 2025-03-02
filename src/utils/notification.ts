
export type NotificationType = "success" | "error" | "warning" | "info";

export const getNotificationClassNames = (type: NotificationType): string => {
  const baseClasses = "flex items-center p-3 mb-3 text-sm rounded-md";
  
  switch (type) {
    case "success":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "error":
      return `${baseClasses} bg-red-100 text-red-800`;
    case "warning":
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case "info":
      return `${baseClasses} bg-blue-100 text-blue-800`;
    default:
      return baseClasses;
  }
};

// Common notification functions for different user types
export interface NotificationData {
  title: string;
  description?: string;
}

// Function to create a success notification for any user type
export const notifySuccess = (data: NotificationData) => {
  console.log("Success notification:", data);
  // This would typically use the toast hook to display a notification
  // For now, we're just logging it
  return { type: "success" as NotificationType, ...data };
};

// Function to create a notification for recruiters
export const notifyRecruiter = (data: NotificationData) => {
  console.log("Recruiter notification:", data);
  // This would typically use the toast hook to display a notification
  // For now, we're just logging it
  return { type: "info" as NotificationType, ...data };
};

// Function to create a notification for advisors
export const notifyAdvisor = (data: NotificationData) => {
  console.log("Advisor notification:", data);
  // This would typically use the toast hook to display a notification
  // For now, we're just logging it
  return { type: "info" as NotificationType, ...data };
};

// Function to create a notification for students
export const notifyStudent = (data: NotificationData) => {
  console.log("Student notification:", data);
  // This would typically use the toast hook to display a notification
  // For now, we're just logging it
  return { type: "info" as NotificationType, ...data };
};
