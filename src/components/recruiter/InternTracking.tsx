
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Briefcase, GraduationCap, ArrowRight, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Intern {
  id: number;
  name: string;
  university: string;
  major: string;
  gpa: number;
  year: string;
  skills: string[];
  status: string;
  company?: string;
  position?: string;
}

const InternTracking: React.FC = () => {
  const { toast } = useToast();
  const [internSearchQuery, setInternSearchQuery] = useState("");
  const [internFilter, setInternFilter] = useState("All");
  const [isNewInternDialogOpen, setIsNewInternDialogOpen] = useState(false);
  const [isAssignInternDialogOpen, setIsAssignInternDialogOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [newIntern, setNewIntern] = useState({
    name: "",
    university: "",
    major: "",
    gpa: "",
    year: "Freshman",
    skills: [""],
    status: "Unassigned"
  });
  const [assignmentDetails, setAssignmentDetails] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    supervisor: "",
    notes: ""
  });

  const interns: Intern[] = [
    { id: 1, name: "Ahmed Khan", university: "American University of Sharjah", major: "Computer Science", gpa: 3.8, year: "Senior", skills: ["Python", "Data Analysis", "Web Development"], status: "Unassigned" },
    { id: 2, name: "Sara Al Nasser", university: "UAE University", major: "Business Administration", gpa: 3.5, year: "Junior", skills: ["Marketing", "Social Media", "Content Creation"], status: "Assigned", company: "Digital Marketing Agency", position: "Marketing Intern" },
    { id: 3, name: "Mohammed Al Hashimi", university: "Zayed University", major: "Finance", gpa: 3.7, year: "Senior", skills: ["Financial Analysis", "Excel", "Investment Research"], status: "Assigned", company: "Abu Dhabi Investment Authority", position: "Finance Intern" },
    { id: 4, name: "Fatima Al Zaabi", university: "Khalifa University", major: "Electrical Engineering", gpa: 3.9, year: "Senior", skills: ["Circuit Design", "MATLAB", "Project Management"], status: "Unassigned" },
    { id: 5, name: "Reem Al Suwaidi", university: "New York University Abu Dhabi", major: "Psychology", gpa: 3.6, year: "Junior", skills: ["Research", "Data Collection", "Statistical Analysis"], status: "Unassigned" },
    { id: 6, name: "Ali Al Mansoori", university: "UAE University", major: "Marketing", gpa: 3.4, year: "Senior", skills: ["Digital Marketing", "Market Research", "Brand Strategy"], status: "Assigned", company: "Etisalat", position: "Marketing Intern" },
    { id: 7, name: "Noura Al Shamsi", university: "Zayed University", major: "Information Systems", gpa: 3.5, year: "Junior", skills: ["Database Management", "System Analysis", "SQL"], status: "Unassigned" },
    { id: 8, name: "Hassan Al Balushi", university: "Khalifa University", major: "Mechanical Engineering", gpa: 3.7, year: "Senior", skills: ["CAD", "Thermodynamics", "Fluid Mechanics"], status: "Unassigned" },
  ];

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.university.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.major.toLowerCase().includes(internSearchQuery.toLowerCase()) ||
      intern.skills.some(skill => skill.toLowerCase().includes(internSearchQuery.toLowerCase()));
    
    const matchesFilter = internFilter === "All" || intern.status === internFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleNewInternSkillChange = (index: number, value: string) => {
    const updatedSkills = [...newIntern.skills];
    updatedSkills[index] = value;
    setNewIntern({ ...newIntern, skills: updatedSkills });
  };

  const addInternSkillField = () => {
    setNewIntern({
      ...newIntern,
      skills: [...newIntern.skills, ""]
    });
  };

  const removeInternSkillField = (index: number) => {
    const updatedSkills = newIntern.skills.filter((_, i) => i !== index);
    setNewIntern({ ...newIntern, skills: updatedSkills });
  };

  const handleSubmitIntern = () => {
    console.log("New intern:", newIntern);
    toast({
      title: "Success!",
      description: `${newIntern.name} has been added to the system.`,
    });
    setIsNewInternDialogOpen(false);
    setNewIntern({
      name: "",
      university: "",
      major: "",
      gpa: "",
      year: "Freshman",
      skills: [""],
      status: "Unassigned"
    });
  };

  const handleAssignIntern = (intern: Intern) => {
    setSelectedIntern(intern);
    setAssignmentDetails({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      supervisor: "",
      notes: ""
    });
    setIsAssignInternDialogOpen(true);
  };

  const handleSubmitAssignment = () => {
    console.log("Assignment details:", { intern: selectedIntern, ...assignmentDetails });
    toast({
      title: "Intern Assigned!",
      description: `${selectedIntern?.name} has been assigned to ${assignmentDetails.company}.`,
    });
    setIsAssignInternDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search interns..."
            value={internSearchQuery}
            onChange={(e) => setInternSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={internFilter}
            onValueChange={setInternFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Interns</SelectItem>
              <SelectItem value="Assigned">Assigned</SelectItem>
              <SelectItem value="Unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsNewInternDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Intern
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredInterns.map((intern) => (
          <Card key={intern.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5" /> {intern.name}
                    <Badge className="ml-2" variant={intern.status === "Assigned" ? "default" : "secondary"}>
                      {intern.status}
                    </Badge>
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <GraduationCap className="mr-1 h-4 w-4" /> {intern.university}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" /> {intern.major}
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" /> {intern.year}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {intern.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {intern.status === "Assigned" && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Assignment</p>
                      <div className="mt-1">
                        <p className="text-sm">
                          <span className="font-medium">Company:</span> {intern.company}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Position:</span> {intern.position}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  {intern.status === "Unassigned" ? (
                    <Button onClick={() => handleAssignIntern(intern)}>
                      Assign Intern <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Intern Dialog */}
      <Dialog open={isNewInternDialogOpen} onOpenChange={setIsNewInternDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Intern</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newIntern.name}
                onChange={(e) => setNewIntern({ ...newIntern, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={newIntern.university}
                  onChange={(e) => setNewIntern({ ...newIntern, university: e.target.value })}
                  placeholder="Enter university name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={newIntern.major}
                  onChange={(e) => setNewIntern({ ...newIntern, major: e.target.value })}
                  placeholder="Enter major"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  value={newIntern.gpa}
                  onChange={(e) => setNewIntern({ ...newIntern, gpa: e.target.value })}
                  placeholder="Enter GPA (e.g., 3.5)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select 
                  value={newIntern.year} 
                  onValueChange={(value) => setNewIntern({ ...newIntern, year: value })}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Freshman">Freshman</SelectItem>
                    <SelectItem value="Sophomore">Sophomore</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Skills</Label>
              <div className="space-y-2">
                {newIntern.skills.map((skill, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => handleNewInternSkillChange(idx, e.target.value)}
                      placeholder={`Skill ${idx + 1}`}
                    />
                    {newIntern.skills.length > 1 && (
                      <Button type="button" size="icon" variant="outline" onClick={() => removeInternSkillField(idx)}>
                        -
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addInternSkillField}>
                  Add Skill
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewInternDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitIntern}>Add Intern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Intern Dialog */}
      <Dialog open={isAssignInternDialogOpen} onOpenChange={setIsAssignInternDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Intern</DialogTitle>
          </DialogHeader>
          {selectedIntern && (
            <div className="py-2">
              <div className="flex items-center mb-4">
                <User className="mr-2 h-5 w-5" />
                <span className="font-medium">{selectedIntern.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({selectedIntern.university}, {selectedIntern.major})
                </span>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={assignmentDetails.company}
                    onChange={(e) => setAssignmentDetails({ ...assignmentDetails, company: e.target.value })}
                    placeholder="Enter company name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={assignmentDetails.position}
                    onChange={(e) => setAssignmentDetails({ ...assignmentDetails, position: e.target.value })}
                    placeholder="Enter position title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={assignmentDetails.startDate}
                      onChange={(e) => setAssignmentDetails({ ...assignmentDetails, startDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={assignmentDetails.endDate}
                      onChange={(e) => setAssignmentDetails({ ...assignmentDetails, endDate: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Input
                    id="supervisor"
                    value={assignmentDetails.supervisor}
                    onChange={(e) => setAssignmentDetails({ ...assignmentDetails, supervisor: e.target.value })}
                    placeholder="Enter supervisor name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={assignmentDetails.notes}
                    onChange={(e) => setAssignmentDetails({ ...assignmentDetails, notes: e.target.value })}
                    placeholder="Add any additional notes"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignInternDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitAssignment}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InternTracking;
