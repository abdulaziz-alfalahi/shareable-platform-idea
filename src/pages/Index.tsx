
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Search Assistant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/resume-builder" 
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Resume Builder
          </h5>
          <p className="font-normal text-gray-700">
            Create and customize your professional resume
          </p>
        </Link>
        
        <Link 
          to="/job-applications" 
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Job Applications
          </h5>
          <p className="font-normal text-gray-700">
            Track and manage your job applications
          </p>
        </Link>
        
        <Link 
          to="/job-location-matching" 
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Location Matching
          </h5>
          <p className="font-normal text-gray-700">
            Find jobs in your preferred locations
          </p>
        </Link>
        
        <Link 
          to="/achievements" 
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Achievements
          </h5>
          <p className="font-normal text-gray-700">
            Track your progress and earn points
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Index;
