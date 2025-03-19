
import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Heart, BookOpen, Clock, Coffee, Calendar, Sunset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UaeGeometricPattern from '@/components/ui/uae/UaeGeometricPattern';
import { Link } from 'react-router-dom';

const WorkLifeBalance = () => {
  return (
    <div className="min-h-screen flex flex-col bg-emirati-sandstone/30">
      <Header />
      
      <main className="flex-1 relative pb-16">
        {/* Background patterns */}
        <UaeGeometricPattern 
          type="dune"
          position="background"
          opacity={0.05}
          className="fixed top-0 left-0 w-full h-full"
        />
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-emirati-oasisGreen/90 to-emirati-palmGreen/90 text-white py-12 relative overflow-hidden">
          <UaeGeometricPattern 
            type="geometric" 
            position="background" 
            opacity={0.1} 
            className="absolute inset-0" 
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Work-Life Balance</h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Strategies and resources for maintaining a healthy balance throughout your career journey
                while honoring UAE values and traditions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="strategies" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="strategies" className="flex items-center gap-2 px-4 py-3">
                <Heart className="h-4 w-4" /> Strategies
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2 px-4 py-3">
                <BookOpen className="h-4 w-4" /> Resources
              </TabsTrigger>
              <TabsTrigger value="workshops" className="flex items-center gap-2 px-4 py-3">
                <Calendar className="h-4 w-4" /> Workshops
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="strategies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strategy Cards */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-emirati-sandBeige/30 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-emirati-desertGold/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-emirati-camelBrown" />
                      </div>
                      <CardTitle className="text-lg text-emirati-deepBrown">Time Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Set clear boundaries between work and personal time
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Use time-blocking techniques to manage your day
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Schedule prayer and family time as non-negotiable blocks
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-emirati-sandBeige/30 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-emirati-desertGold/10 p-2 rounded-full">
                        <Coffee className="h-5 w-5 text-emirati-camelBrown" />
                      </div>
                      <CardTitle className="text-lg text-emirati-deepBrown">Wellness Practices</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Integrate regular physical activity into your routine
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Practice mindfulness and reflection techniques
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Ensure proper nutrition and adequate sleep
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-emirati-sandBeige/30 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-emirati-desertGold/10 p-2 rounded-full">
                        <Sunset className="h-5 w-5 text-emirati-camelBrown" />
                      </div>
                      <CardTitle className="text-lg text-emirati-deepBrown">Cultural Balance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Honor family commitments and traditions
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Participate in community and cultural events
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-emirati-desertGold rounded-full"></span>
                        Find ways to incorporate heritage into daily life
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
                <h3 className="text-xl font-bold text-emirati-deepBrown mb-4">Personal Balance Assessment</h3>
                <p className="text-gray-700 mb-4">
                  Take our assessment to understand your current work-life balance and receive personalized recommendations.
                </p>
                <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                  Start Assessment
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Recommended Reading</CardTitle>
                    <CardDescription>Books and articles on work-life balance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Boundaries: When to Say Yes, How to Say No</p>
                        <p className="text-sm text-gray-500">Dr. Henry Cloud</p>
                      </li>
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Deep Work: Rules for Focused Success</p>
                        <p className="text-sm text-gray-500">Cal Newport</p>
                      </li>
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Balancing Work and Life in the UAE</p>
                        <p className="text-sm text-gray-500">UAE Ministry of Happiness</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Digital Tools</CardTitle>
                    <CardDescription>Applications to help manage your time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Focus Timer</p>
                        <p className="text-sm text-gray-500">Pomodoro technique app with prayer time integration</p>
                      </li>
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Mindfulness UAE</p>
                        <p className="text-sm text-gray-500">Meditation app with Arabic language support</p>
                      </li>
                      <li className="border-b border-gray-100 pb-3">
                        <p className="font-medium">Family Calendar Pro</p>
                        <p className="text-sm text-gray-500">Shared calendar for family commitments</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-emirati-sandBeige/20 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-bold text-emirati-deepBrown mb-3">UAE Support Services</h3>
                <p className="text-gray-700 mb-4">
                  The UAE offers various support services to help citizens maintain a healthy work-life balance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-emirati-deepBrown">Employee Wellness Program</h4>
                    <p className="text-sm text-gray-600 mt-1">Government-backed wellness initiatives for UAE nationals</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-emirati-deepBrown">Family Support Centers</h4>
                    <p className="text-sm text-gray-600 mt-1">Resources for working parents and caregivers</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workshops" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-emirati-deepBrown mb-4">Upcoming Workshops</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">Balancing Career and Family Life</h4>
                        <p className="text-sm text-gray-600 mt-1">Learn strategies for managing professional growth while prioritizing family</p>
                      </div>
                      <span className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen px-2 py-1 rounded text-sm">Online</span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" /> June 15, 2023 | 5:00 PM - 7:00 PM
                    </div>
                    <Button className="mt-3" variant="outline" size="sm">Register Now</Button>
                  </div>
                  
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">Stress Management for Professionals</h4>
                        <p className="text-sm text-gray-600 mt-1">Practical techniques for managing workplace stress</p>
                      </div>
                      <span className="bg-emirati-desertGold/10 text-emirati-camelBrown px-2 py-1 rounded text-sm">In Person</span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" /> June 22, 2023 | 10:00 AM - 2:00 PM
                    </div>
                    <Button className="mt-3" variant="outline" size="sm">Register Now</Button>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">Digital Wellbeing Workshop</h4>
                        <p className="text-sm text-gray-600 mt-1">Managing screen time and digital boundaries</p>
                      </div>
                      <span className="bg-emirati-oasisGreen/10 text-emirati-oasisGreen px-2 py-1 rounded text-sm">Online</span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" /> July 5, 2023 | 6:00 PM - 8:00 PM
                    </div>
                    <Button className="mt-3" variant="outline" size="sm">Register Now</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-emirati-sandBeige/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-emirati-deepBrown mb-3">Request a Workshop</h3>
                <p className="text-gray-700 mb-4">
                  If you'd like a specific work-life balance workshop for your organization, please contact us.
                </p>
                <Link to="/career-passport">
                  <Button variant="outline">Contact Our Team</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkLifeBalance;
