
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RetirementSimulationResult } from '@/utils/career/retirementTypes';

interface RetirementFinancialMetricsProps {
  simulationResult: RetirementSimulationResult;
}

const RetirementFinancialMetrics: React.FC<RetirementFinancialMetricsProps> = ({
  simulationResult
}) => {
  return (
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
            <span className="text-sm text-muted-foreground">Personal savings monthly income:</span>
            <span className="font-medium">{simulationResult.monthlyRetirementIncome.toLocaleString()} AED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">GPSSA pension monthly:</span>
            <span className="font-medium">{simulationResult.governmentPension.toLocaleString()} AED</span>
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
  );
};

export default RetirementFinancialMetrics;
