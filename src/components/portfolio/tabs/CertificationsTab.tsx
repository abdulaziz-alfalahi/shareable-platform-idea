
import React from "react";
import PortfolioItemsGrid from "../PortfolioItemsGrid";
import { PortfolioItem } from "../PortfolioItemCard";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";
import { GraduationCap } from "lucide-react";

interface CertificationsTabProps {
  portfolioItems: PortfolioItem[];
  onAddItem: (newItem: PortfolioItem) => void;
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ portfolioItems, onAddItem }) => {
  return (
    <div className="relative">
      <UaeGeometricPattern 
        type="mashrabiya" 
        position="corner" 
        className="absolute top-0 right-0" 
        opacity={0.05} 
      />
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-emirati-camelBrown/10 p-2 rounded-full">
          <GraduationCap className="h-5 w-5 text-emirati-camelBrown" />
        </div>
        <h2 className="text-2xl font-bold text-emirati-deepBrown">Your Certifications</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Track your educational achievements and professional certifications. Add details about skills gained and accrediting organizations.
      </p>
      
      <PortfolioItemsGrid items={portfolioItems} filterType="certification" onAddItem={onAddItem} />
    </div>
  );
};

export default CertificationsTab;
