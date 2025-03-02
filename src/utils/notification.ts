
import { toast } from "@/hooks/use-toast"

type NotificationType = "advisor" | "recruiter" | "student" | "success" | "error" | "warning" | "info" | "default"

interface NotificationOptions {
  title: string
  description?: string
  type?: NotificationType
  duration?: number
}

export const notify = ({ title, description, type = "info", duration }: NotificationOptions) => {
  return toast({
    title,
    description,
    type: type as any, // Force type compatibility
    duration,
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
