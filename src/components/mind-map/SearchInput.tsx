
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search journeys, steps, skills..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 border-emirati-sandBeige focus-visible:ring-emirati-desertGold"
      />
    </div>
  );
};

export default SearchInput;
