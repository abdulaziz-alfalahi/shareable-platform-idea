
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UniversityInfo } from "./types";

interface UniversityInfoFormProps {
  universityInfo: UniversityInfo;
  handleUniversityInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleUniversitySubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const UniversityInfoForm: React.FC<UniversityInfoFormProps> = ({
  universityInfo,
  handleUniversityInfoChange,
  handleUniversitySubmit,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleUniversitySubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">University Name *</Label>
          <Input 
            id="name" 
            name="name" 
            value={universityInfo.name} 
            onChange={handleUniversityInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input 
            id="location" 
            name="location" 
            value={universityInfo.location} 
            onChange={handleUniversityInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email *</Label>
          <Input 
            id="contact_email" 
            name="contact_email" 
            type="email" 
            value={universityInfo.contact_email} 
            onChange={handleUniversityInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone *</Label>
          <Input 
            id="contact_phone" 
            name="contact_phone" 
            value={universityInfo.contact_phone} 
            onChange={handleUniversityInfoChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accreditation_number">Accreditation Number *</Label>
          <Input 
            id="accreditation_number" 
            name="accreditation_number" 
            value={universityInfo.accreditation_number} 
            onChange={handleUniversityInfoChange} 
            required 
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={universityInfo.description} 
          onChange={handleUniversityInfoChange} 
          rows={4} 
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Register University"}
      </Button>
    </form>
  );
};

export default UniversityInfoForm;
