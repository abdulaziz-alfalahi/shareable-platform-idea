
export interface RetirementSimulationParams {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  monthlySavings: number;
  currentSavings: number;
  investmentStyle: 'conservative' | 'moderate' | 'aggressive';
  postRetirementWork: boolean;
}

export interface RetirementSimulationResults {
  savingsAtRetirement: number;
  monthlyRetirementIncome: number;
  incomeAdequacyPercentage: number;
  sufficientFunds: boolean;
  recommendedTraining: string[];
}
