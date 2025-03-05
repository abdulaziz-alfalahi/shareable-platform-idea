
import { toast } from "@/hooks/toast";
import { ToastType } from "@/hooks/toast/types";

interface ToastProps {
  title: string;
  description: string;
}

export const notifySuccess = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "success" as ToastType,
  });
};

export const notifyError = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "error" as ToastType,
  });
};

export const notifyWarning = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "warning" as ToastType,
  });
};

export const notifyInfo = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "info" as ToastType,
  });
};

export const notifyDefault = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "default" as ToastType,
  });
};

export const notifyDescriptive = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "descriptive" as ToastType,
  });
};

export const notifyDestructive = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "destructive" as ToastType,
  });
};

export const notifyAction = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "action" as ToastType,
  });
};

export const notifyAdvisor = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "info" as ToastType,
  });
};

export const notifyRecruiter = ({ title, description }: ToastProps) => {
  toast({
    title,
    description,
    type: "info" as ToastType,
  });
};
