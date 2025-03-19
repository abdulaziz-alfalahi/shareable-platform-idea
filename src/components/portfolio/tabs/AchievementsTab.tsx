
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";
import { Award } from "lucide-react";

interface AchievementsTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <div className="relative">
      <UaeGeometricPattern 
        type="arabesque" 
        position="corner" 
        className="absolute top-0 right-0" 
        opacity={0.05} 
      />
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-emirati-desertGold/10 p-2 rounded-full">
          <Award className="h-5 w-5 text-emirati-desertGold" />
        </div>
        <h2 className="text-2xl font-bold text-emirati-deepBrown">Your Achievements</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Highlight your accomplishments, awards, and recognition. Document your success stories to build a compelling career narrative.
      </p>
      
      <PortfolioItemsGrid items={portfolioItems} filterType="achievement" onAddItem={onAddItem} />
    </div>
  );
};

export default AchievementsTab;
