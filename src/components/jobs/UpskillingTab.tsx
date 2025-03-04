
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BuildingIcon, 
  CalendarIcon,
  GraduationCapIcon
} from "lucide-react";

export interface TrainingProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  skills: string[];
  rating: number;
}

interface UpskillingTabProps {
  trainingPrograms: TrainingProgram[];
}

export const UpskillingTab = ({ trainingPrograms }: UpskillingTabProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-gray-600">
          Enhance your employability with these training programs designed to help you develop in-demand skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-emirati-oasisGreen">{program.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <BuildingIcon size={16} className="mr-1" /> 
                {program.provider}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon size={14} className="mr-1" /> 
                  Duration: {program.duration}
                </div>
                <div className="flex items-center text-sm font-medium">
                  Rating: {program.rating}/5
                </div>
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
            <CardFooter className="pt-1">
              <Button 
                variant="outline" 
                className="w-full border-emirati-oasisGreen text-emirati-oasisGreen hover:bg-emirati-oasisGreen hover:text-white"
              >
                <GraduationCapIcon size={14} className="mr-1" /> Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpskillingTab;
