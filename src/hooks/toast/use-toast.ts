
import { useState, useEffect } from "react";
import { toast as sonnerToast } from "sonner";
import { ToastType } from "./types";

interface ToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export function toast({
  title,
  description,
  type = "default",
  duration = 5000,
}: ToastProps) {
  const toastOptions = {
    description,
    duration,
  };

  switch (type) {
    case "success":
      return sonnerToast.success(title, toastOptions);
    case "error":
      return sonnerToast.error(title, toastOptions);
    case "warning":
      return sonnerToast(title, {
        ...toastOptions,
        className: "warning-toast",
      });
    case "destructive":
      return sonnerToast.error(title, toastOptions);
    case "info":
      return sonnerToast.info(title, toastOptions);
    case "celebratory":
      // Special styling for achievements and celebrations
      return sonnerToast.success(title, {
        ...toastOptions,
        className: "celebratory-toast",
        icon: "🎉", // Celebration emoji
        duration: duration || 7000, // Longer default duration for celebrations
      });
    default:
      return sonnerToast(title, toastOptions);
  }
}

// React hook to manage toast states
export function useToast() {
  const [toasts, setToasts] = useState<string[]>([]);

  // Effect to clean up toast state if needed in a real implementation
  useEffect(() => {
    return () => {
      // Clean up logic if needed
    };
  }, []);

  return {
    toast,
    toasts,
  };
}
