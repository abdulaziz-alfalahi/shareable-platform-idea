
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Program } from "./types";

interface ProgramFormProps {
  program: Program;
  programs: Program[];
  handleProgramChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setProgram: (program: React.SetStateAction<Program>) => void;
  addProgram: () => void;
  removeProgram: (id: number) => void;
  handleUniversitySubmit: () => void;
  isSubmitting: boolean;
}

const ProgramForm: React.FC<ProgramFormProps> = ({
  program,
  programs,
  handleProgramChange,
  setProgram,
  addProgram,
  removeProgram,
  handleUniversitySubmit,
  isSubmitting
}) => {
  return (
    <div className="space-y-6">
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Add Educational Program</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="program_name">Program Name *</Label>
            <Input 
              id="program_name" 
              name="name" 
              value={program.name} 
              onChange={handleProgramChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="degree_level">Degree Level *</Label>
            <Select 
              value={program.degree_level} 
              onValueChange={(value) => setProgram(prev => ({ ...prev, degree_level: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select degree level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelors">Bachelor's</SelectItem>
                <SelectItem value="masters">Master's</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration" 
              name="duration" 
              value={program.duration} 
              onChange={handleProgramChange} 
              placeholder="e.g., 4 years, 2 semesters" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Input 
              id="credits" 
              name="credits" 
              value={program.credits} 
              onChange={handleProgramChange} 
              placeholder="e.g., 120 credits" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input 
              id="department" 
              name="department" 
              value={program.department} 
              onChange={handleProgramChange} 
            />
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <Label htmlFor="program_description">Description</Label>
          <Textarea 
            id="program_description" 
            name="description" 
            value={program.description} 
            onChange={handleProgramChange} 
            rows={3} 
          />
        </div>
        
        <Button type="button" onClick={addProgram} className="flex gap-2 items-center">
          <PlusCircle className="h-4 w-4" />
          Add Program
        </Button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Added Programs</h3>
        
        {programs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No programs added yet</p>
        ) : (
          <div className="space-y-4">
            {programs.map((p) => (
              <div key={p.id} className="border rounded-md p-4 flex justify-between">
                <div>
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-sm text-gray-500">
                    {p.degree_level} {p.duration && `• ${p.duration}`} {p.credits && `• ${p.credits} credits`}
                  </p>
                  {p.description && <p className="text-sm mt-2">{p.description}</p>}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeProgram(p.id!)}
                  className="text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button onClick={handleUniversitySubmit} disabled={isSubmitting} className="mt-4">
              {isSubmitting ? "Saving..." : "Save All Programs"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramForm;
