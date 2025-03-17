
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, TrendingUp, Award, BadgeCheck, Target } from 'lucide-react';
import { motion } from 'framer-motion';

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
  // Determine challenge level color and icon
  const challengeLevelConfig = {
    low: { 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <Target className="h-6 w-6 text-green-600" />
    },
    medium: { 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: <BadgeCheck className="h-6 w-6 text-amber-600" />
    },
    high: { 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <Award className="h-6 w-6 text-red-600" />
    }
  };
  
  const challengeConfig = challengeLevelConfig[challengeLevel];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Time to Complete Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-emirati-sandBeige/50 h-full">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full p-3 bg-blue-50 border border-blue-100 mb-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Time to Complete</h3>
            <p className="text-2xl font-bold">{timeToComplete}</p>
            <p className="text-xs text-muted-foreground mt-1">Estimated duration to achieve career path</p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Potential Salary Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-emirati-sandBeige/50 h-full">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full p-3 bg-emerald-50 border border-emerald-100 mb-3">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Potential Salary</h3>
            <p className="text-2xl font-bold">
              {potentialSalary.toLocaleString()} AED
            </p>
            <p className="text-xs text-muted-foreground mt-1">Projected annual salary upon completion</p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Challenge Level Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-emirati-sandBeige/50 h-full">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className={`rounded-full p-3 ${challengeConfig.bgColor} ${challengeConfig.borderColor} mb-3`}>
              {challengeConfig.icon}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Challenge Level</h3>
            <p className={`text-2xl font-bold capitalize ${challengeConfig.color}`}>
              {challengeLevel}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Difficulty level of the career path</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultsMetrics;
