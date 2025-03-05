
import { toast } from "sonner";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
  variant?: "default" | "destructive";
}

export const notifyDefault = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "default",
    type: "default" as ToastType, // Add explicit type cast
  });
};

export const notifySuccess = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "default",
    type: "success" as ToastType, // Add explicit type cast
  });
};

export const notifyError = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "destructive",
    type: "error" as ToastType, // Add explicit type cast
  });
};

export const notifyWarning = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "default",
    type: "warning" as ToastType, // Add explicit type cast
  });
};

export const notifyInfo = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "default",
    type: "info" as ToastType, // Add explicit type cast
  });
};

export const notifyNearMilestone = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for milestone notifications
    variant: options.variant || "default",
    type: "info" as ToastType, // Add explicit type cast
  });
};

export const notifyAchievement = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for achievement notifications
    variant: options.variant || "default",
    type: "success" as ToastType, // Add explicit type cast
  });
};

export const notifySocialShare = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 5000,
    variant: options.variant || "default",
    type: "info" as ToastType, // Add explicit type cast
  });
};

export const notifyMentorMatch = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
    variant: options.variant || "default",
    type: "success" as ToastType, // Add explicit type cast
  });
};

export const notifyMentorRequest = (options: NotificationOptions) => {
  toast(options.title, {
    description: options.description,
    duration: options.duration || 7000, // Longer duration for mentor notifications
    variant: options.variant || "default",
    type: "info" as ToastType, // Add explicit type cast
  });
};
