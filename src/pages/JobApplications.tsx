
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BriefcaseIcon, 
  BuildingIcon, 
  CalendarIcon,
  ChevronLeftIcon,
  PlusIcon,
  SendIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes: string;
}

const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "Dubai Future Foundation",
      position: "Senior Web Developer",
      date: "2023-05-15",
      status: "interview",
      notes: "Second interview scheduled"
    },
    {
      id: "2",
      company: "Etihad Airways",
      position: "UX Designer",
      date: "2023-05-10",
      status: "applied",
      notes: "Application submitted"
    }
  ]);
  
  const [showNewForm, setShowNewForm] = useState(false);
  const [newApplication, setNewApplication] = useState<Omit<JobApplication, "id">>({
    company: "",
    position: "",
    date: new Date().toISOString().split('T')[0],
    status: "applied",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewApplication({
      ...newApplication,
      [name]: value
    });
  };

  const handleAddApplication = () => {
    const application: JobApplication = {
      ...newApplication,
      id: Date.now().toString()
    };
    
    setApplications([application, ...applications]);
    setNewApplication({
      company: "",
      position: "",
      date: new Date().toISOString().split('T')[0],
      status: "applied",
      notes: ""
    });
    setShowNewForm(false);
  };

  const getStatusColor = (status: JobApplication["status"]) => {
    switch(status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "offer": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ChevronLeftIcon size={16} className="mr-1" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-emirati-oasisGreen">Job Applications Tracker</h1>
      </div>

      <div className="mb-6">
        <Button 
          className="bg-emirati-oasisGreen hover:bg-emirati-desertGold" 
          onClick={() => setShowNewForm(!showNewForm)}
        >
          {showNewForm ? "Cancel" : <><PlusIcon size={16} className="mr-1" /> Add Application</>}
        </Button>
      </div>

      {showNewForm && (
        <Card className="mb-6 border-emirati-desertGold">
          <CardHeader>
            <CardTitle className="text-2xl text-emirati-oasisGreen">Add New Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={newApplication.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={newApplication.position}
                  onChange={handleInputChange}
                  placeholder="Job title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Application Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newApplication.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={newApplication.status}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newApplication.notes}
                  onChange={handleInputChange}
                  placeholder="Add any notes about this application"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-emirati-oasisGreen hover:bg-emirati-desertGold"
              onClick={handleAddApplication}
              disabled={!newApplication.company || !newApplication.position}
            >
              <SendIcon size={16} className="mr-2" /> Submit Application
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <Card key={app.id} className="border-emirati-camelBrown hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-emirati-oasisGreen">{app.position}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <BuildingIcon size={16} className="mr-1 text-emirati-camelBrown" /> 
                    {app.company}
                  </CardDescription>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(app.status)}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-3 flex items-center">
                <CalendarIcon size={14} className="mr-1" /> 
                Applied: {new Date(app.date).toLocaleDateString()}
              </div>
              <p className="text-sm">{app.notes}</p>
            </CardContent>
            <CardFooter className="pt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-emirati-desertGold text-emirati-camelBrown"
              >
                <BriefcaseIcon size={14} className="mr-1" /> Update Status
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
