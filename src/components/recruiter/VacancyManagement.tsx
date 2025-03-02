import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, ChevronRight, Users, FileEdit, Briefcase, MapPin, Clock, Calendar } from "lucide-react";
import JobMap from "@/components/JobMap";
import { useToast } from "@/hooks/use-toast";

interface Vacancy {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  requirements: string[];
  status: string;
  datePosted: string;
  coordinates: { latitude: number; longitude: number };
}

interface CandidateMatch {
  id: number;
  name: string;
  match: number;
  skills: string[];
  location: string;
}

interface VacancyManagementProps {
  vacancies: Vacancy[];
}

const VacancyManagement: React.FC<VacancyManagementProps> = ({ vacancies }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewVacancyDialogOpen, setIsNewVacancyDialogOpen] = useState(false);
  const [isViewVacancyDialogOpen, setIsViewVacancyDialogOpen] = useState(false);
  const [isAIMatchDialogOpen, setIsAIMatchDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [newVacancy, setNewVacancy] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    requirements: [""],
    status: "Draft",
    coordinates: { latitude: 25.2048, longitude: 55.2708 }
  });

  const filteredVacancies = vacancies.filter(vacancy => 
    vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vacancy.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vacancy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAIMatchedCandidates = (vacancyId: number): CandidateMatch[] => {
    return [
      { id: 101, name: "Sarah Johnson", match: 95, skills: ["UI/UX", "Figma", "Sketch", "User Research"], location: "Dubai" },
      { id: 102, name: "Mohammed Al Farsi", match: 92, skills: ["UI Design", "Adobe XD", "Prototyping"], location: "Dubai" },
      { id: 103, name: "Priya Sharma", match: 88, skills: ["UX Research", "Wireframing", "User Testing"], location: "Abu Dhabi" },
      { id: 104, name: "Alex Wong", match: 85, skills: ["Product Design", "Figma", "HTML/CSS"], location: "Dubai" },
      { id: 105, name: "Fatima Hassan", match: 82, skills: ["Visual Design", "Illustration", "Branding"], location: "Sharjah" },
      { id: 106, name: "Daniel Kim", match: 78, skills: ["Interaction Design", "Prototyping", "User Flows"], location: "Dubai" },
      { id: 107, name: "Layla Ahmed", match: 76, skills: ["UI Design", "Design Systems", "Accessibility"], location: "Abu Dhabi" },
      { id: 108, name: "Raj Patel", match: 75, skills: ["UX Design", "Research", "Information Architecture"], location: "Dubai" },
      { id: 109, name: "Emma Wilson", match: 72, skills: ["Visual Design", "Branding", "Typography"], location: "Sharjah" },
      { id: 110, name: "Omar Mahmoud", match: 70, skills: ["UI Development", "Figma", "React"], location: "Dubai" },
    ];
  };

  const handleNewRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...newVacancy.requirements];
    updatedRequirements[index] = value;
    setNewVacancy({ ...newVacancy, requirements: updatedRequirements });
  };

  const addRequirementField = () => {
    setNewVacancy({
      ...newVacancy,
      requirements: [...newVacancy.requirements, ""]
    });
  };

  const removeRequirementField = (index: number) => {
    const updatedRequirements = newVacancy.requirements.filter((_, i) => i !== index);
    setNewVacancy({ ...newVacancy, requirements: updatedRequirements });
  };

  const handleSubmitVacancy = () => {
    console.log("New vacancy:", newVacancy);
    setIsNewVacancyDialogOpen(false);
    setNewVacancy({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      requirements: [""],
      status: "Draft",
      coordinates: { latitude: 25.2048, longitude: 55.2708 }
    });
    toast({
      title: "Vacancy created",
      description: "The vacancy has been created successfully.",
    });
  };

  const handleViewVacancy = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsViewVacancyDialogOpen(true);
  };

  const handleShowAIMatches = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setIsAIMatchDialogOpen(true);
  };

  const handleLocationUpdate = (updatedJobs: any[]) => {
    if (updatedJobs.length > 0 && updatedJobs[0].id === "workplace") {
      const workplaceJob = updatedJobs[0];
      setNewVacancy({
        ...newVacancy,
        location: workplaceJob.location.address || "",
        coordinates: {
          latitude: workplaceJob.location.latitude,
          longitude: workplaceJob.location.longitude
        }
      });
    }
  };

  const createWorkplaceJob = (latitude: number, longitude: number, address: string = "") => {
    return [{
      id: "workplace",
      title: "Workplace Location",
      company: newVacancy.title || "New Position",
      location: {
        latitude,
        longitude,
        address: address || newVacancy.location || "Workplace Location"
      }
    }];
  };

  const selectedVacancyJobs = selectedVacancy ? [{
    id: selectedVacancy.id.toString(),
    title: selectedVacancy.title,
    company: selectedVacancy.department,
    location: {
      latitude: selectedVacancy.coordinates.latitude,
      longitude: selectedVacancy.coordinates.longitude,
      address: selectedVacancy.location
    }
  }] : [];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vacancies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsNewVacancyDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vacancy
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVacancies.map((vacancy) => (
          <Card key={vacancy.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-start">
                <span>{vacancy.title}</span>
                <Badge variant={
                  vacancy.status === "Open" ? "default" :
                  vacancy.status === "Draft" ? "secondary" : "destructive"
                }>
                  {vacancy.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Briefcase className="mr-1 h-4 w-4" /> {vacancy.department}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <MapPin className="mr-1 h-4 w-4" /> {vacancy.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Clock className="mr-1 h-4 w-4" /> {vacancy.type}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="mr-1 h-4 w-4" /> Posted: {vacancy.datePosted}
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => handleViewVacancy(vacancy)}>
                  <FileEdit className="mr-1 h-4 w-4" /> Details
                </Button>
                <Button size="sm" variant="outline" 
                  onClick={() => handleShowAIMatches(vacancy)}
                  disabled={vacancy.status !== "Open"}
                >
                  <Users className="mr-1 h-4 w-4" /> AI Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Vacancy Dialog */}
      <Dialog open={isNewVacancyDialogOpen} onOpenChange={setIsNewVacancyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Vacancy</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={newVacancy.title}
                  onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
                  placeholder="e.g. UI/UX Designer"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newVacancy.department}
                  onChange={(e) => setNewVacancy({ ...newVacancy, department: e.target.value })}
                  placeholder="e.g. Digital Products"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Location</Label>
              <div className="h-[200px] rounded-md overflow-hidden">
                <JobMap 
                  jobs={createWorkplaceJob(newVacancy.coordinates.latitude, newVacancy.coordinates.longitude)}
                  onLocationUpdate={handleLocationUpdate}
                />
              </div>
              <Input
                value={newVacancy.location}
                onChange={(e) => setNewVacancy({ ...newVacancy, location: e.target.value })}
                placeholder="Address"
                className="mt-2"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Employment Type</Label>
              <Select 
                value={newVacancy.type} 
                onValueChange={(value) => setNewVacancy({ ...newVacancy, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newVacancy.status} 
                onValueChange={(value) => setNewVacancy({ ...newVacancy, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Requirements</Label>
              <div className="space-y-2">
                {newVacancy.requirements.map((req, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={req}
                      onChange={(e) => handleNewRequirementChange(idx, e.target.value)}
                      placeholder={`Requirement ${idx + 1}`}
                    />
                    {newVacancy.requirements.length > 1 && (
                      <Button type="button" size="icon" variant="outline" onClick={() => removeRequirementField(idx)}>
                        -
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addRequirementField}>
                  Add Requirement
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitVacancy}>Create Vacancy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Vacancy Dialog */}
      <Dialog open={isViewVacancyDialogOpen} onOpenChange={setIsViewVacancyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Vacancy Details</DialogTitle>
          </DialogHeader>
          {selectedVacancy && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedVacancy.title}</h2>
                <Badge
                  variant={
                    selectedVacancy.status === "Open" ? "default" :
                    selectedVacancy.status === "Draft" ? "secondary" : "destructive"
                  }
                >
                  {selectedVacancy.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p>{selectedVacancy.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employment Type</p>
                  <p>{selectedVacancy.type}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Location</p>
                <p>{selectedVacancy.location}</p>
                <div className="h-[200px] rounded-md overflow-hidden mt-2">
                  <JobMap 
                    jobs={selectedVacancyJobs}
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Date Posted</p>
                <p>{selectedVacancy.datePosted}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Requirements</p>
                <ul className="list-disc pl-5 mt-1">
                  {selectedVacancy.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Match Dialog */}
      <Dialog open={isAIMatchDialogOpen} onOpenChange={setIsAIMatchDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>AI Matched Candidates</DialogTitle>
          </DialogHeader>
          {selectedVacancy && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{selectedVacancy.title}</Badge>
                <Badge variant="outline">{selectedVacancy.department}</Badge>
                <Badge variant="outline">{selectedVacancy.location}</Badge>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {getAIMatchedCandidates(selectedVacancy.id).map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.location}</p>
                        </div>
                        <Badge className="bg-green-500">{candidate.match}% Match</Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Profile <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VacancyManagement;
