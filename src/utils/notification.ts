
import { toast } from "@/hooks/toast"
import type { ToastType } from "@/hooks/toast/types"

interface NotificationOptions {
  title: string;
  description?: string;
  className?: string;
}

export const notify = (options: NotificationOptions, type: ToastType = "default") => {
  return toast({
    title: options.title,
    description: options.description,
    type,
    className: options.className
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
