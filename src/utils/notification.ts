
import { toast } from "@/hooks/toast/use-toast";
import type { ToastType } from "@/hooks/toast/types";

export interface NotificationOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export const notify = ({
  title,
  description,
  duration = 5000,
  type = "default" as ToastType, // Explicitly type the default value
}: NotificationOptions) => {
  try {
    return toast({
      title,
      description,
      duration,
      type,
    });
  } catch (error) {
    console.error("Failed to display toast:", error);
    // Optionally, you could provide a fallback notification mechanism here
  }
};

export const notifyAdvisor = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "advisor" as ToastType });
};

export const notifyRecruiter = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "recruiter" as ToastType });
};

export const notifyStudent = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "student" as ToastType });
};

export const notifySuccess = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "success" as ToastType });
};

export const notifyError = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "error" as ToastType });
};

export const notifyWarning = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "warning" as ToastType });
};

export const notifyInfo = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "info" as ToastType });
};
