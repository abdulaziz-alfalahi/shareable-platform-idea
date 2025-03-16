
import { useState, useEffect } from "react";
import { toast as sonnerToast } from "sonner";
import { ToastType, Toast, ToastProps } from "./types";
import { actionTypes } from "./constants";
import { dispatch } from "./store";
import { genId } from "./store";

// The main toast function that integrates with sonner
export function toast({
  title,
  description,
  type = "default",
  duration = 5000,
  variant,
  className,
}: ToastProps) {
  const id = genId();
  
  const toastOptions = {
    description,
    duration,
    className,
  };

  // Add toast to internal state
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      id,
      title,
      description,
      type,
      duration,
      read: false,
      variant
    },
  });

  // Display using sonner
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
    case "advisor":
    case "recruiter":
    case "student":
    case "admin":
      // Role-based toasts
      return sonnerToast.info(title, {
        ...toastOptions,
        className: `${type}-toast`,
      });
    default:
      return sonnerToast(title, toastOptions);
  }
}

// React hook to manage toast states
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function handleChange(state: { toasts: Toast[] }) {
      setToasts(state.toasts || []);
    }

    // Direct import from store to avoid require() issues
    const unsubscribe = subscribe(handleChange);
    return unsubscribe;
  }, []);

  function markAsRead(id: string) {
    dispatch({
      type: actionTypes.MARK_AS_READ,
      toastId: id,
    });
  }

  return {
    toast,
    toasts,
    markAsRead,
  };
}

// Import directly from store.ts instead of using require()
import { subscribe } from "./store";
