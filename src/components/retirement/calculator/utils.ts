
import { RetirementFormValues } from "./RetirementForm";
import { RetirementSimulationParams } from "@/utils/career/retirementTypes";

/**
 * Convert form values to simulation parameters
 */
export const convertFormToSimulationParams = (
  formValues: RetirementFormValues
): RetirementSimulationParams => {
  return {
    currentAge: formValues.currentAge,
    retirementAge: formValues.retirementAge,
    currentSalary: formValues.currentSalary,
    monthlySavings: formValues.monthlySavings,
    currentSavings: formValues.currentSavings,
    investmentStyle: formValues.investmentStyle,
    postRetirementWork: formValues.postRetirementWork,
    sectorType: formValues.sectorType,
    yearsOfService: formValues.yearsOfService,
    dependents: formValues.dependents,
    additionalIncome: formValues.additionalIncome,
    healthcareExpenses: formValues.healthcareExpenses,
    housingExpenses: formValues.housingExpenses
  };
};
