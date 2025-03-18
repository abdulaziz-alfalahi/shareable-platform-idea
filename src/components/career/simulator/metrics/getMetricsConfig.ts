
import { Clock, TrendingUp } from 'lucide-react';
import { MetricCardProps } from './MetricCard';
import { challengeLevelConfig, ChallengeLevel } from './challengeLevelConfig';

/**
 * Generates metric configurations for the Career Pathway simulation results
 * 
 * @param timeToComplete - Formatted time to complete the career path
 * @param potentialSalary - Calculated potential salary
 * @param challengeLevel - Difficulty level of the career path
 * @returns Array of metric card configurations
 */
export const getMetricsConfig = (
  timeToComplete: string,
  potentialSalary: number,
  challengeLevel: ChallengeLevel
): MetricCardProps[] => {
  const challengeConfig = challengeLevelConfig[challengeLevel];

  return [
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
};
