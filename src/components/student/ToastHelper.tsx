
import { toast } from "@/hooks/toast";
import { ToastType } from "@/hooks/toast/types";

export const showStudentToast = (title: string, description: string, type: ToastType = "success") => {
  toast({
    title,
    description,
    type: type as ToastType,
  });
};
