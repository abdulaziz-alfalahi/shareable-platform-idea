
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";

interface CertificationsTabProps {
  portfolioItems: PortfolioItem[];
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ portfolioItems }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Your Certifications</h2>
      <PortfolioItemsGrid items={portfolioItems} filterType="certification" />
    </>
  );
};

export default CertificationsTab;
