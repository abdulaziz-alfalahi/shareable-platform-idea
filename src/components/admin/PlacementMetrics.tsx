
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";

interface PlacementMetricsProps {
  placementRate: number;
  averageTimeToHire: number;
}

const PlacementMetrics: React.FC<PlacementMetricsProps> = ({ 
  placementRate, 
  averageTimeToHire 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <Check className="h-5 w-5 mr-2 text-green-600" />
            <h3 className="font-medium">Placement Rate</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current rate</span>
              <span className="font-medium">{placementRate}%</span>
            </div>
            <Progress value={placementRate} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Percentage of job seekers who successfully secured employment through the platform
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            <h3 className="font-medium">Average Time to Hire</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current average</span>
              <span className="font-medium">{averageTimeToHire} days</span>
            </div>
            <Progress 
              value={Math.max(0, 100 - (averageTimeToHire / 30) * 100)} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground">
              Average time from job application to hire acceptance
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementMetrics;
