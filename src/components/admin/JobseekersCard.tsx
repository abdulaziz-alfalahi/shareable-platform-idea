
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JobseekerData } from "@/types/admin";
import { Progress } from "@/components/ui/progress";

interface JobseekersCardProps {
  data: JobseekerData[];
}

const JobseekersCard: React.FC<JobseekersCardProps> = ({ data }) => {
  // Calculate total jobseekers for percentage calculation
  const totalJobseekers = data.reduce((sum, category) => sum + category.count, 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Jobseekers by Category</CardTitle>
        <CardDescription>
          Active jobseekers and placement rates by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((category) => (
            <div key={category.category}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{category.category}</span>
                <div className="text-sm text-muted-foreground">
                  {category.count.toLocaleString()} jobseekers
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={(category.hired / category.count) * 100} 
                  className="h-2 flex-1" 
                />
                <span className="text-xs text-muted-foreground w-24 text-right">
                  {Math.round((category.hired / category.count) * 100)}% placed
                </span>
              </div>
              <div className="mt-1 text-xs text-right text-muted-foreground">
                Growth: <span className={category.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {category.growthRate > 0 ? '+' : ''}{category.growthRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobseekersCard;
