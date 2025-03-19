
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import CompletionStatusSection from "../CompletionStatusSection";
import { PortfolioItem } from "../PortfolioItemCard";

interface DashboardTabProps {
  portfolioItems: PortfolioItem[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ portfolioItems }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Portfolio Overview</h2>
      <PortfolioItemsGrid items={portfolioItems} />
      <CompletionStatusSection />
    </>
  );
};

export default DashboardTab;
