
import React from "react";
import ServiceCard from "./ServiceCard";
import FeaturedResource from "./FeaturedResource";
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
  TrendingUp
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Backpack,
      title: "Student Dashboard",
      description: "Explore career pathways, assess your skills, and discover personalized job recommendations.",
      link: "/student-dashboard"
    },
    {
      icon: FileText,
      title: "Job Applications",
      description: "Apply for jobs, track your applications, and receive status updates in real-time.",
      link: "/job-applications"
    },
    {
      icon: FileEdit,
      title: "Resume Builder",
      description: "Create and customize your professional resume with templates designed for UAE employers.",
      link: "/resume-builder"
    },
    {
      icon: MapPin,
      title: "Job Location Matching",
      description: "Find jobs near your preferred locations throughout the UAE with our interactive map tool.",
      link: "/job-location-matching"
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Track your career milestones, skills development progress, and earn recognition badges.",
      link: "/achievements"
    },
    {
      icon: Users,
      title: "Recruiter Portal",
      description: "For employers to post jobs, review applications, and find qualified Emirati candidates.",
      link: "/recruiter-dashboard"
    },
    {
      icon: School,
      title: "Training Centers",
      description: "Discover specialized training programs to enhance your skills and career prospects.",
      link: "/training-centers"
    },
    {
      icon: Clipboard,
      title: "Assessment Centers",
      description: "Evaluate your skills and competencies through professional assessment services.",
      link: "/assessment-centers"
    },
    {
      icon: GraduationCap,
      title: "Advisor Dashboard",
      description: "For academic advisors and career coaches to track student progress and provide feedback.",
      link: "/advisor-dashboard"
    }
  ];

  const resources = [
    {
      icon: Users,
      title: "Career Counseling",
      description: "Connect with experienced career counselors for personalized guidance and support."
    },
    {
      icon: TrendingUp,
      title: "Skills Training Programs",
      description: "Enhance your skills with industry-recognized training programs and workshops."
    }
  ];

  return (
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
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            link={service.link}
          />
        ))}
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-emirati-oasisGreen mb-4">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <FeaturedResource
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesSection;
