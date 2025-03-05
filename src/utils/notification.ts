
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
  });
};

export const notifySuccess = (options: NotificationOptions) => {
  toast.success(options.title, {
    description: options.description,
    duration: options.duration || 5000,
  });
};

export const notifyError = (options: NotificationOptions) => {
  toast.error(options.title, {
    description: options.description,
    duration: options.duration || 5000,
  });
};

export const notifyWarning = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    style: { backgroundColor: "var(--warning)", color: "var(--warning-foreground)" }
  });
};

export const notifyInfo = (options: NotificationOptions) => {
  toast.info(options.title, {
    description: options.description,
    duration: options.duration || 5000,
  });
};

export const notifyNearMilestone = (options: NotificationOptions) => {
  toast.info(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for milestone notifications
  });
};

export const notifyAchievement = (options: NotificationOptions) => {
  toast.success(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for achievement notifications
  });
};

export const notifySocialShare = (options: NotificationOptions) => {
  toast.info(options.title, {
    description: options.description,
    duration: options.duration || 5000,
  });
};

export const notifyMentorMatch = (options: NotificationOptions) => {
  toast.success(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
  });
};

export const notifyMentorRequest = (options: NotificationOptions) => {
  toast.info(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
  });
};

// Add the missing notification functions for user roles
export const notifyRecruiter = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    style: { borderLeft: "4px solid var(--purple-500)" }
  });
};

export const notifyAdvisor = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    style: { borderLeft: "4px solid var(--blue-500)" }
  });
};

export const notifyStudent = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    style: { borderLeft: "4px solid var(--green-500)" }
  });
};

export const notifyAdmin = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    style: { borderLeft: "4px solid var(--amber-500)" }
  });
};
