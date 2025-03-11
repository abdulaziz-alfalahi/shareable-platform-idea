
import React from "react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NotesFieldProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({
  notes,
  setNotes,
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="notes">Interview Notes (Optional)</Label>
      <div className="relative">
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any interview details or preparation notes"
          className="pl-10"
        />
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default NotesField;
