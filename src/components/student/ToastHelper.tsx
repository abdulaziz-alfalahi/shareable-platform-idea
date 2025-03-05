
import { toast } from "@/hooks/toast";
import { ToastType } from "@/hooks/toast/types";

export const showToast = (title: string, description: string, type: string) => {
  toast({
    title,
    description,
    type: type as ToastType,
  });
};
