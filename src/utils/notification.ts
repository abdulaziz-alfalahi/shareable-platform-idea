
import { ToastType } from "@/hooks/toast/types";
import { useToast, toast } from "@/hooks/toast";

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

// Higher-order functions that return notification functions
// These can be used without requiring the useToast hook directly
export const notifySuccess = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "success",
  });
};

export const notifyError = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "error",
  });
};

export const notifyWarning = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "warning",
  });
};

export const notifyInfo = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "info",
  });
};

export const notifyAdmin = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "admin",
  });
};

export const notifyAdvisor = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "advisor",
  });
};

export const notifyStudent = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "student",
  });
};

export const notifyRecruiter = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "recruiter",
  });
};

// Function to show a notification using toast hook (for components)
export const showNotification = (
  toastHook: ReturnType<typeof useToast>,
  title: string,
  description: string,
  type: ToastType = "default"
) => {
  toastHook.toast({
    title,
    description,
    type,
  });
};
