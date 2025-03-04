
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BuildingIcon, 
  CalendarIcon,
  GraduationCapIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  CheckIcon,
  ArrowRightIcon
} from "lucide-react";
import { notifySuccess } from "@/utils/notification";

export interface TrainingProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  skills: string[];
  rating: number;
  matchPercentage?: number;
  startDates?: string[];
  learningFormat?: string;
  enrollmentCapacity?: number;
  currentEnrollment?: number;
  description?: string;
  prerequisites?: string[];
  outcomes?: string[];
  certificationOffered?: boolean;
}

interface UpskillingTabProps {
  trainingPrograms: TrainingProgram[];
}

export const UpskillingTab = ({ trainingPrograms }: UpskillingTabProps) => {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "recommended">("grid");
  
  // Sort programs by match percentage when in recommended view
  const sortedPrograms = viewMode === "recommended" 
    ? [...trainingPrograms].sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))
    : trainingPrograms;

  const handleEnroll = (program: TrainingProgram) => {
    notifySuccess({ 
      title: "Enrollment Request Submitted", 
      description: `Your enrollment request for ${program.title} has been submitted successfully.`
    });
    setEnrollmentOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Enhance your employability with these training programs designed to help you develop in-demand skills.
          </p>
          <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "recommended")} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">All Programs</TabsTrigger>
              <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {viewMode === "recommended" && (
          <div className="bg-emirati-sand/30 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <StarIcon size={18} className="text-emirati-oasisGreen" />
              <h3 className="font-medium">Personalized Recommendations</h3>
            </div>
            <p className="text-sm text-gray-600">
              These programs are tailored to your profile, skill gaps, and career goals. Programs with higher match percentages align better with your development needs.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-emirati-oasisGreen">{program.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <BuildingIcon size={16} className="mr-1" /> 
                    {program.provider}
                  </CardDescription>
                </div>
                {program.matchPercentage && (
                  <Badge variant={program.matchPercentage > 85 ? "default" : "outline"} className="bg-emirati-oasisGreen">
                    {program.matchPercentage}% Match
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon size={14} className="mr-1" /> 
                  Duration: {program.duration}
                </div>
                {program.learningFormat && (
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon size={14} className="mr-1" /> 
                    Format: {program.learningFormat}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      size={14} 
                      className={i < program.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm ml-1 font-medium">{program.rating}/5</span>
                </div>
                {program.enrollmentCapacity && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Enrollment</span>
                      <span>{program.currentEnrollment}/{program.enrollmentCapacity}</span>
                    </div>
                    <Progress
                      value={(program.currentEnrollment! / program.enrollmentCapacity) * 100}
                      className="h-1"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium">Skills You'll Gain:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {program.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                className="border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen hover:text-white"
                onClick={() => setSelectedProgram(program)}
              >
                View Details
              </Button>
              <Button 
                size="sm"
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                onClick={() => {
                  setSelectedProgram(program);
                  setEnrollmentOpen(true);
                }}
              >
                <GraduationCapIcon size={14} className="mr-1" /> Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Program details dialog */}
      {selectedProgram && (
        <Dialog open={selectedProgram !== null && !enrollmentOpen} onOpenChange={(open) => !open && setSelectedProgram(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-emirati-oasisGreen">{selectedProgram.title}</DialogTitle>
              <DialogDescription className="flex items-center">
                <BuildingIcon size={16} className="mr-1" /> {selectedProgram.provider}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Program Overview</h4>
                <p className="text-sm text-gray-700 mb-4">{selectedProgram.description || "A comprehensive training program designed to enhance your skills and career prospects."}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <CalendarIcon size={14} className="mr-2 text-emirati-oasisGreen" /> 
                    <span className="font-medium mr-2">Duration:</span> {selectedProgram.duration}
                  </div>
                  {selectedProgram.learningFormat && (
                    <div className="flex items-center text-sm">
                      <ClockIcon size={14} className="mr-2 text-emirati-oasisGreen" /> 
                      <span className="font-medium mr-2">Format:</span> {selectedProgram.learningFormat}
                    </div>
                  )}
                  {selectedProgram.startDates && (
                    <div className="flex items-start text-sm">
                      <CalendarIcon size={14} className="mr-2 mt-0.5 text-emirati-oasisGreen" /> 
                      <div>
                        <span className="font-medium mr-2">Start Dates:</span> 
                        <ul className="list-disc pl-5 mt-1">
                          {selectedProgram.startDates.map((date, index) => (
                            <li key={index}>{date}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {selectedProgram.enrollmentCapacity && (
                    <div className="flex items-center text-sm">
                      <UsersIcon size={14} className="mr-2 text-emirati-oasisGreen" /> 
                      <span className="font-medium mr-2">Enrollment:</span> 
                      {selectedProgram.currentEnrollment}/{selectedProgram.enrollmentCapacity} seats filled
                    </div>
                  )}
                </div>
                
                {selectedProgram.prerequisites && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Prerequisites</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {selectedProgram.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Skills You'll Gain</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-100 border-purple-200 text-purple-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedProgram.outcomes && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Learning Outcomes</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedProgram.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckIcon size={16} className="text-emirati-oasisGreen shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProgram.certificationOffered && (
                  <div className="mb-4 bg-emirati-sand/30 p-3 rounded-md">
                    <h4 className="font-medium mb-1 flex items-center">
                      <GraduationCapIcon size={16} className="mr-2 text-emirati-oasisGreen" />
                      Certification Offered
                    </h4>
                    <p className="text-sm">
                      Upon successful completion, you will receive an industry-recognized certification.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSelectedProgram(null)}
              >
                Close
              </Button>
              <Button
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                onClick={() => setEnrollmentOpen(true)}
              >
                <GraduationCapIcon size={16} className="mr-2" />
                Enroll Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Enrollment dialog */}
      {selectedProgram && (
        <Dialog open={enrollmentOpen} onOpenChange={setEnrollmentOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Enroll in {selectedProgram.title}</DialogTitle>
              <DialogDescription>
                Complete the enrollment process for this program.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-1">Selected Program:</span>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <div className="font-medium">{selectedProgram.title}</div>
                  <div className="text-muted-foreground">{selectedProgram.provider}</div>
                </div>
              </div>
              
              {selectedProgram.startDates && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Available Start Dates:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.startDates.map((date, index) => (
                      <div key={index} className="border rounded-md px-3 py-2 text-sm flex items-center gap-2">
                        <CalendarIcon size={14} />
                        {date}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-emirati-sand/30 p-3 rounded-md">
                <h4 className="font-medium mb-1 flex items-center">
                  <ArrowRightIcon size={16} className="mr-2 text-emirati-oasisGreen" />
                  Next Steps:
                </h4>
                <p className="text-sm">
                  After submitting your enrollment request, a program advisor will contact you to confirm your placement and provide payment details if applicable.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setEnrollmentOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                onClick={() => handleEnroll(selectedProgram)}
              >
                <CheckIcon size={16} className="mr-2" />
                Submit Enrollment Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UpskillingTab;
