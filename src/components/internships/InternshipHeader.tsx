
import React from "react";
import { Button } from "@/components/ui/button";

const InternshipHeader: React.FC = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emirati-deepBrown mb-2">Internship Programs</h1>
        <p className="text-emirati-deepBrown/70">
          Discover internship opportunities specifically designed for UAE nationals to gain practical experience and develop professional skills.
        </p>
      </div>

      <div className="bg-emirati-sandBeige/20 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-emirati-oasisGreen">Why Internships Matter</h2>
            <p className="text-emirati-deepBrown/80 mt-1">
              Internships provide valuable workplace experience and help bridge the gap between academic learning and professional practice.
            </p>
          </div>
          <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
            Register for Alerts
          </Button>
        </div>
      </div>
    </>
  );
};

export default InternshipHeader;
