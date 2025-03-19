
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Award, User, FileText, Check, Clock, XCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fetchScholarshipById, saveApplication } from '@/utils/scholarshipService';
import { Scholarship } from '@/types/scholarship';
import { notifyInfo } from '@/utils/notification';

const ScholarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  
  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: () => fetchScholarshipById(id!),
    enabled: !!id
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="text-center py-12">Loading scholarship details...</div>
      </div>
    );
  }
  
  if (error || !scholarship) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="text-center py-12">
          <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Scholarship Not Found</h2>
          <p className="text-gray-600 mb-6">The scholarship you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/student-dashboard?tab=scholarships">Back to Scholarships</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleApply = async () => {
    setIsApplying(true);
    try {
      // Create a draft application
      const result = await saveApplication(scholarship.id, {
        status: 'draft',
        documents: {},
        answers: {}
      });
      
      if (result.success && result.applicationId) {
        // Navigate to application form
        navigate(`/scholarships/applications/${result.applicationId}/edit`);
      }
    } finally {
      setIsApplying(false);
    }
  };
  
  const isExpired = new Date(scholarship.application_deadline) < new Date();
  
  const formattedDeadline = format(new Date(scholarship.application_deadline), 'MMMM dd, yyyy');
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        asChild
      >
        <Link to="/student-dashboard?tab=scholarships">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Link>
      </Button>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{scholarship.title}</CardTitle>
              {scholarship.sponsor && (
                <CardDescription className="mt-1">Sponsored by {scholarship.sponsor}</CardDescription>
              )}
            </div>
            <Badge variant={isExpired ? "destructive" : "default"}>
              {isExpired ? "Expired" : "Active"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Award Amount</div>
                <div className="font-medium">
                  {typeof scholarship.award_amount === 'number' ? 
                    scholarship.award_amount.toLocaleString('en-AE', { style: 'currency', currency: 'AED' }) : 
                    scholarship.award_amount}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Application Deadline</div>
                <div className="font-medium">
                  {formattedDeadline}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-emirati-desertRed" />
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium flex items-center">
                  {isExpired ? (
                    <span className="text-red-600">Closed</span>
                  ) : (
                    <span className="text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Open for Applications
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="py-4">
              {scholarship.description ? (
                <div className="prose max-w-none">
                  <p>{scholarship.description}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No detailed description available.</p>
              )}
              
              {scholarship.website_url && (
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href={scholarship.website_url} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                    </a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="eligibility" className="py-4">
              {scholarship.eligibility_criteria && Object.keys(scholarship.eligibility_criteria).length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Eligibility Criteria</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {Object.entries(scholarship.eligibility_criteria).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No specific eligibility criteria</AlertTitle>
                  <AlertDescription>
                    Contact the scholarship provider for more information about eligibility requirements.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="requirements" className="py-4">
              <div className="space-y-6">
                {scholarship.requirements && scholarship.requirements.length > 0 && (
                  <div>
                    <h3 className="font-medium text-lg mb-3">Application Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {scholarship.document_requirements && scholarship.document_requirements.length > 0 && (
                  <div>
                    <h3 className="font-medium text-lg mb-3">Required Documents</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {scholarship.document_requirements.map((doc, index) => (
                        <li key={index} className="flex items-start">
                          <FileText className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(!scholarship.requirements || scholarship.requirements.length === 0) && 
                 (!scholarship.document_requirements || scholarship.document_requirements.length === 0) && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Requirements not specified</AlertTitle>
                    <AlertDescription>
                      Complete application requirements will be available after you start your application.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          {isExpired ? (
            <Button variant="outline" className="w-full" disabled>
              Application Period Closed
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Creating Application..." : "Apply for Scholarship"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScholarshipDetail;
