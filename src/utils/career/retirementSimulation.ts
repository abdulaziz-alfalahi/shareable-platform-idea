import { RetirementSimulationParams, RetirementSimulationResults } from './retirementTypes';

// Simulate retirement planning for a user
export const simulateRetirement = async (
  params: RetirementSimulationParams
): Promise<RetirementSimulationResults> => {
  // Calculate years to retirement
  const yearsToRetirement = params.retirementAge - params.currentAge;
  
  // Calculate annual return rate based on investment style
  let annualReturnRate: number;
  switch (params.investmentStyle) {
    case 'conservative':
      annualReturnRate = 0.05; // 5% average annual return
      break;
    case 'aggressive':
      annualReturnRate = 0.09; // 9% average annual return
      break;
    case 'moderate':
    default:
      annualReturnRate = 0.07; // 7% average annual return
      break;
  }
  
  // Calculate future value of current savings
  const futureValueOfCurrentSavings = calculateFutureValue(
    params.currentSavings,
    annualReturnRate,
    yearsToRetirement
  );
  
  // Calculate future value of monthly contributions
  const futureValueOfContributions = calculateFutureValueOfSeries(
    params.monthlySavings * 12, // Annual contribution
    annualReturnRate,
    yearsToRetirement
  );
  
  // Calculate total retirement fund
  const retirementFund = futureValueOfCurrentSavings + futureValueOfContributions;
  
  // Estimate life expectancy (simplified for Emirati nationals)
  // UAE life expectancy data: Males ~77, Females ~80
  const lifeExpectancy = 85;
  
  // Calculate years in retirement
  const yearsInRetirement = lifeExpectancy - params.retirementAge;
  
  // Calculate sustainable monthly withdrawal (using the 4% rule as a baseline, adjusted for UAE)
  const annualWithdrawal = retirementFund * 0.04;
  const monthlyRetirementIncome = annualWithdrawal / 12;
  
  // Add government pension estimate (UAE-specific for Emirati nationals)
  // UAE GPSSA pension calculation: based on years of service and final salary
  const estimatedFinalSalary = params.currentSalary * Math.pow(1.03, yearsToRetirement); // 3% annual salary growth
  
  // UAE-specific pension calculation
  // Years of service presumption: current age - 22 (average start age) + years to retirement
  const estimatedYearsOfService = Math.min(35, Math.max(0, params.currentAge - 22 + yearsToRetirement));
  
  // Pension calculation based on GPSSA rules:
  // - 2.5% of final salary per year of service for the first 15 years
  // - 2% for each year thereafter, up to 35 years max
  let pensionPercentage = 0;
  if (estimatedYearsOfService <= 15) {
    pensionPercentage = estimatedYearsOfService * 0.025; // 2.5% per year
  } else {
    pensionPercentage = 0.375 + (estimatedYearsOfService - 15) * 0.02; // 37.5% + 2% per additional year
  }
  
  // Cap at 80% per UAE rules
  pensionPercentage = Math.min(0.8, pensionPercentage);
  
  // Adjust for early retirement if applicable
  // For Emiratis, standard retirement age is 60 for men, 55 for women
  // Early retirement penalty: 20% reduction if retiring before standard age (simplified)
  let earlyRetirementPenalty = 1;
  if (params.retirementAge < 60) {
    earlyRetirementPenalty = 0.8; // 20% reduction for early retirement
  }
  
  // Calculate monthly government pension
  const governmentPension = (estimatedFinalSalary * pensionPercentage * earlyRetirementPenalty);
  
  // Add part-time work income if applicable
  const partTimeIncome = params.postRetirementWork ? estimatedFinalSalary * 0.3 : 0;
  
  // Calculate total monthly retirement income
  const totalMonthlyIncome = monthlyRetirementIncome + governmentPension + partTimeIncome;
  
  // Calculate income replacement ratio
  const incomeReplacementRatio = Math.round((totalMonthlyIncome / params.currentSalary) * 100);
  
  // Calculate fund sustainability in years (how long the retirement fund will last)
  const fundSustainability = retirementFund / (annualWithdrawal);
  
  // Determine financial readiness
  let financialReadiness: 'Excellent' | 'Good' | 'Moderate' | 'At Risk';
  if (incomeReplacementRatio >= 90 && fundSustainability >= yearsInRetirement) {
    financialReadiness = 'Excellent';
  } else if (incomeReplacementRatio >= 70 && fundSustainability >= yearsInRetirement * 0.8) {
    financialReadiness = 'Good';
  } else if (incomeReplacementRatio >= 50 && fundSustainability >= yearsInRetirement * 0.6) {
    financialReadiness = 'Moderate';
  } else {
    financialReadiness = 'At Risk';
  }
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    params,
    financialReadiness,
    incomeReplacementRatio,
    yearsToRetirement,
    estimatedYearsOfService
  );
  
  return {
    retirementAge: params.retirementAge,
    yearsToRetirement,
    retirementFund: Math.round(retirementFund),
    monthlyRetirementIncome: Math.round(monthlyRetirementIncome),
    governmentPension: Math.round(governmentPension),
    totalMonthlyIncome: Math.round(totalMonthlyIncome),
    incomeReplacementRatio,
    lifeExpectancy,
    fundSustainability: Math.round(fundSustainability),
    financialReadiness,
    recommendations,
    incomeAdequacyPercentage: incomeReplacementRatio,
    savingsAtRetirement: Math.round(retirementFund),
    sufficientFunds: financialReadiness === 'Excellent' || financialReadiness === 'Good',
    recommendedTraining: recommendations.slice(0, 3) // Take first 3 recommendations for training
  };
};

// Calculate future value of a present sum
const calculateFutureValue = (
  presentValue: number,
  annualRate: number,
  years: number
): number => {
  return presentValue * Math.pow(1 + annualRate, years);
};

// Calculate future value of a series of periodic payments
const calculateFutureValueOfSeries = (
  annualContribution: number,
  annualRate: number,
  years: number
): number => {
  if (annualRate === 0) return annualContribution * years;
  return annualContribution * ((Math.pow(1 + annualRate, years) - 1) / annualRate);
};

// Generate personalized recommendations
const generateRecommendations = (
  params: RetirementSimulationParams,
  financialReadiness: string,
  incomeReplacementRatio: number,
  yearsToRetirement: number,
  estimatedYearsOfService: number
): string[] => {
  const recommendations: string[] = [];
  
  // Basic recommendation for everyone
  recommendations.push(
    "Review your retirement plan annually to adjust for changes in your financial situation."
  );
  
  // Savings-related recommendations
  if (params.monthlySavings < params.currentSalary * 0.2) {
    recommendations.push(
      "Consider increasing your monthly savings to at least 20% of your income for a more secure retirement."
    );
  }
  
  // Investment style recommendations
  if (params.investmentStyle === 'conservative' && yearsToRetirement > 15) {
    recommendations.push(
      "With more than 15 years until retirement, you might consider a more aggressive investment strategy to potentially increase returns."
    );
  } else if (params.investmentStyle === 'aggressive' && yearsToRetirement < 10) {
    recommendations.push(
      "As you approach retirement, consider shifting to a more conservative investment strategy to protect your savings."
    );
  }
  
  // UAE-specific pension recommendations
  if (estimatedYearsOfService < 15) {
    recommendations.push(
      "Consider working at least 15 years to qualify for the UAE government pension scheme for Emiratis."
    );
  } else if (estimatedYearsOfService < 35) {
    recommendations.push(
      "Aim for 35 years of service to maximize your government pension benefits under the UAE GPSSA system."
    );
  }
  
  // Retirement age recommendations
  if (params.retirementAge < 60 && financialReadiness !== 'Excellent') {
    recommendations.push(
      "Delaying retirement until age 60 could significantly increase your pension benefits under the UAE GPSSA system."
    );
  }
  
  // Income replacement recommendations
  if (incomeReplacementRatio < 70) {
    recommendations.push(
      "Your projected retirement income is below the recommended 70% of your current income. Consider increasing savings or exploring additional income sources."
    );
  }
  
  // Post-retirement work recommendations
  if (!params.postRetirementWork && financialReadiness !== 'Excellent') {
    recommendations.push(
      "Planning for part-time consulting or mentoring work after retirement can provide additional income and fulfillment."
    );
  }
  
  // UAE-specific recommendations
  recommendations.push(
    "Explore the UAE's voluntary pension scheme to supplement your government pension benefits."
  );
  
  return recommendations;
};
