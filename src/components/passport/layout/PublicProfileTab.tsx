
import React from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

// This component currently doesn't use the student prop, but we're adding it
// to match how it's being called from PassportTabsContent
interface PublicProfileTabProps {
  student?: Student; // Make it optional for backward compatibility
}

const PublicProfileTab: React.FC<PublicProfileTabProps> = ({ student }) => {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Public Profile</h2>
      <p className="text-muted-foreground mb-6">
        This is how your Career Passport appears to potential employers and mentors.
      </p>
      
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium">Currently Visible to Employers:</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span>Education and achievements</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span>Skills and certifications</span>
            </li>
            <li className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span>Career milestones</span>
            </li>
            <li className="flex items-center">
              <span className="bg-yellow-500 h-2 w-2 rounded-full mr-2"></span>
              <span>Project portfolio (partial)</span>
            </li>
            <li className="flex items-center">
              <span className="bg-red-500 h-2 w-2 rounded-full mr-2"></span>
              <span>Personal goals and feedback</span>
            </li>
          </ul>
        </div>
        
        <Button>Manage Privacy Settings</Button>
      </div>
    </div>
  );
};

export default PublicProfileTab;
