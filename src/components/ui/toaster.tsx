
import { useToast } from "@/hooks/toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Bell } from "lucide-react"
import { ToastType } from "@/hooks/toast/types"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, type, read, ...props }) {
        return (
          <Toast key={id} {...props} className={type ? undefined : props.className}>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                {!read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                {title && (
                  <ToastTitle className="flex items-center gap-2">
                    {type && type !== "default" && <Bell className="h-4 w-4" />}
                    {title}
                  </ToastTitle>
                )}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
