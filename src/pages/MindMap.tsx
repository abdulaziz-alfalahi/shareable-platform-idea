
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, User, GraduationCap, Users, Briefcase, Building, BookOpen, Command, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MindMapNodeProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isRoot?: boolean;
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ title, children, icon, isRoot = false }) => {
  return (
    <div className={`min-w-[200px] ${isRoot ? 'bg-emirati-oasisGreen/90 text-white' : 'bg-white'} rounded-lg shadow-md border border-emirati-sandBeige p-4`}>
      <div className="flex items-center gap-2 font-bold mb-2">
        {icon}
        <h3 className={`${isRoot ? 'text-white' : 'text-emirati-desertRed'}`}>{title}</h3>
      </div>
      <div className="ml-2 space-y-2 text-sm">
        {children}
      </div>
    </div>
  );
};

interface JourneyStep {
  id: string;
  title: string;
  points: string[];
}

interface UserJourney {
  persona: string;
  icon: React.ReactNode;
  description: string;
  steps: JourneyStep[];
}

const MindMap: React.FC = () => {
  const [activePersona, setActivePersona] = useState<string>('student');

  const journeys: Record<string, UserJourney> = {
    student: {
      persona: 'Student',
      icon: <GraduationCap className="h-5 w-5" />,
      description: 'From registration to career success',
      steps: [
        {
          id: 'registration',
          title: '1. Registration & Onboarding',
          points: [
            'Sign up on the platform using UAE Pass integration',
            'Complete initial profile with academic background, interests, and goals',
            'Take a comprehensive skills and interest assessment',
            'Receive personalized dashboard setup based on assessment results'
          ]
        },
        {
          id: 'exploration',
          title: '2. Career Exploration Phase',
          points: [
            'Explore recommended career paths based on assessment results',
            'Use the Career Passport to view potential career journeys',
            'Browse the available training programs, job opportunities, and educational resources',
            'Attend virtual career orientation sessions or workshops'
          ]
        },
        {
          id: 'goals',
          title: '3. Goal Setting & Planning',
          points: [
            'Work with advisors to set clear educational and career goals',
            'Establish milestone targets in the Career Passport system',
            'Create a personalized development plan with recommended courses',
            'Schedule regular check-ins with career advisors'
          ]
        },
        {
          id: 'skills',
          title: '4. Skill Development',
          points: [
            'Enroll in recommended courses and training programs',
            'Complete assessments to identify and address skill gaps',
            'Earn stamps in the Career Passport for completed training',
            'Track progress through the skills development dashboard'
          ]
        },
        {
          id: 'internship',
          title: '5. Internship & Early Experience',
          points: [
            'Search and apply for internships through the job matching system',
            'Prepare for interviews with virtual practice sessions',
            'Gain practical experience through part-time or remote opportunities',
            'Receive mentorship from industry professionals'
          ]
        },
        {
          id: 'portfolio',
          title: '6. Portfolio Building',
          points: [
            'Document achievements, projects, and experiences',
            'Build a digital portfolio showcasing skills and work',
            'Collect references and recommendations from mentors/supervisors',
            'Earn additional passport stamps for practical accomplishments'
          ]
        },
        {
          id: 'job-search',
          title: '7. Job Search & Placement',
          points: [
            'Access exclusive job opportunities through the platform',
            'Use location-based job matching to find convenient positions',
            'Apply for positions with the built-in application system',
            'Track application status through the dashboard'
          ]
        },
        {
          id: 'continuous',
          title: '8. Continuous Development',
          points: [
            'Participate in upskilling or reskilling programs as needed',
            'Join specialized training for specific industry requirements',
            'Unlock advanced career passport features with experience',
            'Network with other professionals in the community section'
          ]
        },
        {
          id: 'advancement',
          title: '9. Career Advancement',
          points: [
            'Plan career progression using the pathway visualization tools',
            'Identify advancement opportunities within current fields',
            'Explore leadership training and advanced certification options',
            'Simulate different career paths to make informed decisions'
          ]
        },
        {
          id: 'retirement',
          title: '10. Retirement Planning',
          points: [
            'Begin early retirement planning using the simulation tools',
            'Set financial goals for long-term security',
            'Balance career achievements with personal financial goals',
            'Access specialized advisory services for retirement preparation'
          ]
        }
      ]
    },
    recruiter: {
      persona: 'Recruiter',
      icon: <Briefcase className="h-5 w-5" />,
      description: 'Finding and recruiting top Emirati talent',
      steps: [
        {
          id: 'recruiter-onboarding',
          title: '1. Onboarding and Account Setup',
          points: [
            'Register on the platform using UAE Pass integration',
            'Complete profile with company information, industry sector, and recruitment needs',
            'Set preferences for candidate matching and notifications'
          ]
        },
        {
          id: 'jobs',
          title: '2. Post and Manage Job Vacancies',
          points: [
            'Create detailed job listings with skills, qualifications, and cultural fit requirements',
            'Set location preferences (using the map integration for geographical targeting)',
            'Specify opportunity type (full-time, part-time, remote, or gig work)',
            'Track application status and vacancy performance metrics'
          ]
        },
        {
          id: 'candidates',
          title: '3. Search and Match with Candidates',
          points: [
            'Use the advanced search features to filter Emirati talent by qualifications, skills, and availability',
            'Review candidate profiles, portfolios, and skills assessments',
            'Get AI-powered matching suggestions based on job requirements',
            'Save promising candidates to shortlists for specific roles'
          ]
        },
        {
          id: 'interviews',
          title: '4. Interview and Assessment Process',
          points: [
            'Schedule interviews with candidates through the platform calendar',
            'Conduct virtual interviews when appropriate',
            'Document interview feedback and assessment results',
            'Compare candidates against job requirements'
          ]
        },
        {
          id: 'training',
          title: '5. Collaborate with Training Institutes',
          points: [
            'Identify skill gaps in the candidate pool',
            'Partner with training institutes to develop targeted programs',
            'Offer internships or training opportunities to promising candidates',
            'Track progress of candidates in training programs'
          ]
        },
        {
          id: 'onboarding',
          title: '6. Onboarding and Development',
          points: [
            'Complete hiring process with successful candidates',
            'Set up development plans for new hires',
            'Track performance and identify areas for growth',
            'Suggest upskilling or reskilling opportunities as needed'
          ]
        },
        {
          id: 'analytics',
          title: '7. Continuous Engagement and Analytics',
          points: [
            'Monitor dashboard analytics on recruitment effectiveness',
            'Receive notifications about promising new Emirati talent',
            'Participate in platform events and networking opportunities',
            'Provide feedback to improve platform services'
          ]
        },
        {
          id: 'planning',
          title: '8. Strategic Workforce Planning',
          points: [
            'Use platform data to identify talent trends',
            'Plan future recruitment needs based on market insights',
            'Develop strategies for long-term Emiratization goals',
            'Adjust recruitment strategies based on performance metrics'
          ]
        }
      ]
    },
    parent: {
      persona: 'Parent',
      icon: <Users className="h-5 w-5" />,
      description: 'Supporting their child\'s educational and career journey',
      steps: [
        {
          id: 'parent-registration',
          title: '1. Registration and Setup',
          points: [
            'Register on the platform using UAE Pass integration',
            'Create a parent profile and link to their child\'s profile',
            'Complete questionnaires about their child\'s strengths, interests, and educational background',
            'Set notification preferences for academic and career milestones'
          ]
        },
        {
          id: 'assessment',
          title: '2. Educational Assessment and Planning',
          points: [
            'Review their child\'s academic profile and performance metrics',
            'Access assessment results to understand strengths and areas for improvement',
            'Explore recommended study paths based on their child\'s aptitudes',
            'Collaborate with career advisors to develop personalized educational plans'
          ]
        },
        {
          id: 'path-exploration',
          title: '3. Career Path Exploration',
          points: [
            'Use the Career Pathway Simulator with their child to explore potential career paths',
            'Review industry trends and employment opportunities in the UAE',
            'Understand skill requirements for different professions',
            'Compare different educational routes to desired careers'
          ]
        },
        {
          id: 'progress',
          title: '4. Academic Progress Monitoring',
          points: [
            'Track their child\'s coursework completion and grades',
            'Monitor progress towards educational milestones',
            'Review teacher/advisor feedback and recommendations',
            'Receive alerts about academic concerns or achievements'
          ]
        },
        {
          id: 'extra',
          title: '5. Extracurricular and Skill Development',
          points: [
            'Discover workshops, competitions, and enrichment activities aligned with career interests',
            'Support their child in building a portfolio of achievements and experiences',
            'Track skills development and certification progress',
            'Monitor their child\'s Career Passport to see growth in various competencies'
          ]
        }
      ]
    },
    internship: {
      persona: 'Internship Coordinator',
      icon: <Building className="h-5 w-5" />,
      description: 'Managing internship programs and student placements',
      steps: [
        {
          id: 'coordinator-setup',
          title: '1. Onboarding and Setup',
          points: [
            'Register on the platform using UAE Pass integration',
            'Create a profile specifying educational institution and department',
            'Set up program parameters (duration, credit requirements, evaluation criteria)',
            'Configure notification preferences and dashboard views'
          ]
        },
        {
          id: 'program',
          title: '2. Program Management',
          points: [
            'Define internship seasons and application timelines',
            'Create different internship program structures',
            'Establish skill-based requirements for various departments/majors',
            'Upload documentation and learning objectives for students'
          ]
        },
        {
          id: 'student-mgmt',
          title: '3. Student Management',
          points: [
            'Access student profiles and performance metrics',
            'Review student skill assessments and career interests',
            'Filter students by major, year, and skill set',
            'Track student progress toward internship requirements'
          ]
        },
        {
          id: 'employer',
          title: '4. Employer Partnership Management',
          points: [
            'Browse and connect with registered companies',
            'View company profiles and internship history',
            'Send partnership requests to potential host companies',
            'Manage existing partnerships and agreements'
          ]
        },
        {
          id: 'matching',
          title: '5. Internship Matching Process',
          points: [
            'Post available internships with detailed requirements',
            'Use the matching algorithm to suggest suitable students for positions',
            'Review matching scores based on skills, interests, and location',
            'Create shortlists of candidates for each opportunity'
          ]
        }
      ]
    },
    advisor: {
      persona: 'Advisor',
      icon: <BookOpen className="h-5 w-5" />,
      description: 'Guiding students through educational and career decisions',
      steps: [
        {
          id: 'advisor-onboarding',
          title: '1. Onboarding and Profile Setup',
          points: [
            'Register on the platform using UAE Pass integration',
            'Complete profile with specialization areas (academic, career, personal development)',
            'Set availability for student appointments and consultations',
            'Configure notification preferences for student activities and alerts'
          ]
        },
        {
          id: 'dashboard',
          title: '2. Dashboard Orientation and Management',
          points: [
            'Access the Advisor Dashboard to view assigned students',
            'Review student profiles, academic records, and progress metrics',
            'Monitor flagged students who require immediate attention',
            'Customize dashboard views based on priority metrics (risk level, upcoming deadlines)'
          ]
        },
        {
          id: 'student-assessment',
          title: '3. Student Assessment and Planning',
          points: [
            'Review comprehensive student profiles including academic performance, career interests, and skill assessments',
            'Identify strengths, weaknesses, and potential career paths for each student',
            'Set up personalized development plans with specific goals and milestones',
            'Schedule regular check-in meetings with students'
          ]
        },
        {
          id: 'feedback',
          title: '4. Feedback and Goal Management',
          points: [
            'Provide structured feedback on student progress',
            'Create and assign specific, measurable goals for students',
            'Track goal completion rates and adjust timelines as needed',
            'Document all interactions and recommendations for continuity'
          ]
        },
        {
          id: 'risk',
          title: '5. Risk Management and Intervention',
          points: [
            'Monitor the risk indicators for students (attendance, grades, participation)',
            'Receive alerts when students are flagged as "At Risk" or "Needs Attention"',
            'Implement intervention strategies for at-risk students',
            'Document intervention outcomes and follow-up actions'
          ]
        }
      ]
    },
    command: {
      persona: 'Command and Control Center Agent',
      icon: <Command className="h-5 w-5" />,
      description: 'Monitoring and managing system-wide operations',
      steps: [
        {
          id: 'monitoring',
          title: '1. Centralized Monitoring Dashboard Access',
          points: [
            'Log in with specialized Command and Control credentials',
            'Access the real-time monitoring dashboard showing system-wide activity',
            'View key performance indicators across all platform functions',
            'Configure personalized dashboard views based on priority areas'
          ]
        },
        {
          id: 'performance',
          title: '2. System Performance Oversight',
          points: [
            'Monitor platform traffic, response times, and user engagement metrics',
            'Track system health indicators and resource utilization',
            'Receive automated alerts for performance anomalies or bottlenecks',
            'Initiate diagnostic procedures when performance issues are detected'
          ]
        },
        {
          id: 'data',
          title: '3. Data Flow and Integration Management',
          points: [
            'Oversee data exchange between platform components and external systems',
            'Monitor API performance and integration points with partner services',
            'Ensure data synchronization across the platform ecosystem',
            'Identify and resolve data flow disruptions or inconsistencies'
          ]
        },
        {
          id: 'user-monitoring',
          title: '4. User Activity Monitoring and Support',
          points: [
            'View aggregated user activity patterns across different user types',
            'Identify unusual usage patterns that may indicate issues',
            'Monitor support ticket volume and resolution metrics',
            'Coordinate response to system-wide issues affecting multiple users'
          ]
        },
        {
          id: 'security',
          title: '5. Security and Compliance Monitoring',
          points: [
            'Oversee security monitoring systems for potential threats or breaches',
            'Track compliance with data protection regulations and policies',
            'Review access logs for sensitive system areas and data',
            'Coordinate response to security incidents or policy violations'
          ]
        }
      ]
    },
    policy: {
      persona: 'Government Policy Maker',
      icon: <Settings className="h-5 w-5" />,
      description: 'Developing workforce policies based on platform data',
      steps: [
        {
          id: 'data-dashboard',
          title: '1. Data Dashboard Overview',
          points: [
            'Access a specialized policy dashboard with high-level metrics and trends',
            'Review aggregate workforce development statistics across the Emirates',
            'Analyze employment rates, educational pathway popularity, and skills gaps',
            'Identify key performance indicators related to Emiratization policies'
          ]
        },
        {
          id: 'demographic',
          title: '2. Demographic and Geographic Analysis',
          points: [
            'Examine user distribution across different emirates and regions',
            'Analyze participation rates across age groups, educational backgrounds, and sectors',
            'Review geographical patterns in employment, education, and skills development',
            'Identify underserved areas or demographics requiring targeted policy interventions'
          ]
        },
        {
          id: 'workforce',
          title: '3. Strategic Workforce Planning',
          points: [
            'Access predictive analytics on future workforce needs and compositions',
            'Review industry-specific employment trends and emerging sectors',
            'Analyze the alignment between educational outputs and market demands',
            'Identify strategic areas for policy development or refinement'
          ]
        },
        {
          id: 'education',
          title: '4. Educational Pathway Effectiveness',
          points: [
            'Evaluate completion rates and outcomes across different educational paths',
            'Compare employment success rates between various educational tracks',
            'Analyze time-to-employment metrics for different qualifications',
            'Identify educational approaches with highest return on investment'
          ]
        },
        {
          id: 'skills-gap',
          title: '5. Skills Gap Analysis and Response',
          points: [
            'Review comprehensive reports on skills shortages across sectors',
            'Analyze effectiveness of current upskilling and reskilling initiatives',
            'Identify emerging skill needs based on industry trends and forecasts',
            'Plan policy interventions to address critical skills gaps'
          ]
        }
      ]
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="border-emirati-sandBeige">
        <CardHeader className="border-b border-emirati-sandBeige/20 bg-emirati-sandBeige/10">
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6 text-emirati-desertRed" />
            <CardTitle className="text-3xl font-bold text-emirati-desertRed">The Platform Mindmap</CardTitle>
          </div>
          <CardDescription>
            A visual representation of user journeys through the Emirati career development platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-lg text-emirati-deepBlue mb-4">
              This mindmap illustrates how different users interact with the platform from registration to achieving their goals, showing the interconnected nature of the career development ecosystem.
            </p>
            <p className="text-muted-foreground">
              Select a persona below to view their journey through the platform:
            </p>
          </div>

          <Tabs value={activePersona} onValueChange={setActivePersona} className="w-full">
            <TabsList className="mb-6 bg-emirati-sandBeige/20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              {Object.entries(journeys).map(([key, journey]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white flex items-center gap-1"
                >
                  {journey.icon}
                  <span className="hidden md:inline">{journey.persona}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(journeys).map(([key, journey]) => (
              <TabsContent key={key} value={key} className="pt-2">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-emirati-deepBlue flex items-center gap-2">
                    {journey.icon}
                    {journey.persona} Journey
                  </h2>
                  <p className="text-muted-foreground">{journey.description}</p>
                </div>
                
                <div className="overflow-x-auto pb-6">
                  <div className="min-w-max">
                    <div className="flex flex-col">
                      <div className="mx-auto mb-8">
                        <MindMapNode 
                          title={journey.persona} 
                          icon={journey.icon}
                          isRoot={true}
                        >
                          <p>{journey.description}</p>
                        </MindMapNode>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {journey.steps.map((step) => (
                          <div key={step.id}>
                            <MindMapNode title={step.title} icon={null}>
                              <ul className="list-disc list-inside">
                                {step.points.map((point, idx) => (
                                  <li key={idx} className="mb-1">{point}</li>
                                ))}
                              </ul>
                            </MindMapNode>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    This journey is designed to be cyclical rather than linear, with users continuously returning to different stages as they progress.
                  </p>
                  <Button className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90">
                    <User className="mr-2 h-4 w-4" /> 
                    Try Another Persona
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MindMap;
