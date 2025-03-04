
import { ToastType } from "@/hooks/toast/types";
import { toast } from "@/hooks/toast";

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
    type: "success" as ToastType,
  });
};

export const notifyError = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "error" as ToastType,
  });
};

export const notifyWarning = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "warning" as ToastType,
  });
};

export const notifyInfo = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "info" as ToastType,
  });
};

export const notifyAdmin = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "admin" as ToastType,
  });
};

export const notifyAdvisor = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "advisor" as ToastType,
  });
};

export const notifyStudent = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "student" as ToastType,
  });
};

export const notifyRecruiter = ({ title, description }: { title: string; description: string }) => {
  toast({
    title,
    description,
    type: "recruiter" as ToastType,
  });
};

// Function to show a notification using toast hook (for components)
export const showNotification = (
  toastHook: any,
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
