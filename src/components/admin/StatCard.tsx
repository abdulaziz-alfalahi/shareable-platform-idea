
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformMetric } from "@/types/admin";
import { 
  Users, Briefcase, GraduationCap, Building, 
  Award, Heart, UserPlus, BarChart2
} from "lucide-react";

interface StatCardProps {
  metric: PlatformMetric;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ metric, className }) => {
  const getIcon = () => {
    switch (metric.icon) {
      case "Users": return <Users className="h-5 w-5 text-primary" />;
      case "Briefcase": return <Briefcase className="h-5 w-5 text-primary" />;
      case "GraduationCap": return <GraduationCap className="h-5 w-5 text-primary" />;
      case "Building": return <Building className="h-5 w-5 text-primary" />;
      case "Award": return <Award className="h-5 w-5 text-primary" />;
      case "Heart": return <Heart className="h-5 w-5 text-primary" />;
      case "UserPlus": return <UserPlus className="h-5 w-5 text-primary" />;
      default: return <BarChart2 className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">{metric.name}</span>
          <div className="p-1.5 rounded-full bg-primary/10">
            {getIcon()}
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">
          {metric.value.toLocaleString()}
        </div>
        <div className={`text-xs flex items-center ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="mr-1">
            {metric.change >= 0 ? '↑' : '↓'}
          </span>
          <span>
            {Math.abs(metric.change)}% from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
