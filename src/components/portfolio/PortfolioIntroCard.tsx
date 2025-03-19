
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link2, ExternalLink } from "lucide-react";

const PortfolioIntroCard: React.FC = () => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-emirati-sandBeige/30 to-white">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Welcome to Your Digital Portfolio</h2>
            <p className="text-gray-600 mb-4">
              Showcase your skills, projects, certifications, and achievements to stand out to potential employers.
              A well-crafted portfolio highlights your capabilities beyond what a traditional resume can convey.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Export as PDF
              </Button>
              <Button variant="outline">
                <Link2 className="mr-2 h-4 w-4" /> Share Portfolio
              </Button>
              <Button variant="secondary">
                <ExternalLink className="mr-2 h-4 w-4" /> Preview Public View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioIntroCard;
