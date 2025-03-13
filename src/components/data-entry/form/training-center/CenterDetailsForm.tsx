
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrainingCenterData } from "./types";

interface CenterDetailsFormProps {
  formData: TrainingCenterData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClearForm: () => void;
  onNext: () => void;
}

const CenterDetailsForm: React.FC<CenterDetailsFormProps> = ({
  formData,
  handleChange,
  onClearForm,
  onNext
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Center Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="license_number">License Number</Label>
        <Input
          id="license_number"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClearForm}
        >
          Clear Form
        </Button>
        <Button 
          type="button" 
          onClick={onNext}
        >
          Next: Add Programs
        </Button>
      </div>
    </div>
  );
};

export default CenterDetailsForm;
