
import React from "react";
import { 
  Users, 
  Bird, 
  Compass, 
  Palmtree, 
  Gem,
  Award,
  Sun,
  Coffee,
  Ship,
  Sailboat,
  LandPlot,
  Mountain,
  MapPin,
  Star
} from "lucide-react";

type IconName = "users" | "eagle" | "compass" | "palm-tree" | "gem" | "award" | "sun" | "coffee" | 
                "ship" | "sailboat" | "land-plot" | "mountain" | "map-pin" | "star";

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
    case "sun": return <Sun className={className} />;
    case "coffee": return <Coffee className={className} />;
    case "ship": return <Ship className={className} />;
    case "sailboat": return <Sailboat className={className} />;
    case "land-plot": return <LandPlot className={className} />;
    case "mountain": return <Mountain className={className} />;
    case "map-pin": return <MapPin className={className} />;
    case "star": return <Star className={className} />;
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
    case "Heritage": return "traditions";
    case "Hospitality": return "events";
    case "Craftsmanship": return "creations";
    case "Navigation": return "journeys";
    default: return "milestones";
  }
};
