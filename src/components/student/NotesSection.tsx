
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface NotesSectionProps {
  notes: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advising Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-md">
          {notes || "No advising notes available."}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;
