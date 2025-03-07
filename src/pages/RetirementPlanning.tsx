
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RetirementSimulator from "@/components/retirement/RetirementSimulator";

const RetirementPlanning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">
          Retirement Planning
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-emirati-sandBeige/10 p-6 rounded-lg border border-emirati-sandBeige/20">
          <h2 className="text-xl font-semibold text-emirati-desertRed mb-3">About Emirati Retirement</h2>
          <p className="text-gray-700 mb-4">
            Planning for retirement is an essential part of every Emirati's career journey. The UAE government provides a pension system 
            for Emirati nationals, but supplementary planning can help ensure a comfortable and fulfilling retirement.
          </p>
          <p className="text-gray-700">
            Use our retirement simulator to explore different scenarios and plan your journey from career to retirement. The tool considers factors 
            like your current age, intended retirement age, and savings strategy to provide personalized guidance.
          </p>
        </div>
      </div>

      <RetirementSimulator />
    </div>
  );
};

export default RetirementPlanning;
