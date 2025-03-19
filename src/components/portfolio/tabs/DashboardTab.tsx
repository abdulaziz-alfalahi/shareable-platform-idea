
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import CompletionStatusSection from "../CompletionStatusSection";
import { PortfolioItem } from "../PortfolioItemCard";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";
import { LayoutDashboard } from "lucide-react";

interface DashboardTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <div className="relative">
      <UaeGeometricPattern 
        type="dune" 
        position="corner" 
        className="absolute top-0 right-0" 
        opacity={0.05} 
      />
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-emirati-oasisGreen/10 p-2 rounded-full">
          <LayoutDashboard className="h-5 w-5 text-emirati-oasisGreen" />
        </div>
        <h2 className="text-2xl font-bold text-emirati-deepBrown">Your Portfolio Overview</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        A comprehensive view of your career portfolio. Track your progress and see all your professional achievements in one place.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <PortfolioItemsGrid items={portfolioItems} onAddItem={onAddItem} />
        </div>
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <CompletionStatusSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
