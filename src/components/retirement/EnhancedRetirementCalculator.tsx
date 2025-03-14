
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight, Wallet, BriefcaseBusiness, Building, Landmark, Coins } from "lucide-react";
import { RetirementSimulationResults } from "@/utils/career/retirementTypes";
import RetirementResults from "./RetirementResults";
import { UaeDecoContainer, UaeDivider } from "@/components/ui/uae";
import { simulateRetirement } from "@/utils/career/retirementSimulation";

const formSchema = z.object({
  currentAge: z.number().min(18).max(70),
  retirementAge: z.number().min(45).max(75),
  currentSalary: z.number().positive(),
  monthlySavings: z.number().nonnegative(),
  currentSavings: z.number().nonnegative(),
  investmentStyle: z.enum(["conservative", "moderate", "aggressive"]),
  sectorType: z.enum(["government", "semi_government", "private"]),
  yearsOfService: z.number().nonnegative(),
  postRetirementWork: z.boolean(),
  dependents: z.number().nonnegative(),
  additionalIncome: z.number().nonnegative(),
  healthcareExpenses: z.number().nonnegative(),
  housingExpenses: z.number().nonnegative(),
});

type FormValues = z.infer<typeof formSchema>;

const EnhancedRetirementCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("form");
  const [simulationResults, setSimulationResults] = useState<RetirementSimulationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 60,
      currentSalary: 25000,
      monthlySavings: 5000,
      currentSavings: 100000,
      investmentStyle: "moderate",
      sectorType: "government",
      yearsOfService: 5,
      postRetirementWork: false,
      dependents: 2,
      additionalIncome: 0,
      healthcareExpenses: 2000,
      housingExpenses: 8000,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsCalculating(true);
    try {
      const results = await simulateRetirement({
        ...values,
      });
      setSimulationResults(results);
      setActiveTab("results");
    } catch (error) {
      console.error("Error simulating retirement:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetCalculator = () => {
    form.reset();
    setSimulationResults(null);
    setActiveTab("form");
  };

  return (
    <UaeDecoContainer variant="desert" decoration="corners" className="max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Wallet className="h-8 w-8 text-emirati-desertGold" />
          <div>
            <CardTitle className="text-2xl font-bold text-emirati-desertRed">
              Emirati Retirement Planner
            </CardTitle>
            <CardDescription>
              Plan your retirement journey with our comprehensive calculator tailored for UAE nationals
            </CardDescription>
          </div>
        </div>
        <UaeDivider variant="gradient" className="mt-4" />
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="form" disabled={isCalculating}>
              <Calculator className="mr-2 h-4 w-4" />
              Input Details
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!simulationResults || isCalculating}>
              <ChevronRight className="mr-2 h-4 w-4" />
              View Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center text-emirati-deepBrown">
                      <Landmark className="mr-2 h-5 w-5 text-emirati-desertGold" />
                      Personal Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="currentAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="retirementAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Planned Retirement Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Standard retirement age is 60 for men and 55 for women in UAE government sector
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dependents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Dependents</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Employment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center text-emirati-deepBrown">
                      <BriefcaseBusiness className="mr-2 h-5 w-5 text-emirati-desertGold" />
                      Employment Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="currentSalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Monthly Salary (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sectorType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Sector</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment sector" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="semi_government">Semi-Government</SelectItem>
                              <SelectItem value="private">Private Sector</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            GPSSA pension benefits vary by sector
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearsOfService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Service</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Total completed years in UAE workforce
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <UaeDivider variant="dotted" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Financial Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center text-emirati-deepBrown">
                      <Coins className="mr-2 h-5 w-5 text-emirati-desertGold" />
                      Savings & Investments
                    </h3>

                    <FormField
                      control={form.control}
                      name="currentSavings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Savings (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthlySavings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Savings (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Recommended savings is 20% of monthly income
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investment Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select investment style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="conservative">Conservative (4-6% return)</SelectItem>
                              <SelectItem value="moderate">Moderate (6-8% return)</SelectItem>
                              <SelectItem value="aggressive">Aggressive (8-10% return)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Expenses Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center text-emirati-deepBrown">
                      <Building className="mr-2 h-5 w-5 text-emirati-desertGold" />
                      Monthly Expenses & Income
                    </h3>

                    <FormField
                      control={form.control}
                      name="housingExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Housing Expenses (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="healthcareExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Healthcare Expenses (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Monthly Income (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Income from investments, rental properties, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <UaeDivider variant="dotted" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center text-emirati-deepBrown">
                    Additional Options
                  </h3>

                  <FormField
                    control={form.control}
                    name="postRetirementWork"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Post-Retirement Work</FormLabel>
                          <FormDescription>
                            Plan to work part-time after retirement
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-emirati-oasisGreen"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Retirement Plan"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="results">
            {simulationResults && (
              <>
                <RetirementResults results={simulationResults} onRestart={resetCalculator} />
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </UaeDecoContainer>
  );
};

export default EnhancedRetirementCalculator;
