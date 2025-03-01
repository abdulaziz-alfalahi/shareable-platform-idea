
import React from "react";

interface StudentNotesProps {
  notes: string;
}

const StudentNotes: React.FC<StudentNotesProps> = ({ notes }) => {
  return (
    <div>
      <h3 className="font-medium">Advising Notes</h3>
      <div className="mt-1 p-3 bg-muted rounded-md text-sm">
        {notes}
      </div>
    </div>
  );
};

export default StudentNotes;
