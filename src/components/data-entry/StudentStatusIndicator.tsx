
import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { StatusType } from "./types";

interface StudentStatusIndicatorProps {
  status: StatusType;
}

export const getStatusLabel = (status: StatusType) => {
  switch (status) {
    case "verified":
      return "Verified";
    case "pending":
      return "Pending Verification";
    case "error":
      return "Data Issues";
  }
};

export const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending":
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />;
  }
};

const StudentStatusIndicator: React.FC<StudentStatusIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      {getStatusIcon(status)}
      <span className="text-sm">{getStatusLabel(status)}</span>
    </div>
  );
};

export default StudentStatusIndicator;
