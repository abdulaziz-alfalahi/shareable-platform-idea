
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { UaeDivider } from "@/components/ui/uae";

interface RetirementVisualizationProps {
  results: RetirementSimulationResults;
}

const RetirementVisualization: React.FC<RetirementVisualizationProps> = ({ results }) => {
  // Calculate values for the savings growth chart
  const generateSavingsGrowthData = () => {
    const yearsToRetirement = results.yearsToRetirement || 0;
    const data = [];
    
    // Starting with current savings
    let currentValue = results.savingsAtRetirement / Math.pow(1.07, yearsToRetirement);
    
    // Generate data for each year
    for (let year = 0; year <= yearsToRetirement; year++) {
      data.push({
        year: `Year ${year}`,
        value: Math.round(currentValue),
      });
      
      // Apply annual growth (using 7% as average)
      currentValue *= 1.07;
    }
    
    return data;
  };

  // Calculate values for the income distribution pie chart
  const generateIncomeDistributionData = () => {
    return [
      { name: "Government Pension", value: results.governmentPension || 0 },
      { name: "Personal Savings", value: results.monthlyRetirementIncome || 0 },
      { name: "Part-time Work", value: results.postRetirementWork ? (results.totalMonthlyIncome || 0) * 0.15 : 0 },
    ].filter(item => item.value > 0);
  };

  // Calculate expense distribution (estimated)
  const generateExpenseDistributionData = () => {
    const monthlyIncome = results.totalMonthlyIncome || 10000;
    
    return [
      { name: "Housing", value: monthlyIncome * 0.3 },
      { name: "Food", value: monthlyIncome * 0.15 },
      { name: "Healthcare", value: monthlyIncome * 0.1 },
      { name: "Transportation", value: monthlyIncome * 0.1 },
      { name: "Leisure", value: monthlyIncome * 0.15 },
      { name: "Other", value: monthlyIncome * 0.2 },
    ];
  };

  const savingsGrowthData = generateSavingsGrowthData();
  const incomeDistributionData = generateIncomeDistributionData();
  const expenseDistributionData = generateExpenseDistributionData();

  const COLORS = ['#0C8A7B', '#C8A77B', '#8B4513', '#D4A76A', '#2E5984', '#8B0000'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-emirati-desertRed">Retirement Savings Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={savingsGrowthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value).replace('AED', '')} 
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), "Savings"]} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C8A77B" 
                  fill="#C8A77B" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-emirati-oasisGreen">Retirement Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incomeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <UaeDivider variant="dotted" className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>Total Monthly Income: {formatCurrency(results.totalMonthlyIncome || 0)}</p>
              <p>Income Replacement: {results.incomeReplacementRatio || 0}% of pre-retirement income</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-emirati-desertGold">Estimated Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <UaeDivider variant="dotted" className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>Based on standard expense patterns for Emirati retirees</p>
              <p>Actual expenses may vary based on lifestyle and location</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetirementVisualization;
