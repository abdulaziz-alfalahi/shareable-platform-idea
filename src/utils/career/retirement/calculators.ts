
/**
 * Financial calculation utilities for retirement planning
 */

/**
 * Calculate future value of a present sum
 */
export const calculateFutureValue = (
  presentValue: number,
  annualRate: number,
  years: number
): number => {
  return presentValue * Math.pow(1 + annualRate, years);
};

/**
 * Calculate future value of a series of periodic payments
 */
export const calculateFutureValueOfSeries = (
  annualContribution: number,
  annualRate: number,
  years: number
): number => {
  if (annualRate === 0) return annualContribution * years;
  return annualContribution * ((Math.pow(1 + annualRate, years) - 1) / annualRate);
};

/**
 * Get annual return rate based on investment style
 */
export const getAnnualReturnRate = (investmentStyle: 'conservative' | 'moderate' | 'aggressive'): number => {
  switch (investmentStyle) {
    case 'conservative':
      return 0.05; // 5% average annual return
    case 'aggressive':
      return 0.09; // 9% average annual return
    case 'moderate':
    default:
      return 0.07; // 7% average annual return
  }
};

/**
 * Calculate pension percentage based on UAE GPSSA rules
 */
export const calculatePensionPercentage = (estimatedYearsOfService: number): number => {
  let percentage = 0;
  if (estimatedYearsOfService <= 15) {
    percentage = estimatedYearsOfService * 0.025; // 2.5% per year
  } else {
    percentage = 0.375 + (estimatedYearsOfService - 15) * 0.02; // 37.5% + 2% per additional year
  }
  
  // Cap at 80% per UAE rules
  return Math.min(0.8, percentage);
};
