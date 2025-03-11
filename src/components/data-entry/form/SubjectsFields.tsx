
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubjectEntry } from "./types";

interface SubjectsFieldsProps {
  subjects: SubjectEntry[];
  handleSubjectChange: (index: number, field: 'name' | 'grade', value: string) => void;
  addSubject: () => void;
  removeSubject: (index: number) => void;
}

const SubjectsFields: React.FC<SubjectsFieldsProps> = ({
  subjects,
  handleSubjectChange,
  addSubject,
  removeSubject
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Academic Subjects & Grades</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={addSubject}
        >
          Add Subject
        </Button>
      </div>
      
      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-grow">
              <Input 
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="w-20">
              <Input 
                placeholder="Grade"
                value={subject.grade}
                onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSubject(index)}
              disabled={subjects.length <= 1}
            >
              <span className="sr-only">Remove</span>
              &times;
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsFields;
