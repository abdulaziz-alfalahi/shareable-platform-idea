
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/toast";
import { notifySuccess } from "@/utils/notification";

const StudentDashboard = () => {
  // State management for self-assessment
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const { toast } = useToast();

  // Self-assessment questions
  const assessmentQuestions = [
    {
      question: "How comfortable are you with problem-solving and logical reasoning?",
      options: ["Very comfortable", "Somewhat comfortable", "Not very comfortable", "Not comfortable at all"]
    },
    {
      question: "What type of tasks do you enjoy most?",
      options: ["Building things", "Solving puzzles", "Helping others", "Creating content"]
    },
    {
      question: "How important is creativity in your ideal career?",
      options: ["Essential", "Important", "Somewhat important", "Not important"]
    },
    {
      question: "Do you prefer working independently or in teams?",
      options: ["Strongly prefer independent work", "Slightly prefer independent work", "Slightly prefer teamwork", "Strongly prefer teamwork"]
    },
    {
      question: "How comfortable are you with technology and digital tools?",
      options: ["Very comfortable", "Somewhat comfortable", "Not very comfortable", "Not comfortable at all"]
    },
    {
      question: "How do you feel about working with data and numbers?",
      options: ["Enjoy it greatly", "Moderately enjoy it", "Neutral", "Prefer to avoid it"]
    },
    {
      question: "What environment do you work best in?",
      options: ["Structured with clear rules", "Flexible with some guidelines", "Creative with few constraints", "Varies depending on the task"]
    },
    {
      question: "How do you approach learning new skills?",
      options: ["Through hands-on practice", "By watching tutorials", "Reading documentation", "In a classroom setting"]
    },
    {
      question: "What types of challenges motivate you most?",
      options: ["Technical problems", "Creative projects", "People-oriented challenges", "Analytical puzzles"]
    },
    {
      question: "Where do you see yourself in five years?",
      options: ["Leading a team", "Specialized in a technical role", "Working independently", "Entrepreneurial path"]
    }
  ];

  // Mock recommended specializations based on assessment
  const specializationRecommendations = [
    {
      title: "Software Engineering",
      match: "92%",
      description: "Based on your answers, you show strong aptitude for logical thinking and problem-solving, key traits for success in software engineering.",
      skills: ["Programming", "Problem Solving", "Systems Design"],
      courses: 14
    },
    {
      title: "Data Science",
      match: "85%",
      description: "Your analytical mindset and comfort with numbers suggest you would excel in data science and analytics roles.",
      skills: ["Statistics", "Machine Learning", "Data Visualization"],
      courses: 12
    },
    {
      title: "UX/UI Design",
      match: "78%",
      description: "Your creative inclination combined with technical comfort indicates potential in user experience and interface design.",
      skills: ["User Research", "Design Thinking", "Prototyping"],
      courses: 10
    }
  ];

  // Handle assessment interaction
  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeAssessment = () => {
    setShowResults(true);
    setAssessmentComplete(true);
    notifySuccess({
      title: "Assessment Complete",
      description: "Your specialization recommendations are ready to view."
    });
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
    setAssessmentComplete(false);
  };

  // Progress calculation
  const progressPercentage = Math.round(((currentQuestionIndex + (answers[currentQuestionIndex] ? 1 : 0)) / assessmentQuestions.length) * 100);

  // Mock progress data
  const courseProgress = 65;
  const skillsProgress = 72;
  const certificationsProgress = 40;

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and explore career options</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessment">Self-Assessment</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="career">Career Path</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Your current course completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={courseProgress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{courseProgress}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">View Courses</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Development</CardTitle>
                <CardDescription>Skills you've acquired so far</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={skillsProgress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{skillsProgress}%</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Programming</Badge>
                  <Badge>Data Analysis</Badge>
                  <Badge>Communication</Badge>
                  <Badge>Project Management</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Professional certifications progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={certificationsProgress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{certificationsProgress}%</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Web Development Basics</span>
                    <Badge variant="outline">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Data Science Fundamentals</span>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cloud Architecture</span>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment">
          <Card>
            <CardHeader>
              <CardTitle>Specialization Self-Assessment</CardTitle>
              <CardDescription>
                Complete this assessment to discover which career paths match your skills and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {assessmentQuestions.length}</span>
                      <span className="font-medium">{progressPercentage}% complete</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {assessmentQuestions[currentQuestionIndex].question}
                    </h3>

                    <RadioGroup 
                      value={answers[currentQuestionIndex] || ""}
                      onValueChange={handleOptionSelect}
                      className="space-y-3"
                    >
                      {assessmentQuestions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {option}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Your Recommended Specializations</h3>
                    <p className="text-muted-foreground">Based on your assessment, these career paths may be a good fit for you:</p>
                  </div>

                  <div className="space-y-4">
                    {specializationRecommendations.map((spec, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-lg">{spec.title}</h4>
                          <Badge className="bg-green-500">{spec.match} Match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{spec.description}</p>
                        <div>
                          <span className="text-sm font-medium">Key Skills:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {spec.skills.map((skill, i) => (
                              <Badge key={i} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>{spec.courses} relevant courses available</span>
                          <Button size="sm">Explore Path</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!showResults ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={goToNextQuestion} 
                    disabled={!answers[currentQuestionIndex]}
                  >
                    {currentQuestionIndex === assessmentQuestions.length - 1 ? "Finish" : "Next"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={resetAssessment}>
                  Retake Assessment
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>My Enrolled Courses</CardTitle>
              <CardDescription>
                Track your progress in current courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Introduction to Programming</h4>
                    <Badge>In Progress</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>6/8 modules completed</span>
                    <span>75% complete</span>
                  </div>
                  <Button size="sm" variant="outline">Resume Course</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Data Analysis Fundamentals</h4>
                    <Badge>In Progress</Badge>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>2/5 modules completed</span>
                    <span>40% complete</span>
                  </div>
                  <Button size="sm" variant="outline">Resume Course</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Professional Communication Skills</h4>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0/6 modules completed</span>
                    <span>0% complete</span>
                  </div>
                  <Button size="sm" variant="outline">Start Course</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career">
          <Card>
            <CardHeader>
              <CardTitle>Career Development Path</CardTitle>
              <CardDescription>
                Your personalized career roadmap based on your profile and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-lg mb-2">Recommended Career Path: Software Development</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your skills, interests, and academic performance, we recommend focusing on software development with a specialization in web technologies.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Current Stage: Foundation Building</h4>
                      <p className="text-sm text-muted-foreground">Complete core programming courses and begin specialization</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Next Steps:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary flex items-center justify-center text-primary-foreground text-xs">1</div>
                          <div>
                            <p className="font-medium">Complete "Advanced Programming Concepts" course</p>
                            <p className="text-muted-foreground">Estimated time: 2 months</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary flex items-center justify-center text-primary-foreground text-xs">2</div>
                          <div>
                            <p className="font-medium">Begin "Web Development Frameworks" specialization</p>
                            <p className="text-muted-foreground">Estimated time: 3 months</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full h-5 w-5 bg-primary flex items-center justify-center text-primary-foreground text-xs">3</div>
                          <div>
                            <p className="font-medium">Apply for summer internship program</p>
                            <p className="text-muted-foreground">Application deadline: March 15</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Long-term Milestones:</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                          <span>Junior Developer</span>
                          <Badge variant="outline">1-2 years</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span>Mid-level Developer</span>
                          <Badge variant="outline">3-5 years</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span>Senior Developer/Team Lead</span>
                          <Badge variant="outline">5+ years</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Skill Gaps to Address</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Front-end Development</span>
                        <span>60% proficient</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Database Management</span>
                        <span>45% proficient</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Architecture</span>
                        <span>30% proficient</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                  <Button className="mt-4" variant="outline" size="sm">View Recommended Courses</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
