
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Info, Search, Award } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchScholarships, fetchMatchedScholarships, fetchMyApplications } from '@/utils/scholarshipService';
import ScholarshipCard from '@/components/scholarship/ScholarshipCard';
import { ScholarshipMatch } from '@/types/scholarship';
import { Link } from 'react-router-dom';

const ScholarshipsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch all scholarships
  const { data: scholarships = [], isLoading: isLoadingScholarships } = useQuery({
    queryKey: ['scholarships'],
    queryFn: fetchScholarships
  });
  
  // Fetch matched scholarships
  const { data: matchedScholarships = [], isLoading: isLoadingMatches } = useQuery({
    queryKey: ['matchedScholarships'],
    queryFn: fetchMatchedScholarships
  });
  
  // Fetch user's applications
  const { data: applications = [], isLoading: isLoadingApplications } = useQuery({
    queryKey: ['myApplications'],
    queryFn: fetchMyApplications
  });
  
  // Filter scholarships based on search term
  const filteredScholarships = scholarships.filter(
    scholarship => scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (scholarship.description && scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (scholarship.sponsor && scholarship.sponsor.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Prepare matched scholarships for display
  const displayMatches: ScholarshipMatch[] = matchedScholarships
    .filter(match => match.scholarship)
    .sort((a, b) => b.match_score - a.match_score);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Scholarship Opportunities</CardTitle>
          <CardDescription>
            Discover scholarships that align with your academic goals and background
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Personalized Recommendations</AlertTitle>
              <AlertDescription>
                Complete your scholarship profile to get better matches and increase your chances of approval.
                <Button variant="link" className="p-0 h-auto text-sm font-normal" asChild>
                  <Link to="/profile/scholarship">Update Profile</Link>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
          
          <Tabs defaultValue="recommended">
            <TabsList className="mb-4">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="all">All Scholarships</TabsTrigger>
              <TabsTrigger value="applied">My Applications ({applications.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended">
              {isLoadingMatches ? (
                <div className="text-center py-8">Loading recommended scholarships...</div>
              ) : displayMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayMatches.map(match => (
                    <ScholarshipCard 
                      key={match.scholarship_id} 
                      scholarship={match.scholarship!} 
                      matchScore={match.match_score}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="font-medium text-lg">No recommended scholarships yet</h3>
                  <p className="text-gray-500 mt-1">Complete your profile to get personalized recommendations</p>
                  <Button asChild className="mt-4">
                    <Link to="/profile/scholarship">Update Profile</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search scholarships..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {isLoadingScholarships ? (
                <div className="text-center py-8">Loading scholarships...</div>
              ) : filteredScholarships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredScholarships.map(scholarship => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No scholarships found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="applied">
              {isLoadingApplications ? (
                <div className="text-center py-8">Loading your applications...</div>
              ) : applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map(application => (
                    <Link 
                      key={application.id} 
                      to={`/scholarships/applications/${application.id}`}
                      className="block"
                    >
                      <Card className="hover:bg-gray-50 transition-colors">
                        <CardContent className="py-4 px-5">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">
                                {/* @ts-ignore - We know scholarship will be there */}
                                {application.scholarship?.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Applied: {new Date(application.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <span className={`
                                px-2.5 py-1 rounded-full text-xs font-medium
                                ${application.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                                ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                ${application.status === 'under_review' ? 'bg-blue-100 text-blue-800' : ''}
                                ${application.status === 'submitted' ? 'bg-purple-100 text-purple-800' : ''}
                                ${application.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                              `}>
                                {application.status === 'under_review' ? 'Under Review' : 
                                 application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="font-medium text-lg">No applications yet</h3>
                  <p className="text-gray-500 mt-1">Browse and apply for scholarships to see them here</p>
                  <Button asChild className="mt-4">
                    <Link to="/scholarships">Browse Scholarships</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipsTab;
