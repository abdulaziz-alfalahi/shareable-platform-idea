
// Update imports and fix TypeScript issues
import { ToastType } from "@/hooks/toast/types";
import { useToast } from "@/hooks/toast";

// Helper function to create a notification
export const createNotification = (
  title: string,
  description: string,
  type: ToastType = "default"
) => {
  return {
    title,
    description,
    type,
  };
};

// Function to show a notification using toast
export const showNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string,
  type: ToastType = "default"
) => {
  toast({
    title,
    description,
    type,
  });
};

// Function to show an admin notification
export const showAdminNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "admin");
};

// Function to show an advisor notification
export const showAdvisorNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "advisor");
};

// Function to show a student notification
export const showStudentNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "student");
};

// Function to show a recruiter notification
export const showRecruiterNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "recruiter");
};

// Function to show a success notification
export const showSuccessNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "success");
};

// Function to show an error notification
export const showErrorNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "error");
};

// Function to show a warning notification
export const showWarningNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "warning");
};

// Function to show an info notification
export const showInfoNotification = (
  toast: ReturnType<typeof useToast>,
  title: string,
  description: string
) => {
  showNotification(toast, title, description, "info");
};
