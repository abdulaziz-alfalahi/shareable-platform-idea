
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradeUpload, Program } from "./types";

interface GradeUploadFormProps {
  gradeUpload: GradeUpload;
  programs: Program[];
  handleGradeUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleGradeUpload: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const GradeUploadForm: React.FC<GradeUploadFormProps> = ({
  gradeUpload,
  programs,
  handleGradeUploadChange,
  handleSelectChange,
  handleGradeUpload,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleGradeUpload}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="program_select">Program *</Label>
          <Select 
            value={gradeUpload.program} 
            onValueChange={(value) => handleSelectChange("program", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((p) => (
                <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
              ))}
              <SelectItem value="computer_science">Computer Science</SelectItem>
              <SelectItem value="business_admin">Business Administration</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="academic_year">Academic Year *</Label>
          <Input 
            id="academic_year" 
            name="academic_year" 
            value={gradeUpload.academic_year} 
            onChange={handleGradeUploadChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="semester">Semester *</Label>
          <Select 
            value={gradeUpload.semester} 
            onValueChange={(value) => handleSelectChange("semester", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <Label htmlFor="grade-file">Upload File (Excel or CSV) *</Label>
        <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
          <FileUp className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop or click to select</p>
          <Input 
            id="grade-file" 
            name="file" 
            type="file" 
            accept=".xlsx,.xls,.csv"
            onChange={handleGradeUploadChange} 
            className="max-w-xs"
            required 
          />
        </div>
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Upload Grades"}
      </Button>
    </form>
  );
};

export default GradeUploadForm;
