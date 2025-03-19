
import React from "react";
import InternshipCard from "./InternshipCard";
import { Internship } from "@/data/internshipsData";

interface InternshipListProps {
  internships: Internship[];
}

const InternshipList: React.FC<InternshipListProps> = ({ internships }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-emirati-deepBrown mb-6">Featured Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
};

export default InternshipList;
