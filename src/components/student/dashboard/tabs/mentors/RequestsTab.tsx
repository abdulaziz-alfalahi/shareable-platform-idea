
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { MentorshipRequest } from "./types";

interface RequestsTabProps {
  pendingRequests: MentorshipRequest[];
  setActiveTab: (tab: string) => void;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ pendingRequests, setActiveTab }) => {
  if (pendingRequests.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>You haven't sent any mentorship requests yet.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => setActiveTab("explore")}
          >
            Explore Mentors
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Mentorship Requests</h2>
      
      <div className="space-y-4">
        {pendingRequests.map(request => (
          <Card key={request.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {request.mentor_name?.split(" ").map(n => n[0]).join("") || "M"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.mentor_name}</p>
                    <p className="text-sm text-muted-foreground">{request.mentor_industry}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {request.status === "pending" ? "Pending" : request.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RequestsTab;
