
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CandidateFieldsProps {
  candidateName: string;
  setCandidateName: (name: string) => void;
  position: string;
  setPosition: (position: string) => void;
}

const CandidateFields: React.FC<CandidateFieldsProps> = ({
  candidateName,
  setCandidateName,
  position,
  setPosition,
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="candidateName">Candidate Name</Label>
        <Input
          id="candidateName"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Enter candidate name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Enter position title"
        />
      </div>
    </>
  );
};

export default CandidateFields;
