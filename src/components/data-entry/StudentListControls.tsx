
import React from "react";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudentListControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

const StudentListControls: React.FC<StudentListControlsProps> = ({
  searchTerm,
  onSearchChange,
  onExport,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search by name, ID, or school..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onExport}
      >
        <Download size={16} />
        Export Records
      </Button>
    </div>
  );
};

export default StudentListControls;
