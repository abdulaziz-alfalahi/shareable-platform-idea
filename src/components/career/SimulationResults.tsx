
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, Award, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SimulationResult } from '@/utils/career/pathwayTypes';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time to Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">{simulationResult.timeToComplete}</span>
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
                {simulationResult.potentialSalary.toLocaleString()} AED
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
                {simulationResult.challengeLevel}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {simulationResult.requiredSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full bg-emirati-sandBeige/20 text-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommended Training</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {simulationResult.recommendedTraining.map((training, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <Check className="h-4 w-4 text-emirati-oasisGreen mt-0.5" />
                  {training}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
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
