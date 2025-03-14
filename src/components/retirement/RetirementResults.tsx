
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import { CheckCircle2, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RetirementResultsProps {
  results: RetirementSimulationResults;
  onRestart: () => void;
}

const RetirementResults: React.FC<RetirementResultsProps> = ({ results, onRestart }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emirati-deepBlue">Retirement Simulation Results</h2>
        <button 
          onClick={onRestart}
          className="text-emirati-oasisGreen hover:text-emirati-oasisGreen/80 text-sm underline"
        >
          Run another simulation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-emirati-desertGold" />
              <CardTitle>Recommended Actions</CardTitle>
            </div>
            <CardDescription>
              Suggestions to improve your retirement readiness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Recommended Training</h4>
              <div className="flex flex-wrap gap-2">
                {results.recommendedTraining.map((training, index) => (
                  <Badge key={index} variant="outline" className="bg-emirati-sandBeige/20">
                    {training}
                  </Badge>
                ))}
              </div>
            </div>
            
            {!results.sufficientFunds && (
              <div className="bg-amber-50 p-3 rounded-md mt-2">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-amber-800">Attention Needed</h4>
                    <p className="text-amber-700 text-sm mt-1">
                      Your projected retirement income is below your target. Consider increasing your savings rate,
                      adjusting your retirement age, or exploring investment alternatives.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {results.sufficientFunds && (
              <div className="bg-green-50 p-3 rounded-md mt-2">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-green-800">On Track</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Your retirement plan is well-funded. Consider fine-tuning your investment strategy 
                      and continue your current savings habits.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />
            <CardTitle>Long-Term Projections</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Based on your current plan, your retirement savings should last approximately:
            </p>
            <p className="text-3xl font-bold text-emirati-oasisGreen">
              {results.sufficientFunds ? "25+ years" : "15-20 years"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This projection assumes an annual withdrawal rate of 4% of your retirement savings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetirementResults;
