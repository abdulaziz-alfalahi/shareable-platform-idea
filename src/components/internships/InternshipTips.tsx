
import React from "react";
import { Users, GraduationCap, Building } from "lucide-react";

const InternshipTips: React.FC = () => {
  return (
    <div className="bg-emirati-desertGold/10 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold text-emirati-deepBrown mb-3">How To Maximize Your Internship Experience</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Build Connections</h3>
            <p className="text-sm text-muted-foreground">Network with professionals to develop relationships that can benefit your future career.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Learn Continuously</h3>
            <p className="text-sm text-muted-foreground">Ask questions, take notes, and seek feedback to enhance your learning experience.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-emirati-oasisGreen/20 flex items-center justify-center text-emirati-oasisGreen">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Understand the Culture</h3>
            <p className="text-sm text-muted-foreground">Observe and adapt to the company's culture to demonstrate your fit as a potential employee.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipTips;
