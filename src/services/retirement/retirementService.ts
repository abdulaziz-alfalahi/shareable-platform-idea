
import { supabase } from "@/integrations/supabase/client";
import { RetirementSimulationParams, RetirementSimulationResult } from "@/utils/career/retirementTypes";

// Save a retirement plan to the database
export const saveRetirementPlan = async (planData: RetirementSimulationParams) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("retirement_plans")
    .upsert({
      user_id: user.user.id,
      current_age: planData.currentAge,
      retirement_age: planData.retirementAge,
      current_salary: planData.currentSalary,
      monthly_savings: planData.monthlySavings,
      current_savings: planData.currentSavings,
      investment_style: planData.investmentStyle,
      post_retirement_work: planData.postRetirementWork,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select("id")
    .single();
    
  if (error) {
    console.error("Error saving retirement plan:", error);
    throw error;
  }
  
  return data;
};

// Save a retirement simulation result to the database
export const saveRetirementSimulation = async (
  planId: string,
  simulationResult: RetirementSimulationResult
) => {
  const { error } = await supabase
    .from("retirement_simulations")
    .insert({
      plan_id: planId,
      monthly_retirement_income: simulationResult.monthlyRetirementIncome,
      savings_at_retirement: simulationResult.retirementFund,
      income_adequacy_percentage: simulationResult.incomeReplacementRatio
    });
    
  if (error) {
    console.error("Error saving retirement simulation:", error);
    throw error;
  }
};

// Get the latest retirement plan for the authenticated user
export const getUserRetirementPlan = async (): Promise<RetirementSimulationParams | null> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("retirement_plans")
    .select("*")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching retirement plan:", error);
    throw error;
  }
  
  if (!data) return null;
  
  return {
    currentAge: data.current_age,
    retirementAge: data.retirement_age,
    currentSalary: data.current_salary,
    monthlySavings: data.monthly_savings,
    currentSavings: data.current_savings,
    investmentStyle: data.investment_style as 'conservative' | 'moderate' | 'aggressive',
    postRetirementWork: data.post_retirement_work
  };
};
