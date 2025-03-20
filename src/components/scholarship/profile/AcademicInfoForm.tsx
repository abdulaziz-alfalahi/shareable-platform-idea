
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AcademicInfoFormProps {
  academicForm: UseFormReturn<any>;
  saveAcademicInfo: (data: any) => Promise<void>;
}

const AcademicInfoForm: React.FC<AcademicInfoFormProps> = ({ academicForm, saveAcademicInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
        <CardDescription>
          Provide details about your educational background.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={academicForm.handleSubmit(saveAcademicInfo)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="school">School/University</Label>
              <Input
                id="school"
                placeholder="Enter your school or university"
                {...academicForm.register("school")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Select
                value={academicForm.watch("degree")}
                onValueChange={(value) => academicForm.setValue("degree", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="associate">Associate's Degree</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="doctoral">Doctoral Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major/Field of Study</Label>
              <Input
                id="major"
                placeholder="Enter your major"
                {...academicForm.register("major")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                placeholder="Enter your GPA"
                {...academicForm.register("gpa")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Expected Graduation Year</Label>
              <Input
                id="graduationYear"
                placeholder="Enter your graduation year"
                {...academicForm.register("graduationYear")}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
              Save Academic Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AcademicInfoForm;
