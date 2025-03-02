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
