
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

export type ToastProps_ = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  read?: boolean;
  type?: ToastType;
};

export type Toast = ToastProps_;

export type ToastType = "default" | "success" | "error" | "warning" | "info" | "advisor" | "recruiter" | "student" | "admin";
