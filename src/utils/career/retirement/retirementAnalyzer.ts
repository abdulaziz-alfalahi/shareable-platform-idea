
import { RetirementSimulationParams, RetirementSimulationResults } from '../retirementTypes';

/**
 * Analyze retirement simulation results and determine financial readiness
 */
export const analyzeRetirementReadiness = (
  params: {
    retirementAge: number;
    currentAge: number;
    incomeReplacementRatio: number;
    fundSustainability: number;
    lifeExpectancy: number;
  }
): { 
  financialReadiness: 'Excellent' | 'Good' | 'Moderate' | 'At Risk';
  yearsInRetirement: number; 
} => {
  // Calculate years in retirement
  const yearsInRetirement = params.lifeExpectancy - params.retirementAge;
  
  // Determine financial readiness
  let financialReadiness: 'Excellent' | 'Good' | 'Moderate' | 'At Risk';
  
  if (params.incomeReplacementRatio >= 90 && params.fundSustainability >= yearsInRetirement) {
    financialReadiness = 'Excellent';
  } else if (params.incomeReplacementRatio >= 70 && params.fundSustainability >= yearsInRetirement * 0.8) {
    financialReadiness = 'Good';
  } else if (params.incomeReplacementRatio >= 50 && params.fundSustainability >= yearsInRetirement * 0.6) {
    financialReadiness = 'Moderate';
  } else {
    financialReadiness = 'At Risk';
  }
  
  return {
    financialReadiness,
    yearsInRetirement
  };
};
