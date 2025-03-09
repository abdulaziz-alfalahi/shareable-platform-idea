
import React from "react";
import { 
  Users, 
  Bird, 
  Compass, 
  Palmtree, 
  Gem,
  Award
} from "lucide-react";

type IconName = "users" | "eagle" | "compass" | "palm-tree" | "gem" | "award";

interface AchievementIconProps {
  iconName: string;
  className?: string;
}

export const AchievementIcon: React.FC<AchievementIconProps> = ({ 
  iconName, 
  className = "h-5 w-5" 
}) => {
  switch (iconName) {
    case "users": return <Users className={className} />;
    case "eagle": return <Bird className={className} />;
    case "compass": return <Compass className={className} />;
    case "palm-tree": return <Palmtree className={className} />;
    case "gem": return <Gem className={className} />;
    default: return <Award className={className} />;
  }
};

export const getLevelColor = (level: "Bronze" | "Silver" | "Gold") => {
  switch (level) {
    case "Bronze": return "bg-amber-500";
    case "Silver": return "bg-slate-400";
    case "Gold": return "bg-yellow-500";
    default: return "bg-primary";
  }
};

export const getProgressLabel = (category: string) => {
  switch (category) {
    case "Mentorship": return "mentees";
    case "Resilience": return "challenges";
    case "Leadership": return "discussions";
    case "Innovation": return "assessments";
    default: return "milestones";
  }
};
