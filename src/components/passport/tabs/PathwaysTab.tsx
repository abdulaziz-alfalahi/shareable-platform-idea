
import React from "react";
import { Student } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import PathwaySimulator from "@/components/career/PathwaySimulator";

interface PathwaysTabProps {
  student: Student;
}

const PathwaysTab: React.FC<PathwaysTabProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <Card className="border-emirati-sandBeige/50">
        <CardContent className="p-6">
          <PathwaySimulator student={student} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PathwaysTab;
