
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Award, MessageCircle } from "lucide-react";
import { Student } from "@/types/student";
import { 
  checkMentorEligibility, 
  findPotentialMentors, 
  connectWithMentor 
} from "@/services/mentor/mentorService";

interface MentorMatchingCardProps {
  student: Student;
}

const MentorMatchingCard: React.FC<MentorMatchingCardProps> = ({ student }) => {
  const [potentialMentors, setPotentialMentors] = useState<{id: number, name: string, stamps: number}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMentors, setShowMentors] = useState(false);
  
  const isMentorEligible = checkMentorEligibility(student);
  
  const handleFindMentors = async () => {
    setIsLoading(true);
    try {
      const mentors = await findPotentialMentors(student);
      setPotentialMentors(mentors);
      setShowMentors(true);
    } catch (error) {
      console.error("Error finding mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConnectWithMentor = (mentorId: number, mentorName: string) => {
    connectWithMentor(student.id, mentorId, mentorName);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Mentor Program</CardTitle>
            <CardDescription>Connect with experienced professionals</CardDescription>
          </div>
          {isMentorEligible && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <UserCheck className="h-3 w-3 mr-1" /> Mentor Eligible
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isMentorEligible ? (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h3 className="font-medium text-amber-800 flex items-center">
                <Award className="h-4 w-4 mr-2" />
                You Qualify as a Mentor!
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                With {student.passportStamps.length} stamps and your extensive experience, 
                you can help guide others on their career journey.
              </p>
            </div>
            <Button variant="outline" className="w-full">
              Become a Mentor
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {showMentors ? (
              <div className="space-y-3">
                <h3 className="font-medium">Recommended Mentors</h3>
                {potentialMentors.map(mentor => (
                  <div key={mentor.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Award className="h-3 w-3 mr-1" /> {mentor.stamps} stamps
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnectWithMentor(mentor.id, mentor.name)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" /> Connect
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Get guidance from experienced professionals who have already achieved
                  significant milestones in their career journey.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-700">
                    Mentors can provide valuable advice, share their experiences, and help you
                    navigate your career path more effectively.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isMentorEligible && !showMentors && (
          <Button 
            className="w-full" 
            onClick={handleFindMentors}
            disabled={isLoading}
          >
            {isLoading ? "Finding Mentors..." : "Find a Mentor"}
          </Button>
        )}
        {showMentors && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowMentors(false)}
          >
            Back to Mentor Information
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MentorMatchingCard;
