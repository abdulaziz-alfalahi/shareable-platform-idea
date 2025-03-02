
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically implement actual search functionality
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative -mt-6 z-20">
      <form onSubmit={handleSearch} className="flex items-center shadow-lg rounded-md overflow-hidden">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search for jobs, courses, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-6 rounded-l-md border-r-0 focus-visible:ring-emirati-gold"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-emirati-gold hover:bg-emirati-gold/90 text-emirati-deepBlue rounded-l-none h-full py-6"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Search</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
