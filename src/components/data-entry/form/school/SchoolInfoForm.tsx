
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SchoolInfoFormProps {
  schoolInfo: {
    name: string;
    location: string;
    contact_email: string;
    contact_phone: string;
    registration_number: string;
    description: string;
  };
  handleSchoolInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSchoolSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const SchoolInfoForm: React.FC<SchoolInfoFormProps> = ({
  schoolInfo,
  handleSchoolInfoChange,
  handleSchoolSubmit,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleSchoolSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">School Name *</Label>
          <Input 
            id="name" 
            name="name" 
            value={schoolInfo.name} 
            onChange={handleSchoolInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input 
            id="location" 
            name="location" 
            value={schoolInfo.location} 
            onChange={handleSchoolInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email *</Label>
          <Input 
            id="contact_email" 
            name="contact_email" 
            type="email" 
            value={schoolInfo.contact_email} 
            onChange={handleSchoolInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone *</Label>
          <Input 
            id="contact_phone" 
            name="contact_phone" 
            value={schoolInfo.contact_phone} 
            onChange={handleSchoolInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registration_number">Registration Number *</Label>
          <Input 
            id="registration_number" 
            name="registration_number" 
            value={schoolInfo.registration_number} 
            onChange={handleSchoolInfoChange} 
            required 
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={schoolInfo.description} 
          onChange={handleSchoolInfoChange} 
          rows={4} 
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Register School"}
      </Button>
    </form>
  );
};

export default SchoolInfoForm;
