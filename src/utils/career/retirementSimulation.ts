
import { RetirementSimulationParams, RetirementSimulationResults } from './retirementTypes';
import { 
  calculateFutureValue, 
  calculateFutureValueOfSeries, 
  getAnnualReturnRate,
  calculatePensionPercentage
} from './retirement/calculators';
import { generateRecommendations } from './retirement/recommendationGenerator';
import { analyzeRetirementReadiness } from './retirement/retirementAnalyzer';

// Simulate retirement planning for a user
export const simulateRetirement = async (
  params: RetirementSimulationParams
): Promise<RetirementSimulationResults> => {
  // Calculate years to retirement
  const yearsToRetirement = params.retirementAge - params.currentAge;
  
  // Get annual return rate based on investment style
  const annualReturnRate = getAnnualReturnRate(params.investmentStyle);
  
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
  
  // Calculate sustainable monthly withdrawal (using the 4% rule as a baseline, adjusted for UAE)
  const annualWithdrawal = retirementFund * 0.04;
  const monthlyRetirementIncome = annualWithdrawal / 12;
  
  // Add government pension estimate (UAE-specific for Emirati nationals)
  // UAE GPSSA pension calculation: based on years of service and final salary
  const estimatedFinalSalary = params.currentSalary * Math.pow(1.03, yearsToRetirement); // 3% annual salary growth
  
  // Years of service presumption: current age - 22 (average start age) + years to retirement
  const estimatedYearsOfService = Math.min(35, Math.max(0, params.currentAge - 22 + yearsToRetirement));
  
  // Calculate pension percentage based on years of service
  const pensionPercentage = calculatePensionPercentage(estimatedYearsOfService);
  
  // Adjust for early retirement if applicable
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
  
  // Analyze retirement readiness
  const { financialReadiness, yearsInRetirement } = analyzeRetirementReadiness({
    retirementAge: params.retirementAge,
    currentAge: params.currentAge,
    incomeReplacementRatio,
    fundSustainability,
    lifeExpectancy
  });
  
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
