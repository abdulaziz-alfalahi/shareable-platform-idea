
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";

interface FinancialSummaryCardProps {
  results: RetirementSimulationResults;
}

const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({ results }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${results.sufficientFunds ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Financial Summary</CardTitle>
          {results.sufficientFunds ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <CardDescription>
          {results.sufficientFunds 
            ? "Your retirement plan is on track" 
            : "Your retirement plan needs attention"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Savings at Retirement</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(results.savingsAtRetirement)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Monthly Retirement Income</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(results.monthlyRetirementIncome)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Income Adequacy</p>
          <div className="flex items-center mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  results.incomeAdequacyPercentage >= 100 
                    ? 'bg-green-500' 
                    : results.incomeAdequacyPercentage >= 70 
                      ? 'bg-amber-500' 
                      : 'bg-red-500'
                }`} 
                style={{ width: `${Math.min(100, results.incomeAdequacyPercentage)}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {Math.round(results.incomeAdequacyPercentage)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;
