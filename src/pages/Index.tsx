
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  FileText, 
  MapPin, 
  Award, 
  BookOpen,
  User,
  Users
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const applications = [
    {
      title: "Resume Builder",
      description: "Create professional resumes tailored to your dream job",
      icon: <FileText className="h-5 w-5" />,
      path: "/resume-builder",
    },
    {
      title: "Job Applications",
      description: "Track and manage your job applications in one place",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/job-applications",
    },
    {
      title: "Job Location Matching",
      description: "Find jobs that match your preferred locations",
      icon: <MapPin className="h-5 w-5" />,
      path: "/job-location-matching",
    },
    {
      title: "Achievements",
      description: "Showcase your personal and academic achievements",
      icon: <Award className="h-5 w-5" />,
      path: "/achievements",
    },
    {
      title: "Student Dashboard",
      description: "View your academic progress and career opportunities",
      icon: <GraduationCap className="h-5 w-5" />,
      path: "/student-dashboard",
    },
    {
      title: "Recruiter Dashboard",
      description: "Manage job vacancies and find top matching candidates",
      icon: <Users className="h-5 w-5" />,
      path: "/recruiter-dashboard",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 md:px-6 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Career Services Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering students and graduates to build their careers and connect with employers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">{app.icon}</div>
              <div>
                <CardTitle>{app.title}</CardTitle>
                <CardDescription className="mt-1.5">{app.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => navigate(app.path)}
              >
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
