
import { toast } from "@/hooks/toast/use-toast"
import { ToastType } from "@/hooks/toast/types"

interface NotificationOptions {
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

export const notify = ({ title, description, duration, type = "default" }: NotificationOptions) => {
  return toast({
    title,
    description,
    duration,
    type,
  })
}

export const notifyAdvisor = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "advisor" })
}

export const notifyRecruiter = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "recruiter" })
}

export const notifyStudent = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "student" })
}

export const notifySuccess = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "success" })
}

export const notifyError = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "error" })
}

export const notifyWarning = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "warning" })
}

export const notifyInfo = (options: Omit<NotificationOptions, "type">) => {
  return notify({ ...options, type: "info" })
}
