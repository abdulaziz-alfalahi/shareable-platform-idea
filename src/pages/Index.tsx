
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import SearchBar from "@/components/home/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Backpack, 
  FileText, 
  FileEdit, 
  MapPin, 
  Award, 
  Users, 
  GraduationCap, 
  School, 
  Clipboard,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-emirati-sandstone">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Services Section */}
      <main className="flex-1 container mx-auto py-12 px-4">
        <section className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-emirati-oasisGreen mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your gateway to employment opportunities, career development resources, and professional growth in the UAE.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/student-dashboard" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Backpack className="text-emirati-oasisGreen" />
                  Student Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Explore career pathways, assess your skills, and discover personalized job recommendations.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/job-applications" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <FileText className="text-emirati-oasisGreen" />
                  Job Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Apply for jobs, track your applications, and receive status updates in real-time.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/resume-builder" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <FileEdit className="text-emirati-oasisGreen" />
                  Resume Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Create and customize your professional resume with templates designed for UAE employers.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/job-location-matching" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <MapPin className="text-emirati-oasisGreen" />
                  Job Location Matching
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Find jobs near your preferred locations throughout the UAE with our interactive map tool.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/achievements" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Award className="text-emirati-oasisGreen" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Track your career milestones, skills development progress, and earn recognition badges.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/recruiter-dashboard" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Users className="text-emirati-oasisGreen" />
                  Recruiter Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  For employers to post jobs, review applications, and find qualified Emirati candidates.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/training-centers" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <School className="text-emirati-oasisGreen" />
                  Training Centers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Discover specialized training programs to enhance your skills and career prospects.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/assessment-centers" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <Clipboard className="text-emirati-oasisGreen" />
                  Assessment Centers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Evaluate your skills and competencies through professional assessment services.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/advisor-dashboard" className="no-underline group">
            <Card className="h-full transition-all duration-300 hover:shadow-md border-emirati-desertGold/30 hover:border-emirati-desertGold group-hover:translate-y-[-5px]">
              <CardHeader className="bg-gradient-to-r from-emirati-oasisGreen/10 to-transparent border-b">
                <CardTitle className="text-emirati-oasisGreen flex items-center gap-2">
                  <GraduationCap className="text-emirati-oasisGreen" />
                  Advisor Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  For academic advisors and career coaches to track student progress and provide feedback.
                </p>
                <div className="flex items-center mt-4 text-sm text-emirati-oasisGreen font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-emirati-oasisGreen mb-4">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-all duration-300 border-emirati-desertGold/30 hover:border-emirati-desertGold">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="text-emirati-oasisGreen h-6 w-6" />
                  <span>Career Counseling</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with experienced career counselors for personalized guidance and support.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300 border-emirati-desertGold/30 hover:border-emirati-desertGold">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <TrendingUp className="text-emirati-oasisGreen h-6 w-6" />
                  <span>Skills Training Programs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Enhance your skills with industry-recognized training programs and workshops.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
