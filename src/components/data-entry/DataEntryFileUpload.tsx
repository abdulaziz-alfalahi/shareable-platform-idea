
import React, { useState } from "react";
import { Upload, File, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/toast";

const DataEntryFileUpload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<{
    valid: boolean;
    issues?: string[];
  } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Check if file is CSV or Excel
    const fileType = selectedFile.type;
    const validTypes = [
      'text/csv', 
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!validTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file (.csv, .xls, .xlsx)",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
    simulateValidation(selectedFile);
  };

  const simulateValidation = (file: File) => {
    setIsValidating(true);
    setValidationResults(null);
    
    // Simulate a validation process
    setTimeout(() => {
      setIsValidating(false);
      
      // For demo purposes, randomly show validation issues
      const hasIssues = Math.random() > 0.7;
      
      if (hasIssues) {
        setValidationResults({
          valid: false,
          issues: [
            "Row 23: Missing student ID",
            "Row 45: Invalid grade format",
            "Row 62: Course code doesn't match known courses"
          ]
        });
      } else {
        setValidationResults({ valid: true });
      }
    }, 2000);
  };

  const handleProcessFile = () => {
    if (!file || !validationResults?.valid) return;
    
    // In a real implementation, this would process the file and save to the database
    toast({
      title: "File processed successfully",
      description: `Processed ${file.name} with student records.`,
    });
    
    // Reset state
    setFile(null);
    setValidationResults(null);
  };

  const templateExamples = [
    { name: "Student Grades Template", format: "Excel", path: "/templates/student_grades.xlsx" },
    { name: "Course Completion Template", format: "CSV", path: "/templates/course_completion.csv" },
    { name: "Extracurricular Activities Template", format: "Excel", path: "/templates/extracurricular.xlsx" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Student Records</CardTitle>
          <CardDescription>
            Upload CSV or Excel files containing student data. Use our templates for correct formatting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-emirati-oasisGreen bg-emirati-oasisGreen/10' : 'border-gray-300'
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-emirati-sandstone/30 p-4 rounded-full">
                <Upload className="h-8 w-8 text-emirati-oasisGreen" />
              </div>
              
              {file ? (
                <div className="flex items-center space-x-2 bg-emirati-sandstone/20 px-4 py-2 rounded-lg">
                  <File className="h-5 w-5 text-emirati-deepBrown" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium">Drag and drop file here</h3>
                  <p className="text-gray-500 text-sm">or</p>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90 text-white py-2 px-4 rounded-md transition">
                      Browse files
                    </span>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept=".csv,.xls,.xlsx" 
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="text-xs text-gray-500">Supported formats: .csv, .xlsx, .xls</p>
                </>
              )}
            </div>
          </div>
          
          {isValidating && (
            <div className="mt-4 text-center p-4 bg-blue-50 rounded-lg">
              <div className="animate-pulse flex flex-col items-center">
                <div className="text-lg font-medium text-blue-600">Validating file...</div>
                <div className="text-sm text-blue-500 mt-1">
                  Checking for formatting issues and data validity
                </div>
              </div>
            </div>
          )}
          
          {validationResults && (
            <div className={`mt-4 p-4 rounded-lg ${
              validationResults.valid ? 'bg-green-50' : 'bg-amber-50'
            }`}>
              {validationResults.valid ? (
                <div className="flex items-center text-green-700">
                  <Check className="h-5 w-5 mr-2" />
                  <span>File validated successfully. Ready to process.</span>
                </div>
              ) : (
                <div className="text-amber-700">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Validation issues detected:</span>
                  </div>
                  <ul className="list-disc ml-10 mt-2 text-sm">
                    {validationResults.issues?.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setFile(null);
              setValidationResults(null);
            }}
          >
            Clear
          </Button>
          <Button 
            onClick={handleProcessFile}
            disabled={!file || !validationResults?.valid}
          >
            Process File
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Download Templates</CardTitle>
          <CardDescription>
            Use these templates to ensure your data is formatted correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templateExamples.map((template, i) => (
              <div key={i} className="border rounded-lg p-4 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <File className="h-6 w-6 text-emirati-deepBrown" />
                  <span className="text-xs bg-emirati-sandstone/30 px-2 py-1 rounded">
                    {template.format}
                  </span>
                </div>
                <h3 className="font-medium">{template.name}</h3>
                <Button variant="outline" size="sm" className="w-full mt-auto">
                  Download Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEntryFileUpload;
