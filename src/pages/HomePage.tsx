
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emirati-oasisGreen mb-6">Emirati Career Platform</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Career Journey</h2>
        <p className="text-gray-700 mb-4">
          This platform is designed to guide Emiratis through their entire career journey,
          from school to retirement, providing resources, opportunities, and personalized guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-emirati-desertGold mb-2">Career Pathways</h3>
            <p className="text-gray-600">Explore and plan your career journey with personalized pathways.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-emirati-desertGold mb-2">Job Opportunities</h3>
            <p className="text-gray-600">Discover jobs that match your skills and career goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-emirati-desertGold mb-2">Skill Development</h3>
            <p className="text-gray-600">Identify skills to develop and find relevant training programs.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-700 mb-4">
          Begin your journey by exploring job opportunities or checking your career progress.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a 
            href="/JobApplications" 
            className="px-6 py-3 bg-emirati-oasisGreen text-white rounded-md hover:bg-emirati-desertGold transition-colors"
          >
            Browse Job Opportunities
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
