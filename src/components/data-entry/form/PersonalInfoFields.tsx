
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentFormData } from "./types";

interface PersonalInfoFieldsProps {
  formData: StudentFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  handleChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="studentName">Student Full Name *</Label>
        <Input 
          id="studentName" 
          name="studentName" 
          value={formData.studentName}
          onChange={handleChange}
          placeholder="e.g. Mohammed Al Maktoum"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID</Label>
        <Input 
          id="studentId" 
          name="studentId" 
          value={formData.studentId}
          onChange={handleChange}
          placeholder="e.g. STU29384"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationalId">National ID / Emirates ID *</Label>
        <Input 
          id="nationalId" 
          name="nationalId" 
          value={formData.nationalId}
          onChange={handleChange}
          placeholder="e.g. 784-XXXX-XXXXXXX-X"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          name="email" 
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. student@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="school">School / Institution</Label>
        <Input 
          id="school" 
          name="school" 
          value={formData.school}
          onChange={handleChange}
          placeholder="e.g. UAE University"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="grade">Current Grade / Year</Label>
        <Input 
          id="grade" 
          name="grade" 
          value={formData.grade}
          onChange={handleChange}
          placeholder="e.g. Grade 10 / Year 2"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input 
          id="dateOfBirth" 
          name="dateOfBirth" 
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfoFields;
