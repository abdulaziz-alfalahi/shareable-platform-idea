
import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import NoteInput from "./notes/NoteInput";
import CharacterCounter from "./notes/CharacterCounter";
import AutosaveIndicator from "./notes/AutosaveIndicator";

interface NotesFieldProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({
  notes,
  setNotes,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const maxLength = 500; // Maximum character limit

  // Simulated autosave functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (notes.trim() !== "") {
        setIsSaving(true);
        
        // Simulate saving delay
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [notes]);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="notes">Interview Notes (Optional)</Label>
        <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
      </div>
      <NoteInput
        notes={notes}
        setNotes={setNotes}
        maxLength={maxLength}
      />
      <CharacterCounter current={notes.length} maximum={maxLength} />
    </div>
  );
};

export default NotesField;
