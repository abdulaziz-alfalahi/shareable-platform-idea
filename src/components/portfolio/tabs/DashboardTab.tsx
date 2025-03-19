
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import CompletionStatusSection from "../CompletionStatusSection";
import { PortfolioItem } from "../PortfolioItemCard";

interface DashboardTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Portfolio Overview</h2>
      <PortfolioItemsGrid items={portfolioItems} onAddItem={onAddItem} />
      <CompletionStatusSection />
    </>
  );
};

export default DashboardTab;
