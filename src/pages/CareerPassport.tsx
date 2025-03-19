
import React from "react";
import PassportMainContent from "@/components/passport/PassportMainContent";
import { studentData } from "@/data/studentMockData";

const CareerPassport: React.FC = () => {
  // Use mock data directly since usePassportData hook is not working as expected
  const student = studentData;
  const loading = false;
  const error = null;

  if (loading) {
    return <div>Loading passport data...</div>;
  }

  if (error || !student) {
    return <div>Error loading passport data</div>;
  }

  return <PassportMainContent student={student} />;
};

export default CareerPassport;
