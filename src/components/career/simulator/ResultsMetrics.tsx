
import React from 'react';
import MetricCard from './metrics/MetricCard';
import { getMetricsConfig } from './metrics/getMetricsConfig';
import type { ChallengeLevel } from './metrics/challengeLevelConfig';

interface ResultsMetricsProps {
  timeToComplete: string;
  potentialSalary: number;
  challengeLevel: ChallengeLevel;
}

/**
 * ResultsMetrics - Displays key metrics from career path simulation results
 * Shows time to complete, potential salary, and challenge level in metric cards
 */
const ResultsMetrics: React.FC<ResultsMetricsProps> = ({
  timeToComplete,
  potentialSalary,
  challengeLevel
}) => {
  const metrics = getMetricsConfig(timeToComplete, potentialSalary, challengeLevel);

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
