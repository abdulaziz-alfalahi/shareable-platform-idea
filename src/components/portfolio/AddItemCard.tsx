
import React from "react";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AddItemCard: React.FC = () => {
  return (
    <Card className="border-dashed border-2 flex items-center justify-center h-[240px] cursor-pointer hover:bg-gray-50">
      <div className="text-center p-6">
        <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500 font-medium">Add New Item</p>
      </div>
    </Card>
  );
};

export default AddItemCard;
