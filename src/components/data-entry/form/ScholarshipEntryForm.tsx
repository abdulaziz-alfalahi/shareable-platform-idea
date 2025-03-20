
import React from "react";
import ScholarshipForm from "./scholarship/ScholarshipForm";

interface ScholarshipEntryFormProps {
  onSuccess?: () => void;
}

const ScholarshipEntryForm: React.FC<ScholarshipEntryFormProps> = ({ onSuccess }) => {
  return <ScholarshipForm onSuccess={onSuccess} />;
};

export default ScholarshipEntryForm;
