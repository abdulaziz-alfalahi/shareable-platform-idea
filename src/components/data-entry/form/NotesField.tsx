
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="additionalNotes">Additional Notes</Label>
      <Textarea 
        id="additionalNotes" 
        name="additionalNotes" 
        value={value}
        onChange={onChange}
        placeholder="Any additional information about the student..."
        rows={4}
      />
    </div>
  );
};

export default NotesField;
