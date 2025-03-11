
import React from "react";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface NoteInputProps {
  notes: string;
  setNotes: (notes: string) => void;
  maxLength: number;
}

const NoteInput: React.FC<NoteInputProps> = ({ notes, setNotes, maxLength }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setNotes(value);
    }
  };

  return (
    <div className="relative">
      <Textarea
        id="notes"
        value={notes}
        onChange={handleChange}
        placeholder="Add any interview details or preparation notes"
        className="pl-10 min-h-[100px] resize-y"
      />
      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default NoteInput;
