
export interface RetirementSimulationParams {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  monthlySavings: number;
  currentSavings: number;
  investmentStyle: 'conservative' | 'moderate' | 'aggressive';
  postRetirementWork: boolean;
  // Optional additional parameters
  sectorType?: 'government' | 'semi_government' | 'private';
  yearsOfService?: number;
  dependents?: number;
  additionalIncome?: number;
  healthcareExpenses?: number;
  housingExpenses?: number;
}

export interface RetirementSimulationResults {
  savingsAtRetirement: number;
  monthlyRetirementIncome: number;
  incomeAdequacyPercentage: number;
  sufficientFunds: boolean;
  recommendedTraining: string[];
  retirementAge?: number;
  yearsToRetirement?: number;
  retirementFund?: number;
  governmentPension?: number;
  totalMonthlyIncome?: number;
  incomeReplacementRatio?: number;
  lifeExpectancy?: number;
  fundSustainability?: number;
  financialReadiness?: 'Excellent' | 'Good' | 'Moderate' | 'At Risk';
  recommendations?: string[];
}
