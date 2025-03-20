
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Award, FileText, Briefcase, ExternalLink, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { fetchScholarshipById, applyForScholarship } from "@/services/scholarship/scholarshipService";
import { Scholarship } from "@/types/scholarship";
import { toast } from "sonner";

const ScholarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScholarship = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const data = await fetchScholarshipById(id);
      setScholarship(data);
      setIsLoading(false);
    };
    
    loadScholarship();
  }, [id]);

  const handleApply = async () => {
    if (!id) return;
    
    // Create a draft application
    const success = await applyForScholarship(id, {
      status: 'draft'
    });
    
    if (success) {
      navigate(`/scholarship-applications`);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Scholarship Not Found</h2>
        <p className="mb-6">The scholarship you are looking for could not be found.</p>
        <Button asChild>
          <Link to="/scholarships">Back to Scholarships</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/scholarships" className="flex items-center text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="text-2xl text-emirati-deepBlue">{scholarship.title}</CardTitle>
                  <CardDescription className="text-lg">{scholarship.sponsor}</CardDescription>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <div className="text-2xl font-bold text-emirati-oasisGreen mb-1">
                    {formatAmount(scholarship.award_amount)}
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Deadline: {format(new Date(scholarship.application_deadline), 'MMM dd, yyyy')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="documents">Required Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4">
                  <div className="prose max-w-none">
                    <p>{scholarship.description}</p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      {Object.entries(scholarship.eligibility_criteria).map(([key, value]) => (
                        <li key={key} className="flex items-start">
                          <Award className="h-5 w-5 mr-2 text-emirati-oasisGreen shrink-0 mt-0.5" />
                          <span>
                            <span className="font-medium">{key.replace(/_/g, ' ')}: </span>
                            {value.toString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {scholarship.website_url && (
                      <div className="mt-6">
                        <Button variant="outline" asChild>
                          <a 
                            href={scholarship.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            Visit Official Website
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="requirements" className="pt-4">
                  {scholarship.requirements && scholarship.requirements.length > 0 ? (
                    <ul className="space-y-3">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <Briefcase className="h-5 w-5 mr-2 text-emirati-oasisGreen shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No specific requirements listed.</p>
                  )}
                </TabsContent>
                <TabsContent value="documents" className="pt-4">
                  {scholarship.document_requirements && scholarship.document_requirements.length > 0 ? (
                    <ul className="space-y-3">
                      {scholarship.document_requirements.map((doc, index) => (
                        <li key={index} className="flex items-start">
                          <FileText className="h-5 w-5 mr-2 text-emirati-oasisGreen shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No specific document requirements listed.</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>
                Complete your application before the deadline to be considered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
                  <span>
                    <span className="font-medium">Deadline:</span>{" "}
                    {format(new Date(scholarship.application_deadline), 'MMMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Award className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
                  <span>
                    <span className="font-medium">Award Amount:</span>{" "}
                    {formatAmount(scholarship.award_amount)}
                  </span>
                </div>
                <div className="pt-4">
                  <Button onClick={handleApply} className="w-full bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                    Start Application
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  You'll need to complete your student profile before submitting the application.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about this scholarship or the application process, our advisors are here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact an Advisor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
