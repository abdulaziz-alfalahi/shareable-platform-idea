
import React from "react";
import PortfolioItemCard, { PortfolioItem } from "./PortfolioItemCard";
import AddItemCard from "./AddItemCard";

interface PortfolioItemsGridProps {
  items: PortfolioItem[];
  filterType?: string;
}

const PortfolioItemsGrid: React.FC<PortfolioItemsGridProps> = ({ items, filterType }) => {
  const filteredItems = filterType 
    ? items.filter(item => item.type === filterType)
    : items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {filteredItems.map((item) => (
        <PortfolioItemCard key={item.id} item={item} />
      ))}

      {/* Add new item card */}
      <AddItemCard />
    </div>
  );
};

export default PortfolioItemsGrid;
