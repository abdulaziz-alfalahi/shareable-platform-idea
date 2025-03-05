
import { ToastType } from "@/hooks/toast/types";

// Make sure string is assignable to ToastType
declare module "@/hooks/toast/types" {
  type ExtendedToastType = ToastType | string;
}
