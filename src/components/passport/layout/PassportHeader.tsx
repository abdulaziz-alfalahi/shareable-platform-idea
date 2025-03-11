
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award, 
  ChevronLeft, 
  Share2, 
  Download, 
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";
import { notifySuccess } from "@/utils/notification";

// UAE-inspired theme colors
const UAE_THEME = {
  header: "bg-gradient-to-r from-red-600 to-red-700", // Red from UAE flag
  accent: "from-green-600 to-green-700", // Green from UAE flag
  pattern: "bg-[url('/images/arabic-pattern.png')] bg-opacity-5" // Would need to add this pattern image
};

interface PassportHeaderProps {
  student: Student;
}

const PassportHeader: React.FC<PassportHeaderProps> = ({ student }) => {
  const navigate = useNavigate();

  const handleShareProfile = () => {
    notifySuccess({
      title: "Profile Shared",
      description: "Your Career Passport has been shared successfully."
    });
  };

  const handleDownloadPassport = () => {
    notifySuccess({
      title: "Passport Downloaded",
      description: "Your Career Passport has been downloaded as a PDF."
    });
  };

  return (
    <div className={`rounded-lg ${UAE_THEME.header} p-6 mb-8 relative overflow-hidden`}>
      <div className={`absolute inset-0 ${UAE_THEME.pattern} opacity-10`}></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <Button variant="ghost" className="text-white" onClick={() => navigate("/student-dashboard")}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-white" onClick={handleShareProfile}>
              <Share2 className="mr-1 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" className="text-white" onClick={handleDownloadPassport}>
              <Download className="mr-1 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
        
        <div className="mt-8 md:mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Career Passport</h1>
              <p className="text-white/80">Track your journey and showcase your achievements</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-sm">Passport Holder</span>
              <span className="text-lg font-bold">{student.name}</span>
              <div className="flex items-center mt-1 text-xs">
                <UserCheck className="h-3 w-3 mr-1" /> 
                <span>Verified Student</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportHeader;
