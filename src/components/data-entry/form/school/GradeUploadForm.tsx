
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

interface GradeUploadFormProps {
  gradeUpload: {
    grade_level: string;
    academic_year: string;
    term: string;
    file: File | null;
  };
  handleGradeUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGradeUpload: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const GradeUploadForm: React.FC<GradeUploadFormProps> = ({
  gradeUpload,
  handleGradeUploadChange,
  handleGradeUpload,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleGradeUpload}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="grade_level">Grade Level *</Label>
          <Input 
            id="grade_level" 
            name="grade_level" 
            value={gradeUpload.grade_level} 
            onChange={handleGradeUploadChange} 
            required 
          />
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
          <Label htmlFor="term">Term *</Label>
          <Input 
            id="term" 
            name="term" 
            value={gradeUpload.term} 
            onChange={handleGradeUploadChange} 
            required 
          />
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
