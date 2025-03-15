
export type ToastType = 
  | "default"
  | "success"
  | "error"
  | "warning"
  | "destructive"
  | "info"
  | "celebratory" // New celebratory type for achievements
  | "advisor"
  | "recruiter"
  | "student"
  | "admin";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  read?: boolean;
  action?: React.ReactNode;
  className?: string;
  variant?: string;
}

export interface ToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  variant?: string;
  className?: string;
}

export type ToasterToast = Toast;

export interface ToastState {
  toasts: Toast[];
}
