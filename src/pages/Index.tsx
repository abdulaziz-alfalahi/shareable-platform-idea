import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Backpack, FileText, FileEdit, MapPin, Award, Users, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-emirati-sandstone">
      <header className="bg-emirati-oasisGreen p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Emirati Employment Gateway</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
            <a href="#" className="text-white hover:underline">
              About
            </a>
            <a href="#" className="text-white hover:underline">
              Services
            </a>
            <a href="#" className="text-white hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-emirati-oasisGreen mb-4">
            Empowering Emirati Careers
          </h2>
          <p className="text-lg text-gray-700">
            Your gateway to employment opportunities, career development resources, and professional growth in the UAE.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/student-dashboard" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Backpack />
                  Student Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Explore career pathways, assess your skills, and discover personalized job recommendations.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/job-applications" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <FileText />
                  Job Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Apply for jobs, track your applications, and receive status updates in real-time.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/resume-builder" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <FileEdit />
                  Resume Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Create and customize your professional resume with templates designed for UAE employers.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/job-location-matching" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <MapPin />
                  Job Location Matching
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Find jobs near your preferred locations throughout the UAE with our interactive map tool.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/achievements" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Award />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Track your career milestones, skills development progress, and earn recognition badges.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/recruiter-dashboard" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Users />
                  Recruiter Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  For employers to post jobs, review applications, and find qualified Emirati candidates.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/advisor-dashboard" className="no-underline">
            <Card className="h-full transition-transform hover:scale-[1.02]">
              <CardHeader className="bg-emirati-oasisGreen/10 border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <GraduationCap />
                  Advisor Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  For academic advisors and career coaches to track student progress and provide feedback.
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-emirati-oasisGreen mb-4">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Career Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with experienced career counselors for personalized guidance and support.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enhance your skills with industry-recognized training programs and workshops.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-emirati-deepBrown text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Emirati Employment Gateway. All rights reserved.</p>
          <nav className="mt-4 space-x-4">
            <a href="#" className="text-white hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:underline">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
