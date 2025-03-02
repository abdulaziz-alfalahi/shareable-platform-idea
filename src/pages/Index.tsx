
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on role
      switch (user?.role) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'advisor':
          navigate('/advisor-dashboard');
          break;
        case 'recruiter':
          navigate('/recruiter-dashboard');
          break;
        default:
          navigate('/login');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your pathway to career success in the UAE
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting students, advisors, and recruiters for seamless career development and job placement.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button onClick={handleGetStarted} size="lg">
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Button>
                  {!isAuthenticated && (
                    <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  width={550}
                  height={310}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
              <p className="text-gray-500">
                Our platform offers a comprehensive set of tools for students, advisors, and recruiters.
              </p>
            </div>
            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
              <div className="space-y-2 rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="text-xl font-bold">For Students</h3>
                <p className="text-gray-500">
                  Resume building, job applications, skill development tracking, and personalized career guidance.
                </p>
              </div>
              <div className="space-y-2 rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="text-xl font-bold">For Advisors</h3>
                <p className="text-gray-500">
                  Student progress monitoring, performance analytics, and efficient communication tools.
                </p>
              </div>
              <div className="space-y-2 rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="text-xl font-bold">For Recruiters</h3>
                <p className="text-gray-500">
                  Vacancy management, candidate search, interview scheduling, and intern tracking.
                </p>
              </div>
              <div className="space-y-2 rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="text-xl font-bold">UAE Pass Integration</h3>
                <p className="text-gray-500">
                  Seamless authentication and identity verification using the UAE's digital identity platform (coming soon).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full items-center border-t px-4 py-6 md:px-6">
        <p className="text-sm text-gray-500">© 2023 CareerLink UAE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
