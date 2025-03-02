
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"
import * as React from "react"

// Toast type definitions
export type ToastType = "default" | "advisor" | "recruiter" | "student" | "success" | "error" | "warning" | "info"

export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  type?: ToastType
  read?: boolean
}

export type Toast = Omit<ToasterToast, "id">

export interface ToastState {
  toasts: ToasterToast[]
}
