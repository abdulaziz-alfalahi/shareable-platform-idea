
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, TrendingUp, Award, BadgeCheck, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResultsMetricsProps {
  timeToComplete: string;
  potentialSalary: number;
  challengeLevel: 'low' | 'medium' | 'high';
}

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  description,
  bgColor,
  borderColor,
  textColor,
  delay
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className="h-full"
  >
    <Card className="border-emirati-sandBeige/50 h-full shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={cn("rounded-full p-3 mb-3 flex items-center justify-center", bgColor, borderColor)}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const ResultsMetrics: React.FC<ResultsMetricsProps> = ({
  timeToComplete,
  potentialSalary,
  challengeLevel
}) => {
  // Determine challenge level configuration
  const challengeLevelConfig = {
    low: { 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: <Target className="h-6 w-6 text-emerald-600" />
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

  const metrics: MetricCardProps[] = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Time to Complete",
      value: timeToComplete,
      description: "Estimated duration to achieve career path",
      bgColor: "bg-blue-50",
      borderColor: "border border-blue-100",
      textColor: "text-blue-700",
      delay: 0.1
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      title: "Potential Salary",
      value: `${potentialSalary.toLocaleString()} AED`,
      description: "Projected annual salary upon completion",
      bgColor: "bg-emerald-50",
      borderColor: "border border-emerald-100",
      textColor: "text-emerald-700",
      delay: 0.2
    },
    {
      icon: challengeConfig.icon,
      title: "Challenge Level",
      value: <span className="capitalize">{challengeLevel}</span>,
      description: "Difficulty level of the career path",
      bgColor: challengeConfig.bgColor,
      borderColor: `border ${challengeConfig.borderColor}`,
      textColor: challengeConfig.color,
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={`metric-${index}`}
          {...metric}
        />
      ))}
    </div>
  );
};

export default ResultsMetrics;
