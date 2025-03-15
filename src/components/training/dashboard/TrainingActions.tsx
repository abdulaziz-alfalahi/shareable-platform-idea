
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, BarChart2 } from "lucide-react";

interface TrainingActionsProps {
  onAddProgram: () => void;
  onViewReports: () => void;
  onViewAnalytics: () => void;
}

export const generateTrainingActions = (props: TrainingActionsProps) => {
  return [
    {
      label: "Add Program",
      onClick: props.onAddProgram,
      icon: <PlusCircle className="h-4 w-4" />
    },
    {
      label: "Reports",
      onClick: props.onViewReports,
      icon: <FileText className="h-4 w-4" />,
      variant: "outline" as const
    },
    {
      label: "Analytics",
      onClick: props.onViewAnalytics,
      icon: <BarChart2 className="h-4 w-4" />,
      variant: "secondary" as const
    }
  ];
};

const TrainingActions: React.FC<TrainingActionsProps> = (props) => {
  const actions = generateTrainingActions(props);
  
  return (
    <div className="flex items-center space-x-2">
      {actions.map((action, index) => (
        <Button 
          key={index} 
          variant={action.variant || "default"} 
          onClick={action.onClick}
          className="flex items-center gap-2"
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default TrainingActions;
