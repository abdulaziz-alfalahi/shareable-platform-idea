
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SkillGap {
  skill: string;
  demandScore: number;
  supplyScore: number;
  gap: number;
  trend: "increasing" | "decreasing" | "stable";
  sector: string;
}

interface SkillGapInsightsCardProps {
  data: SkillGap[];
  className?: string;
}

const SkillGapInsightsCard: React.FC<SkillGapInsightsCardProps> = ({ 
  data,
  className 
}) => {
  // Sort by gap size (descending)
  const sortedData = [...data].sort((a, b) => b.gap - a.gap);
  
  // Take top 5 for display
  const topGaps = sortedData.slice(0, 5);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Skill Gaps</CardTitle>
        <CardDescription>Largest gaps between market demand and candidate supply</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topGaps.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-sm">{item.skill}</span>
                  <Badge className="ml-2 bg-muted text-muted-foreground">{item.sector}</Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{item.gap}%</span>
                  {item.trend === "increasing" ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : item.trend === "decreasing" ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : null}
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Supply: {item.supplyScore}%</span>
                  <span>Demand: {item.demandScore}%</span>
                </div>
                <div className="flex h-2 bg-muted rounded overflow-hidden">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${item.supplyScore}%` }}
                  />
                  <div 
                    className="bg-transparent border-r-2 border-foreground" 
                    style={{ width: `${item.gap}%` }}
                  />
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${Math.max(0, 100 - item.supplyScore - item.gap)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapInsightsCard;
