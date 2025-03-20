
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <Button variant="ghost" asChild className="mb-2 -ml-4">
          <Link to="/scholarships" className="flex items-center text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-emirati-deepBlue">Scholarship Profile</h1>
        <p className="text-gray-600 mt-2">
          Complete your profile to increase your chances of matching with scholarships.
        </p>
      </div>
      <Button asChild className="mt-4 md:mt-0 bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
        <Link to="/scholarships">Browse Scholarships</Link>
      </Button>
    </div>
  );
};

export default ProfileHeader;
