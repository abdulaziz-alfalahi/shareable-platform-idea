
import { supabase } from "@/integrations/supabase/client";
import { RetirementSimulationParams, RetirementSimulationResults } from "./retirementTypes";

/**
 * Runs a retirement simulation based on the provided parameters
 */
export const runRetirementSimulation = async (
  userId: string | undefined, 
  params: RetirementSimulationParams
): Promise<RetirementSimulationResults> => {
  try {
    // Save the retirement plan to the database if user is logged in
    if (userId) {
      const { error } = await supabase
        .from('retirement_plans')
        .insert({
          user_id: userId,
          current_age: params.currentAge,
          retirement_age: params.retirementAge,
          current_salary: params.currentSalary,
          monthly_savings: params.monthlySavings,
          current_savings: params.currentSavings,
          investment_style: params.investmentStyle,
          post_retirement_work: params.postRetirementWork
        });

      if (error) {
        console.error("Error saving retirement plan:", error);
      }
    }

    // Calculate years to retirement
    const yearsToRetirement = params.retirementAge - params.currentAge;
    
    // Set return rates based on investment style
    let annualReturnRate: number;
    switch (params.investmentStyle) {
      case 'conservative':
        annualReturnRate = 0.05; // 5%
        break;
      case 'moderate':
        annualReturnRate = 0.07; // 7%
        break;
      case 'aggressive':
        annualReturnRate = 0.09; // 9%
        break;
      default:
        annualReturnRate = 0.07; // Default to moderate
    }
    
    // Calculate future value of current savings
    const futureValueCurrentSavings = params.currentSavings * Math.pow(1 + annualReturnRate, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const monthlyRate = annualReturnRate / 12;
    const months = yearsToRetirement * 12;
    const futureValueMonthlyContributions = params.monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    // Total savings at retirement
    const savingsAtRetirement = futureValueCurrentSavings + futureValueMonthlyContributions;
    
    // Calculate monthly retirement income (using 4% rule)
    const annualWithdrawal = savingsAtRetirement * 0.04;
    const monthlyRetirementIncome = annualWithdrawal / 12;
    
    // Post-retirement work additional income
    const postRetirementWorkIncome = params.postRetirementWork ? params.currentSalary * 0.25 : 0;
    const totalMonthlyRetirementIncome = monthlyRetirementIncome + postRetirementWorkIncome;
    
    // Income adequacy (target is 70% of current income)
    const targetRetirementIncome = params.currentSalary * 0.7;
    const incomeAdequacyPercentage = (totalMonthlyRetirementIncome / targetRetirementIncome) * 100;
    
    // Determine if funds are sufficient
    const sufficientFunds = incomeAdequacyPercentage >= 100;
    
    // Generate recommended training based on investment style and adequacy
    let recommendedTraining: string[] = [];
    
    if (!sufficientFunds) {
      recommendedTraining.push("Financial Planning Workshop");
      recommendedTraining.push("Retirement Investment Strategies");
      
      if (params.investmentStyle === 'conservative') {
        recommendedTraining.push("Balanced Investment Portfolio Management");
      } else if (params.currentSavings < params.currentSalary * 2) {
        recommendedTraining.push("Saving Strategies for Mid-Career Professionals");
      }
    } else if (params.investmentStyle === 'aggressive') {
      recommendedTraining.push("Risk Management in Investment");
    } else {
      recommendedTraining.push("Wealth Preservation Strategies");
    }
    
    // Save simulation results if user is logged in
    if (userId) {
      // Get the most recent retirement plan
      const { data: plans } = await supabase
        .from('retirement_plans')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (plans && plans.length > 0) {
        const planId = plans[0].id;
        
        // Save simulation results
        const { error: simulationError } = await supabase
          .from('retirement_simulations')
          .insert({
            plan_id: planId,
            savings_at_retirement: savingsAtRetirement,
            monthly_retirement_income: totalMonthlyRetirementIncome,
            income_adequacy_percentage: incomeAdequacyPercentage
          });
        
        if (simulationError) {
          console.error("Error saving simulation results:", simulationError);
        }
        
        // Save recommended training
        for (const training of recommendedTraining) {
          await supabase
            .from('simulation_recommended_training')
            .insert({
              simulation_id: planId,
              training_program: training
            });
        }
      }
    }
    
    return {
      savingsAtRetirement,
      monthlyRetirementIncome: totalMonthlyRetirementIncome,
      incomeAdequacyPercentage,
      sufficientFunds,
      recommendedTraining
    };
  } catch (error) {
    console.error("Error in retirement simulation:", error);
    throw error;
  }
};
