
import { Link } from "react-router-dom";
import { FileText, Briefcase, MapPin, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4 bg-emirati-sandstone min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-emirati-oasisGreen">Job Search Assistant</h1>
        <p className="text-lg text-emirati-camelBrown max-w-2xl mx-auto">
          Your all-in-one platform for managing job applications, building professional resumes, and tracking your career progress.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/resume-builder" 
          className="flex flex-col bg-white rounded-lg border border-emirati-desertGold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="bg-emirati-oasisGreen p-4 rounded-t-lg flex items-center justify-center">
            <FileText className="text-white h-8 w-8" />
          </div>
          <div className="p-6 flex-grow">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-emirati-oasisGreen">
              Resume Builder
            </h5>
            <p className="font-normal text-emirati-camelBrown">
              Create professional resumes with templates, export to PDF, and import from existing sources
            </p>
          </div>
        </Link>
        
        <Link 
          to="/job-applications" 
          className="flex flex-col bg-white rounded-lg border border-emirati-desertGold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="bg-emirati-oasisGreen p-4 rounded-t-lg flex items-center justify-center">
            <Briefcase className="text-white h-8 w-8" />
          </div>
          <div className="p-6 flex-grow">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-emirati-oasisGreen">
              Job Applications
            </h5>
            <p className="font-normal text-emirati-camelBrown">
              Track and manage your job applications, deadlines, and interview status
            </p>
          </div>
        </Link>
        
        <Link 
          to="/job-location-matching" 
          className="flex flex-col bg-white rounded-lg border border-emirati-desertGold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="bg-emirati-oasisGreen p-4 rounded-t-lg flex items-center justify-center">
            <MapPin className="text-white h-8 w-8" />
          </div>
          <div className="p-6 flex-grow">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-emirati-oasisGreen">
              Location Matching
            </h5>
            <p className="font-normal text-emirati-camelBrown">
              Find jobs in your preferred locations with interactive map visualization
            </p>
          </div>
        </Link>
        
        <Link 
          to="/achievements" 
          className="flex flex-col bg-white rounded-lg border border-emirati-desertGold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div className="bg-emirati-oasisGreen p-4 rounded-t-lg flex items-center justify-center">
            <Award className="text-white h-8 w-8" />
          </div>
          <div className="p-6 flex-grow">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-emirati-oasisGreen">
              Achievements
            </h5>
            <p className="font-normal text-emirati-camelBrown">
              Track your progress, earn points, and celebrate your job search milestones
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
