
export interface RetirementSimulationParams {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  monthlySavings: number;
  currentSavings: number;
  investmentStyle: 'conservative' | 'moderate' | 'aggressive';
  postRetirementWork: boolean;
}

export interface RetirementSimulationResult {
  retirementAge: number;
  yearsToRetirement: number;
  retirementFund: number;
  monthlyRetirementIncome: number;
  governmentPension: number;
  totalMonthlyIncome: number;
  incomeReplacementRatio: number;
  lifeExpectancy: number;
  fundSustainability: number;
  financialReadiness: 'Excellent' | 'Good' | 'Moderate' | 'At Risk';
  recommendations: string[];
}
