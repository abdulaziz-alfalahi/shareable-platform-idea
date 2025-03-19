
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";

interface AchievementsTabProps {
  portfolioItems: PortfolioItem[];
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ portfolioItems }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
      <PortfolioItemsGrid items={portfolioItems} filterType="achievement" />
    </>
  );
};

export default AchievementsTab;
