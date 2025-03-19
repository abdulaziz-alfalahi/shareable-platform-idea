
import React from "react";
import PortfolioItemCard, { PortfolioItem } from "./PortfolioItemCard";
import AddItemCard from "./AddItemCard";

interface PortfolioItemsGridProps {
  items: PortfolioItem[];
  filterType?: string;
  onAddItem: (newItem: PortfolioItem) => void;
}

const PortfolioItemsGrid: React.FC<PortfolioItemsGridProps> = ({ 
  items, 
  filterType,
  onAddItem
}) => {
  const filteredItems = filterType 
    ? items.filter(item => item.type === filterType)
    : items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {filteredItems.map((item) => (
        <PortfolioItemCard key={item.id} item={item} />
      ))}

      {/* Add new item card */}
      <AddItemCard onAddItem={onAddItem} />
    </div>
  );
};

export default PortfolioItemsGrid;
