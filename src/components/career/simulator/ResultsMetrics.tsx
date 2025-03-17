
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, Award } from 'lucide-react';

interface ResultsMetricsProps {
  timeToComplete: string;
  potentialSalary: number;
  challengeLevel: 'low' | 'medium' | 'high';
}

const ResultsMetrics: React.FC<ResultsMetricsProps> = ({
  timeToComplete,
  potentialSalary,
  challengeLevel
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Time to Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-emirati-oasisGreen" />
            <span className="text-2xl font-semibold">{timeToComplete}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Potential Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />
            <span className="text-2xl font-semibold">
              {potentialSalary.toLocaleString()} AED
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Challenge Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emirati-oasisGreen" />
            <span className="text-2xl font-semibold capitalize">
              {challengeLevel}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsMetrics;
