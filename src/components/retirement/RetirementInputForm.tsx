
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Banknote } from "lucide-react";

interface RetirementInputFormProps {
  onSimulate: (formData: {
    currentAge: number;
    retirementAge: number;
    currentSalary: number;
    monthlySavings: number;
    currentSavings: number;
    investmentStyle: 'conservative' | 'moderate' | 'aggressive';
    postRetirementWork: boolean;
  }) => void;
  isSimulating: boolean;
  initialFormData?: {
    currentAge: number;
    retirementAge: number;
    currentSalary: number;
    monthlySavings: number;
    currentSavings: number;
    investmentStyle: 'conservative' | 'moderate' | 'aggressive';
    postRetirementWork: boolean;
  };
}

const RetirementInputForm: React.FC<RetirementInputFormProps> = ({
  onSimulate,
  isSimulating,
  initialFormData
}) => {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 60,
    currentSalary: 25000,
    monthlySavings: 5000,
    currentSavings: 100000,
    investmentStyle: 'moderate' as 'conservative' | 'moderate' | 'aggressive',
    postRetirementWork: false
  });

  // Update form data when initialFormData changes
  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              name="currentAge"
              type="number"
              value={formData.currentAge}
              onChange={handleInputChange}
              min={18}
              max={70}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retirementAge">Planned Retirement Age</Label>
            <Input
              id="retirementAge"
              name="retirementAge"
              type="number"
              value={formData.retirementAge}
              onChange={handleInputChange}
              min={45}
              max={75}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSalary">Current Monthly Salary (AED)</Label>
            <Input
              id="currentSalary"
              name="currentSalary"
              type="number"
              value={formData.currentSalary}
              onChange={handleInputChange}
              min={0}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthlySavings">Monthly Savings (AED)</Label>
            <Input
              id="monthlySavings"
              name="monthlySavings"
              type="number"
              value={formData.monthlySavings}
              onChange={handleInputChange}
              min={0}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Savings (AED)</Label>
            <Input
              id="currentSavings"
              name="currentSavings"
              type="number"
              value={formData.currentSavings}
              onChange={handleInputChange}
              min={0}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentStyle">Investment Style</Label>
            <Select
              value={formData.investmentStyle}
              onValueChange={(value) => handleSelectChange('investmentStyle', value)}
            >
              <SelectTrigger id="investmentStyle">
                <SelectValue placeholder="Select investment style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative (4-6% return)</SelectItem>
                <SelectItem value="moderate">Moderate (6-8% return)</SelectItem>
                <SelectItem value="aggressive">Aggressive (8-10% return)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="postRetirementWork"
          checked={formData.postRetirementWork}
          onCheckedChange={(checked) => handleSwitchChange('postRetirementWork', checked)}
        />
        <Label htmlFor="postRetirementWork">Plan to work part-time after retirement</Label>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          disabled={isSimulating}
          className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
        >
          {isSimulating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              Run Simulation
              <Banknote className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default RetirementInputForm;
