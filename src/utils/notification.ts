
import { ToastType } from "@/hooks/toast/types";

export const notifySuccess = (
  title: string, 
  description?: string
): ToastType => {
  return {
    title,
    description,
    variant: "default",
  };
};

export const notifyError = (
  title: string, 
  description?: string
): ToastType => {
  return {
    title,
    description,
    variant: "destructive",
  };
};
