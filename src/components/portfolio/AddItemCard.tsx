
import React from "react";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddItemDialog from "./AddItemDialog";

interface AddItemCardProps {
  onAddItem: (newItem: any) => void;
}

const AddItemCard: React.FC<AddItemCardProps> = ({ onAddItem }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-dashed border-2 flex items-center justify-center h-[240px] cursor-pointer hover:bg-gray-50">
          <div className="text-center p-6">
            <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 font-medium">Add New Item</p>
          </div>
        </Card>
      </DialogTrigger>
      <AddItemDialog onAddItem={onAddItem} />
    </Dialog>
  );
};

export default AddItemCard;
