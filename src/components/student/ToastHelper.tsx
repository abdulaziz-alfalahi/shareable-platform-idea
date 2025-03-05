
import { toast } from "@/hooks/toast";
import { ToastType } from "@/hooks/toast/types";

export const showSuccessToast = (title: string, message: string) => {
  toast({
    title,
    description: message,
    type: "success" as ToastType
  });
};

export const showErrorToast = (title: string, message: string) => {
  toast({
    title,
    description: message,
    type: "error" as ToastType
  });
};
