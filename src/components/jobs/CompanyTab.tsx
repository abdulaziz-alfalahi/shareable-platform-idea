
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Vacancy } from "@/types/jobs";

interface CompanyTabProps {
  vacancy: Vacancy;
  companyValues: string[];
}

const CompanyTab: React.FC<CompanyTabProps> = ({ vacancy, companyValues }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">About {vacancy.company}</h3>
        <p className="text-sm text-muted-foreground">
          {vacancy.company} is a leading organization in the industry, known for innovation and excellence.
          The company has a strong presence in the UAE market and offers excellent opportunities for career growth.
        </p>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Company Size</h3>
        <p className="text-sm flex items-center">
          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
          500-1000 employees
        </p>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Company Values</h3>
        <div className="flex flex-wrap gap-2">
          {companyValues.map((value, index) => (
            <Badge key={index} variant="outline" className="bg-emirati-sandBeige/10">
              {value}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Work Environment</h3>
        <p className="text-sm text-muted-foreground">
          The company offers a hybrid work environment with 2-3 days in the office per week.
          The office is located in a modern building with state-of-the-art facilities.
        </p>
      </div>
    </div>
  );
};

export default CompanyTab;
