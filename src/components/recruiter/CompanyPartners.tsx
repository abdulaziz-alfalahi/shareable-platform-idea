
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Building, MapPin, Briefcase, ChevronRight } from "lucide-react";

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  openPositions: number;
}

interface InternshipTrack {
  id: number;
  name: string;
  department: string;
  duration: string;
  companies: string[];
  skills: string[];
}

const CompanyPartners: React.FC = () => {
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [isViewCompanyDialogOpen, setIsViewCompanyDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const companies: Company[] = [
    { id: 1, name: "Abu Dhabi National Oil Company (ADNOC)", industry: "Energy", location: "Abu Dhabi", openPositions: 3 },
    { id: 2, name: "Emirates Airlines", industry: "Aviation", location: "Dubai", openPositions: 2 },
    { id: 3, name: "Etisalat", industry: "Telecommunications", location: "Dubai", openPositions: 4 },
    { id: 4, name: "Dubai Holding", industry: "Investment", location: "Dubai", openPositions: 2 },
    { id: 5, name: "Mubadala Investment Company", industry: "Investment", location: "Abu Dhabi", openPositions: 3 },
    { id: 6, name: "DP World", industry: "Logistics", location: "Dubai", openPositions: 1 },
    { id: 7, name: "National Bank of Abu Dhabi", industry: "Banking", location: "Abu Dhabi", openPositions: 2 },
    { id: 8, name: "Emaar Properties", industry: "Real Estate", location: "Dubai", openPositions: 2 },
  ];

  const internshipTracks: InternshipTrack[] = [
    { id: 1, name: "Software Development", department: "IT", duration: "12 weeks", companies: ["Etisalat", "Emirates Airlines", "ADNOC"], skills: ["Programming", "Web Development", "App Development"] },
    { id: 2, name: "Finance & Accounting", department: "Finance", duration: "10 weeks", companies: ["National Bank of Abu Dhabi", "Mubadala", "ADNOC"], skills: ["Financial Analysis", "Accounting", "Excel"] },
    { id: 3, name: "Marketing & Communications", department: "Marketing", duration: "8 weeks", companies: ["Etisalat", "Emirates Airlines", "Emaar Properties"], skills: ["Digital Marketing", "Content Creation", "Market Research"] },
    { id: 4, name: "Engineering", department: "Engineering", duration: "16 weeks", companies: ["ADNOC", "DP World", "Emaar Properties"], skills: ["CAD", "Engineering Design", "Project Management"] },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsViewCompanyDialogOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={companySearchQuery}
            onChange={(e) => setCompanySearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Building className="mr-1 h-4 w-4" /> {company.industry}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <MapPin className="mr-1 h-4 w-4" /> {company.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Briefcase className="mr-1 h-4 w-4" /> {company.openPositions} Open Positions
              </div>
              
              <Button size="sm" variant="outline" onClick={() => handleViewCompany(company)}>
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Internship Tracks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internshipTracks.map((track) => (
          <Card key={track.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{track.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Briefcase className="mr-1 h-4 w-4" /> {track.department}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="mr-1 h-4 w-4" /> {track.duration}
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Participating Companies</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {track.companies.map((company, index) => (
                    <Badge key={index} variant="secondary">{company}</Badge>
                  ))}
                </div>
                
                <p className="text-sm font-medium mb-1">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Company Dialog */}
      <Dialog open={isViewCompanyDialogOpen} onOpenChange={setIsViewCompanyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <div className="py-4">
              <h2 className="text-2xl font-bold mb-4">{selectedCompany.name}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium">Industry</p>
                  <p>{selectedCompany.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p>{selectedCompany.location}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Open Positions</p>
                <p>{selectedCompany.openPositions} positions currently accepting applications</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Internship Tracks</p>
                <div className="space-y-2">
                  {internshipTracks
                    .filter(track => track.companies.includes(selectedCompany.name.split(' ')[0]) || 
                                     track.companies.some(c => selectedCompany.name.includes(c)))
                    .map(track => (
                      <div key={track.id} className="p-2 border rounded-md">
                        <p className="font-medium">{track.name}</p>
                        <p className="text-sm text-muted-foreground">{track.duration} in {track.department}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <Button className="w-full">Contact Company Representative</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompanyPartners;
