
import React from "react";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active 
          ? "bg-emirati-oasisGreen text-white shadow-md" 
          : "bg-emirati-sandBeige/50 text-emirati-deepBrown hover:bg-emirati-sandBeige"
      )}
    >
      {children}
    </button>
  );
};

export default FilterButton;
