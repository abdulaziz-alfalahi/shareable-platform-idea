
import { RetirementSimulationParams } from '../retirementTypes';

/**
 * Generate personalized recommendations based on retirement simulation results
 */
export const generateRecommendations = (
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
