
import React from "react";
import PassportMainContent from "@/components/passport/PassportMainContent";
import { usePassportData } from "@/hooks/passport/usePassportData";

const CareerPassport: React.FC = () => {
  // Get the student data from the hook
  const { student, loading, error } = usePassportData();

  if (loading) {
    return <div>Loading passport data...</div>;
  }

  if (error || !student) {
    return <div>Error loading passport data</div>;
  }

  return <PassportMainContent student={student} />;
};

export default CareerPassport;
