
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Banknote, Heart, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RetirementSimulationResult } from '@/utils/career/retirementTypes';
import RetirementRecommendations from './RetirementRecommendations';
import RetirementFinancialMetrics from './RetirementFinancialMetrics';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-lg">Total Fund</CardTitle>
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
            <CardTitle className="text-lg">GPSSA Pension</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">
                {simulationResult.governmentPension.toLocaleString()} AED
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-emirati-oasisGreen" />
              <span className="text-2xl font-semibold">
                {simulationResult.totalMonthlyIncome.toLocaleString()} AED
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <RetirementFinancialMetrics simulationResult={simulationResult} />
        <RetirementRecommendations recommendations={simulationResult.recommendations} />
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
