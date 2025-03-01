
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, ChevronRightIcon, FileTextIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-emirati-oasisGreen">Welcome to the Emirati Professional Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-emirati-desertGold hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-emirati-oasisGreen">Resume Builder</CardTitle>
            <CardDescription>Create a professional resume to showcase your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-emirati-camelBrown">Our resume builder helps you create a standout resume tailored for the UAE job market.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/resume-builder")} 
              className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
            >
              <FileTextIcon className="mr-2 h-4 w-4" /> Build Your Resume <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-emirati-desertGold hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-emirati-oasisGreen">Job Applications</CardTitle>
            <CardDescription>Track and manage your job applications in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-emirati-camelBrown">Keep track of your job applications, interviews, and offers with our simple tracking tool.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/job-applications")} 
              className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
            >
              <BriefcaseIcon className="mr-2 h-4 w-4" /> Track Applications <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
