
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";

interface CertificationsTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Certifications</h2>
      <PortfolioItemsGrid items={portfolioItems} filterType="certification" onAddItem={onAddItem} />
    </>
  );
};

export default CertificationsTab;
