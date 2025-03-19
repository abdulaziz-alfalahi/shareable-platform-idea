
import React from "react";

const ParentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Parent Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Student Progress</h2>
          <p className="text-gray-600">View your child's academic progress and achievements.</p>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Career Guidance</h2>
          <p className="text-gray-600">Explore career options and pathways for your child.</p>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Stay informed about school events and meetings.</p>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Resources</h2>
          <p className="text-gray-600">Access educational resources and support materials.</p>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Scholarships</h2>
          <p className="text-gray-600">Explore scholarship opportunities for your child.</p>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Communication</h2>
          <p className="text-gray-600">Message teachers and school administrators.</p>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
