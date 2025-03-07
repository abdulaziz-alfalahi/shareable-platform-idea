
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Banknote, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RetirementSimulationResult } from '@/utils/career/retirementTypes';

interface RetirementResultsProps {
  simulationResult: RetirementSimulationResult;
  onModifyParams: () => void;
}

const RetirementResults: React.FC<RetirementResultsProps> = ({
  simulationResult,
  onModifyParams
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Retirement Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">{simulationResult.retirementAge} years</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Retirement Fund</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">
                {simulationResult.retirementFund.toLocaleString()} AED
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">
                {simulationResult.monthlyRetirementIncome.toLocaleString()} AED
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Years until retirement:</span>
                <span className="font-medium">{simulationResult.yearsToRetirement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated life expectancy:</span>
                <span className="font-medium">{simulationResult.lifeExpectancy} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Retirement fund sustainability:</span>
                <span className="font-medium">{simulationResult.fundSustainability} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Income replacement ratio:</span>
                <span className="font-medium">{simulationResult.incomeReplacementRatio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Financial readiness:</span>
                <span className={`font-medium ${
                  simulationResult.financialReadiness === 'Excellent' ? 'text-green-600' :
                  simulationResult.financialReadiness === 'Good' ? 'text-blue-600' :
                  simulationResult.financialReadiness === 'Moderate' ? 'text-amber-600' : 'text-red-600'
                }`}>{simulationResult.financialReadiness}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {simulationResult.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <Heart className="h-4 w-4 text-emirati-oasisGreen mt-0.5" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onModifyParams}
        >
          Modify Parameters
        </Button>
        <Button
          onClick={() => navigate('/training-centers')}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          Explore Post-Retirement Options
        </Button>
      </div>
    </div>
  );
};

export default RetirementResults;
