
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FinancialInfoFormProps {
  financialForm: UseFormReturn<any>;
  saveFinancialInfo: (data: any) => Promise<void>;
}

const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({ financialForm, saveFinancialInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
        <CardDescription>
          Provide financial details to help match you with need-based scholarships.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={financialForm.handleSubmit(saveFinancialInfo)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="householdIncome">Annual Household Income</Label>
              <Select
                value={financialForm.watch("householdIncome")}
                onValueChange={(value) => financialForm.setValue("householdIncome", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below_50k">Below 50,000 AED</SelectItem>
                  <SelectItem value="50k_100k">50,000 - 100,000 AED</SelectItem>
                  <SelectItem value="100k_150k">100,000 - 150,000 AED</SelectItem>
                  <SelectItem value="150k_200k">150,000 - 200,000 AED</SelectItem>
                  <SelectItem value="above_200k">Above 200,000 AED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                placeholder="Number of dependents"
                type="number"
                {...financialForm.register("dependents")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentEmployment">Current Employment Status</Label>
              <Select
                value={financialForm.watch("currentEmployment")}
                onValueChange={(value) => financialForm.setValue("currentEmployment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time_student">Full-time Student</SelectItem>
                  <SelectItem value="part_time_employed">Part-time Employed</SelectItem>
                  <SelectItem value="full_time_employed">Full-time Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="financialNeed">Financial Need Statement</Label>
            <Textarea
              id="financialNeed"
              placeholder="Briefly describe your financial need for scholarship support"
              className="min-h-[120px]"
              {...financialForm.register("financialNeed")}
            />
          </div>
          <div className="mt-6">
            <Button type="submit" className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
              Save Financial Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FinancialInfoForm;
