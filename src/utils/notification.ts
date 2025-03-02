
import { toast } from "@/hooks/toast"
import type { Toast } from "@/hooks/toast/types"

interface NotificationOptions {
  title: string;
  description?: string;
}

export const notify = (options: NotificationOptions, type: string = "default") => {
  return toast({
    title: options.title,
    description: options.description,
    type: type as any,
  });
};

export const notifyAdvisor = (options: NotificationOptions) => {
  return notify(options, "advisor");
};

export const notifyRecruiter = (options: NotificationOptions) => {
  return notify(options, "recruiter");
};

export const notifyStudent = (options: NotificationOptions) => {
  return notify(options, "student");
};

export const notifySuccess = (options: NotificationOptions) => {
  return notify(options, "success");
};

export const notifyError = (options: NotificationOptions) => {
  return notify(options, "error");
};

export const notifyWarning = (options: NotificationOptions) => {
  return notify(options, "warning");
};

export const notifyInfo = (options: NotificationOptions) => {
  return notify(options, "info");
};
