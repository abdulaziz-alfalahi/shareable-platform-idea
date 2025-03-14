
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calculator, Book, HelpCircle } from "lucide-react";
import EnhancedRetirementCalculator from "@/components/retirement/EnhancedRetirementCalculator";
import { UaeAlert, UaeAlertDescription, UaeAlertTitle, UaeDivider } from "@/components/ui/uae";

const EnhancedRetirementPlanning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-emirati-desertRed">Retirement Planning</h1>
          <p className="text-gray-600">Plan your journey from career to retirement</p>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="mb-8 w-full justify-start border-b pb-0">
          <TabsTrigger value="calculator" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-emirati-oasisGreen">
            <Calculator className="h-4 w-4 mr-2" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="resources" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-emirati-oasisGreen">
            <Book className="h-4 w-4 mr-2" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="help" className="rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-emirati-oasisGreen">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <EnhancedRetirementCalculator />
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-emirati-sandBeige/10 p-6 rounded-lg border border-emirati-sandBeige/20">
              <h2 className="text-2xl font-semibold text-emirati-desertRed mb-3">UAE Pension System Guide</h2>
              <UaeDivider variant="gradient" className="mb-4" />
              
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  The UAE has established a robust pension system for Emirati nationals, primarily administered through 
                  the General Pension and Social Security Authority (GPSSA). The system ensures that citizens who have 
                  dedicated years of service to the nation's development can enjoy a secure retirement.
                </p>
                
                <h3 className="text-lg font-medium text-emirati-deepBrown mt-4">Key Features of the UAE Pension System:</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-emirati-oasisGreen">Eligibility Requirements</h4>
                    <p className="text-sm mt-1">Emirati nationals employed in government, semi-government, and private sectors are eligible for pension benefits after completing a minimum service period.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-emirati-oasisGreen">Contribution Rates</h4>
                    <p className="text-sm mt-1">Employees contribute 5% of their monthly salary, while employers contribute 15% for government employees and 12.5% for private sector employees.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-emirati-oasisGreen">Retirement Age</h4>
                    <p className="text-sm mt-1">The standard retirement age is 60 years for men and 55 years for women in the government sector, though early retirement options are available.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-emirati-oasisGreen">Pension Calculation</h4>
                    <p className="text-sm mt-1">Pension is calculated as a percentage of the final salary based on years of service, typically ranging from 60% to 80% for full service periods.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <UaeAlert variant="oasis">
              <UaeAlertTitle>Financial Planning Resources</UaeAlertTitle>
              <UaeAlertDescription>
                The Ministry of Finance offers financial literacy programs specifically designed for UAE nationals 
                planning for retirement. These resources include workshops, online courses, and one-on-one financial 
                counseling services.
              </UaeAlertDescription>
            </UaeAlert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">GPSSA Website</h3>
                <p className="text-sm text-gray-600 mt-2">Official resource for pension regulations, calculators, and services for UAE nationals.</p>
                <Button variant="link" className="text-emirati-oasisGreen p-0 h-auto mt-2">Visit Website</Button>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">Retirement Planning Workshops</h3>
                <p className="text-sm text-gray-600 mt-2">Regular workshops held across the UAE to help citizens prepare for retirement.</p>
                <Button variant="link" className="text-emirati-oasisGreen p-0 h-auto mt-2">Find Workshops</Button>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">Financial Advisors Network</h3>
                <p className="text-sm text-gray-600 mt-2">Connect with certified financial advisors specialized in UAE pension and retirement planning.</p>
                <Button variant="link" className="text-emirati-oasisGreen p-0 h-auto mt-2">Find an Advisor</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="help">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-emirati-desertRed">Frequently Asked Questions</h2>
            <UaeDivider variant="gradient" className="mb-6" />
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">How is the UAE government pension calculated?</h3>
                <p className="text-gray-600 mt-2">
                  The UAE government pension is calculated based on your years of service and your final salary. 
                  For the first 15 years of service, you earn 2.5% per year, and 2% for each additional year, 
                  up to a maximum of 80% of your final salary.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">Can I retire early in the UAE?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, early retirement is possible for UAE nationals with at least 20 years of service. 
                  However, early retirement may result in a reduced pension amount. The calculator takes 
                  this into account when providing retirement projections.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">How accurate is the retirement calculator?</h3>
                <p className="text-gray-600 mt-2">
                  The calculator provides estimates based on the information you provide and standard financial assumptions. 
                  Actual results may vary based on changes in investment returns, inflation, regulatory changes, and personal 
                  circumstances. We recommend reviewing your retirement plan regularly with a financial advisor.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
                <h3 className="font-semibold text-emirati-deepBrown">What should I do if my retirement funds are insufficient?</h3>
                <p className="text-gray-600 mt-2">
                  If the calculator indicates insufficient retirement funds, consider these strategies:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Increase your monthly savings rate</li>
                    <li>Explore higher-return investment options with appropriate risk levels</li>
                    <li>Consider delaying retirement to increase your pension benefits</li>
                    <li>Develop additional income streams that can continue into retirement</li>
                    <li>Consult with a financial advisor for personalized guidance</li>
                  </ul>
                </p>
              </div>
            </div>
            
            <div className="bg-emirati-oasisGreen/10 p-6 rounded-lg mt-8">
              <h3 className="font-semibold text-emirati-oasisGreen">Need Additional Help?</h3>
              <p className="text-gray-700 mt-2">
                Our team of retirement planning specialists is available to provide personalized guidance.
                Schedule a consultation to discuss your specific retirement goals and concerns.
              </p>
              <Button className="mt-4 bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedRetirementPlanning;
