
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Award, 
  ChevronLeft, 
  Share2, 
  Download, 
  UserCheck,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { students } from "@/data/mockData"; // This would be fetched from an API in a real app
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CareerPassport from "@/components/passport/CareerPassport";
import CareerMilestones from "@/components/passport/CareerMilestones";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";
import { notifySuccess } from "@/utils/notification";

// UAE-inspired theme colors and patterns
const UAE_THEME = {
  header: "bg-gradient-to-r from-red-600 to-red-700", // Red from UAE flag
  accent: "from-green-600 to-green-700", // Green from UAE flag
  pattern: "bg-[url('/images/arabic-pattern.png')] bg-opacity-5" // Would need to add this pattern image
};

const CareerPassportPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // In a real app, this would fetch the student data from an API
  React.useEffect(() => {
    // For demo, just use the first student if no ID provided
    const studentId = id ? parseInt(id, 10) : 1;
    const foundStudent = students.find(s => s.id === studentId);
    
    if (foundStudent) {
      setCurrentStudent(foundStudent);
    } else {
      // If no student found, use the first student
      setCurrentStudent(students[0]);
      toast({
        title: "Student Not Found",
        description: "Showing default student profile instead.",
        variant: "destructive"
      });
    }
  }, [id, toast]);

  const handleShareProfile = () => {
    notifySuccess({
      title: "Profile Shared",
      description: "Your Career Passport has been shared successfully."
    });
  };

  const handleDownloadPassport = () => {
    notifySuccess({
      title: "Passport Downloaded",
      description: "Your Career Passport has been downloaded as a PDF."
    });
  };

  if (!currentStudent) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
          <h2 className="text-xl font-semibold mt-4">Loading Career Passport...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header with UAE-inspired design */}
      <div className={`rounded-lg ${UAE_THEME.header} p-6 mb-8 relative overflow-hidden`}>
        <div className={`absolute inset-0 ${UAE_THEME.pattern} opacity-10`}></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <Button variant="ghost" className="text-white" onClick={() => navigate("/student-dashboard")}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" className="text-white" onClick={handleShareProfile}>
                <Share2 className="mr-1 h-4 w-4" /> Share
              </Button>
              <Button variant="ghost" className="text-white" onClick={handleDownloadPassport}>
                <Download className="mr-1 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
          
          <div className="mt-8 md:mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Career Passport</h1>
                <p className="text-white/80">Track your journey and showcase your achievements</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm">Passport Holder</span>
                <span className="text-lg font-bold">{currentStudent.name}</span>
                <div className="flex items-center mt-1 text-xs">
                  <UserCheck className="h-3 w-3 mr-1" /> 
                  <span>Verified Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar - Student info */}
        <div className="space-y-6">
          <div className="space-y-6">
            <CareerMilestones student={currentStudent} />
          </div>
        </div>

        {/* Main content - Career Passport */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="passport" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="passport">Passport</TabsTrigger>
              <TabsTrigger value="profile">Public Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="passport" className="mt-6">
              <CareerPassport student={currentStudent} />
            </TabsContent>
            
            <TabsContent value="profile" className="mt-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Public Profile</h2>
                <p className="text-muted-foreground mb-6">
                  This is how your Career Passport appears to potential employers and mentors.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium">Currently Visible to Employers:</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center">
                        <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                        <span>Education and achievements</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                        <span>Skills and certifications</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
                        <span>Career milestones</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-yellow-500 h-2 w-2 rounded-full mr-2"></span>
                        <span>Project portfolio (partial)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-red-500 h-2 w-2 rounded-full mr-2"></span>
                        <span>Personal goals and feedback</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button>Manage Privacy Settings</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center mb-6">
                  <Settings className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-semibold">Passport Settings</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium">Public Profile URL</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={`career-passport.ae/profile/${currentStudent.id}`} 
                        readOnly
                        className="flex-1 px-3 py-2 border rounded-l-md bg-muted"
                      />
                      <Button variant="outline" className="rounded-l-none">
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notification Preferences</label>
                    <div className="flex items-center justify-between py-2">
                      <span>New achievement notifications</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Profile view alerts</span>
                      <Button variant="outline" size="sm">Disabled</Button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Milestone reminders</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CareerPassportPage;
