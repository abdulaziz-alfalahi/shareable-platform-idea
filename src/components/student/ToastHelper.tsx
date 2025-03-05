
import React from "react";
import { useToast } from "@/hooks/toast";
import { ToastType } from "@/hooks/toast/types";

export const showFeedbackAddedToast = (toast: any) => {
  toast({
    title: "Feedback Added",
    description: "New feedback has been added to your profile.",
    type: "success" as ToastType,
  });
};

export const showGoalAddedToast = (toast: any) => {
  toast({
    title: "Goal Added",
    description: "A new goal has been set for your career journey.",
    type: "success" as ToastType,
  });
};
