
import { toast } from "sonner";
import { ToastType } from "@/hooks/toast/types";

interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
}

export const notifyDefault = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "default" as ToastType,
  });
};

export const notifySuccess = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "success" as ToastType,
  });
};

export const notifyError = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "error" as ToastType,
  });
};

export const notifyWarning = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "warning" as ToastType,
  });
};

export const notifyInfo = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "info" as ToastType,
  });
};

export const notifyNearMilestone = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for milestone notifications
    type: "info" as ToastType,
  });
};

export const notifyAchievement = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for achievement notifications
    type: "success" as ToastType,
  });
};

export const notifySocialShare = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "info" as ToastType,
  });
};

export const notifyMentorMatch = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
    type: "success" as ToastType,
  });
};

export const notifyMentorRequest = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
    type: "info" as ToastType,
  });
};

// Add the missing notification functions for user roles
export const notifyRecruiter = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "recruiter" as ToastType,
  });
};

export const notifyAdvisor = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "advisor" as ToastType,
  });
};

export const notifyStudent = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "student" as ToastType,
  });
};

export const notifyAdmin = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    type: "admin" as ToastType,
  });
};
