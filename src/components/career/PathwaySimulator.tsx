
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ChevronRight, Clock, TrendingUp, Briefcase, Award, School, AlertTriangle } from 'lucide-react';
import { CareerPath, CareerNode, SimulationResult } from '@/utils/career/pathwayTypes';
import { getCareerPaths, getCareerPathById, simulateCareerPath } from '@/utils/career/pathwaySimulator';
import { Student } from '@/types/student';
import PathwayVisualization from './PathwayVisualization';
import SimulationResults from './SimulationResults';

interface PathwaySimulatorProps {
  student: Student;
}

const PathwaySimulator: React.FC<PathwaySimulatorProps> = ({ student }) => {
  const navigate = useNavigate();
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [activeTab, setActiveTab] = useState('path-selection');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch available career paths
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        const paths = await getCareerPaths();
        setCareerPaths(paths);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching career paths:', error);
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, []);

  // Handle path selection
  const handlePathChange = async (pathId: string) => {
    setSelectedPathId(pathId);
    setSelectedNodes([]);
    setSimulationResult(null);
    
    try {
      const path = await getCareerPathById(pathId);
      setSelectedPath(path);
      
      // Automatically select the entry level node
      if (path) {
        const entryNode = path.nodes.find(node => node.level === 'entry');
        if (entryNode) {
          setSelectedNodes([entryNode.id]);
        }
      }
    } catch (error) {
      console.error('Error fetching career path details:', error);
    }
  };

  // Handle node selection/deselection
  const handleNodeToggle = (nodeId: string) => {
    // Find the node and its position in the path
    const node = selectedPath?.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Check if node is already selected
    if (selectedNodes.includes(nodeId)) {
      // Get all nodes that depend on this node
      const dependentNodes = selectedPath?.nodes
        .filter(n => n.prerequisites?.includes(nodeId))
        .map(n => n.id) || [];
      
      // Remove this node and all dependent nodes
      setSelectedNodes(prev => 
        prev.filter(id => id !== nodeId && !dependentNodes.includes(id))
      );
    } else {
      // Add this node and its prerequisites if they're not already selected
      const nodesToAdd: string[] = [nodeId];
      
      // Add prerequisites recursively
      const addPrerequisites = (id: string) => {
        const node = selectedPath?.nodes.find(n => n.id === id);
        if (node?.prerequisites && node.prerequisites.length > 0) {
          node.prerequisites.forEach(prereq => {
            if (!nodesToAdd.includes(prereq) && !selectedNodes.includes(prereq)) {
              nodesToAdd.push(prereq);
              addPrerequisites(prereq);
            }
          });
        }
      };
      
      addPrerequisites(nodeId);
      
      // Combine current selected nodes with new nodes to add
      setSelectedNodes(prev => [...prev, ...nodesToAdd.filter(id => !prev.includes(id))]);
    }
  };

  // Run the simulation
  const runSimulation = () => {
    if (!selectedPathId || selectedNodes.length === 0) return;
    
    const result = simulateCareerPath(student, selectedPathId, selectedNodes);
    setSimulationResult(result);
    setActiveTab('simulation-results');
  };

  // Check if simulation can be run
  const canRunSimulation = selectedPathId && selectedNodes.length > 0;

  // Determine if a node can be selected based on prerequisites
  const canSelectNode = (node: CareerNode): boolean => {
    // If no prerequisites or all prerequisites are selected, then it can be selected
    return !node.prerequisites || node.prerequisites.every(prereq => selectedNodes.includes(prereq));
  };

  return (
    <Card className="border-emirati-sandBeige">
      <CardHeader className="border-b border-emirati-sandBeige/20 bg-emirati-sandBeige/10">
        <CardTitle className="text-2xl font-bold text-emirati-desertRed">
          Career Pathway Simulator
        </CardTitle>
        <CardDescription>
          Explore different career paths and visualize your journey to success
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-emirati-sandBeige/20 grid grid-cols-2">
            <TabsTrigger
              value="path-selection"
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
            >
              <Briefcase size={16} className="mr-2" /> Path Selection
            </TabsTrigger>
            <TabsTrigger
              value="simulation-results"
              className="data-[state=active]:bg-emirati-oasisGreen data-[state=active]:text-white"
              disabled={!simulationResult}
            >
              <TrendingUp size={16} className="mr-2" /> Simulation Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="path-selection">
            <div className="space-y-6">
              {/* Path Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select a Career Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Select 
                      value={selectedPathId}
                      onValueChange={handlePathChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a career path" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerPaths.map(path => (
                          <SelectItem key={path.id} value={path.id}>
                            {path.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedPath && (
                    <div className="flex items-center justify-end space-x-2">
                      <div className="text-sm rounded bg-emirati-sandBeige/20 px-2 py-1">
                        <span className="font-medium">Demand:</span> {' '}
                        {selectedPath.popularity >= 7 ? (
                          <span className="text-green-600 font-medium">High</span>
                        ) : selectedPath.popularity >= 4 ? (
                          <span className="text-amber-600 font-medium">Medium</span>
                        ) : (
                          <span className="text-red-600 font-medium">Low</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Path Visualization */}
              {selectedPath && (
                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {selectedPath.nodes.map((node) => {
                      const isSelected = selectedNodes.includes(node.id);
                      const canSelect = canSelectNode(node);
                      const isDisabled = !canSelect && !isSelected;
                      
                      return (
                        <div
                          key={node.id}
                          className={`p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'border-emirati-oasisGreen bg-emirati-oasisGreen/10'
                              : isDisabled
                              ? 'border-gray-200 bg-gray-50 opacity-60'
                              : 'border-emirati-sandBeige/40 hover:border-emirati-oasisGreen/60'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold flex items-center gap-2">
                                {node.title}
                                {isSelected && (
                                  <Check className="h-5 w-5 text-emirati-oasisGreen" />
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {node.description}
                              </p>
                              
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{node.timeToAchieve}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <School className="h-4 w-4 text-muted-foreground" />
                                    <span>{node.education[0]}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span>{node.level.charAt(0).toUpperCase() + node.level.slice(1)} Level</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    <span>{node.salary.min.toLocaleString()} - {node.salary.max.toLocaleString()} {node.salary.currency}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleNodeToggle(node.id)}
                              disabled={isDisabled && !isSelected}
                              className="ml-4"
                            >
                              {isSelected ? "Selected" : "Select"}
                            </Button>
                          </div>
                          
                          {isDisabled && (
                            <div className="mt-2 text-sm flex items-center gap-1 text-amber-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span>Complete previous levels first</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={runSimulation}
                      disabled={!canRunSimulation}
                      className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                    >
                      Run Simulation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="simulation-results">
            {simulationResult && selectedPath && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time to Complete</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-emirati-oasisGreen" />
                        <span className="text-2xl font-semibold">{simulationResult.timeToComplete}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Potential Salary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emirati-oasisGreen" />
                        <span className="text-2xl font-semibold">
                          {simulationResult.potentialSalary.toLocaleString()} AED
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Challenge Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-emirati-oasisGreen" />
                        <span className="text-2xl font-semibold capitalize">
                          {simulationResult.challengeLevel}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* Required Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Required Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {simulationResult.requiredSkills.map((skill, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 rounded-full bg-emirati-sandBeige/20 text-sm"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recommended Training */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Training</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {simulationResult.recommendedTraining.map((training, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-emirati-oasisGreen mt-0.5" />
                            {training}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('path-selection')}
                  >
                    Modify Path
                  </Button>
                  <Button
                    onClick={() => navigate('/training-centers')}
                    className="bg-emirati-oasisGreen hover:bg-emirati-oasisGreen/90"
                  >
                    Explore Training Options
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PathwaySimulator;
