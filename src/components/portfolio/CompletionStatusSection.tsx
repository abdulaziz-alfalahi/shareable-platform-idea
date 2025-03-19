
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const CompletionStatusSection: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Completion Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">75%</div>
            <p className="text-sm text-gray-500">Add a bio and professional photo to reach 100%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projects Added</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">1</div>
            <p className="text-sm text-gray-500">We recommend adding at least 3 projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Portfolio Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emirati-oasisGreen mb-2">12</div>
            <p className="text-sm text-gray-500">In the last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletionStatusSection;
