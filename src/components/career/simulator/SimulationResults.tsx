
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, Award, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SimulationResult } from '@/utils/career/pathwayTypes';
import ResultsMetrics from './ResultsMetrics';
import RecommendationsSection from './RecommendationsSection';

interface SimulationResultsProps {
  simulationResult: SimulationResult;
  onModifyPath: () => void;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({
  simulationResult,
  onModifyPath
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <ResultsMetrics 
        timeToComplete={simulationResult.timeToComplete}
        potentialSalary={simulationResult.potentialSalary}
        challengeLevel={simulationResult.challengeLevel}
      />
      
      <RecommendationsSection 
        requiredSkills={simulationResult.requiredSkills}
        recommendedTraining={simulationResult.recommendedTraining}
      />
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onModifyPath}
        >
          Modify Path
        </Button>
        <Button
          onClick={() => navigate('/training-centers')}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Explore Training Options
        </Button>
      </div>
    </div>
  );
};

export default SimulationResults;
