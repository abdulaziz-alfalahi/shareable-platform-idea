
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Award, Share2, Download, Shield } from "lucide-react";
import { Student } from "@/types/student";
import UaeGeometricPattern from "@/components/ui/uae/UaeGeometricPattern";

interface PassportHeaderProps {
  student: Student;
}

const PassportHeader: React.FC<PassportHeaderProps> = ({ student }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-emirati-oasisGreen to-emirati-palmGreen rounded-lg shadow-md overflow-hidden mb-8">
      <UaeGeometricPattern 
        type="arabesque" 
        position="background" 
        opacity={0.1} 
        className="absolute inset-0" 
      />
      
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4 md:mb-0 text-white hover:bg-white/10"
          >
            <ChevronLeft size={16} className="mr-1" /> Back
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
            >
              <Share2 size={16} className="mr-1" /> Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => alert("Download feature will be available soon!")}
            >
              <Download size={16} className="mr-1" /> Export
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start mt-6 gap-6">
          <div className="bg-white rounded-full p-4 shadow-md">
            <Award size={40} className="text-emirati-oasisGreen" />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Career Passport
            </h1>
            <p className="text-white/80 max-w-2xl">
              Your professional journey documented in one place. Track achievements, skills, and milestones throughout your career path.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:ml-auto">
            <div className="flex flex-col items-center md:items-start text-white">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} className="text-emirati-desertGold" />
                <span className="font-semibold">Passport Holder</span>
              </div>
              <span className="text-xl font-bold">{student.name}</span>
              <div className="mt-1 bg-emirati-desertGold/20 px-2 py-0.5 rounded text-xs">
                Level {student.passportLevel} • {student.totalPoints} points
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportHeader;
