
import { toast } from "@/hooks/toast/use-toast";
import type { ToastType } from "@/hooks/toast/types";

export interface NotificationOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export const notify = ({ title, description, duration = 5000, type = "default" }: NotificationOptions) => {
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
  return notify({ ...options, type: "advisor" as const });
};

export const notifyRecruiter = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "recruiter" as const });
};

export const notifyStudent = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "student" as const });
};

export const notifySuccess = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "success" as const });
};

export const notifyError = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "error" as const });
};

export const notifyWarning = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "warning" as const });
};

export const notifyInfo = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "info" as const });
};
