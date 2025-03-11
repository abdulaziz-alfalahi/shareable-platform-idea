
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Banknote } from "lucide-react";

const PassportHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
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
        Career Passport
      </h1>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/retirement-planning')}
        className="ml-auto"
      >
        <Banknote size={16} className="mr-1" /> Retirement Planning
      </Button>
    </div>
  );
};

export default PassportHeader;
