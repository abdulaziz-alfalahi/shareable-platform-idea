
/**
 * Service for managing assessment questions
 */
import { AssessmentQuestion } from './assessment-types';

/**
 * Get assessment questions for specific skill areas
 */
export const getAssessmentQuestions = (skillAreas: string[]): AssessmentQuestion[] => {
  // In a real app, these would come from a database
  // This is a simplified implementation with mock data
  const allQuestions: Record<string, AssessmentQuestion[]> = {
    "Leadership": [
      {
        id: 1,
        question: "How comfortable are you with making decisions that impact your team?",
        skillArea: "Leadership",
        options: [
          { text: "Very uncomfortable", score: 10 },
          { text: "Somewhat uncomfortable", score: 30 },
          { text: "Neutral", score: 50 },
          { text: "Somewhat comfortable", score: 70 },
          { text: "Very comfortable", score: 90 }
        ]
      },
      {
        id: 2,
        question: "How well do you delegate tasks to others?",
        skillArea: "Leadership",
        options: [
          { text: "I rarely delegate", score: 10 },
          { text: "I sometimes delegate but often take tasks back", score: 30 },
          { text: "I delegate when necessary", score: 50 },
          { text: "I delegate effectively most of the time", score: 70 },
          { text: "I'm excellent at delegating the right tasks to the right people", score: 90 }
        ]
      }
    ],
    "Programming": [
      {
        id: 3,
        question: "How confident are you in solving complex programming problems?",
        skillArea: "Programming",
        options: [
          { text: "Not confident at all", score: 10 },
          { text: "Slightly confident", score: 30 },
          { text: "Moderately confident", score: 50 },
          { text: "Very confident", score: 70 },
          { text: "Extremely confident", score: 90 }
        ]
      },
      {
        id: 4,
        question: "How comfortable are you with learning new programming languages?",
        skillArea: "Programming",
        options: [
          { text: "Very uncomfortable", score: 10 },
          { text: "Somewhat uncomfortable", score: 30 },
          { text: "Neutral", score: 50 },
          { text: "Somewhat comfortable", score: 70 },
          { text: "Very comfortable", score: 90 }
        ]
      }
    ],
    "Communication": [
      {
        id: 5,
        question: "How effective are you at presenting ideas to groups?",
        skillArea: "Communication",
        options: [
          { text: "Not effective", score: 10 },
          { text: "Slightly effective", score: 30 },
          { text: "Moderately effective", score: 50 },
          { text: "Very effective", score: 70 },
          { text: "Extremely effective", score: 90 }
        ]
      },
      {
        id: 6,
        question: "How comfortable are you with giving constructive feedback?",
        skillArea: "Communication",
        options: [
          { text: "Very uncomfortable", score: 10 },
          { text: "Somewhat uncomfortable", score: 30 },
          { text: "Neutral", score: 50 },
          { text: "Somewhat comfortable", score: 70 },
          { text: "Very comfortable", score: 90 }
        ]
      }
    ],
    "Data Analysis": [
      {
        id: 7,
        question: "How proficient are you with data visualization tools?",
        skillArea: "Data Analysis",
        options: [
          { text: "Not proficient", score: 10 },
          { text: "Slightly proficient", score: 30 },
          { text: "Moderately proficient", score: 50 },
          { text: "Very proficient", score: 70 },
          { text: "Extremely proficient", score: 90 }
        ]
      },
      {
        id: 8,
        question: "How comfortable are you with statistical analysis?",
        skillArea: "Data Analysis",
        options: [
          { text: "Very uncomfortable", score: 10 },
          { text: "Somewhat uncomfortable", score: 30 },
          { text: "Neutral", score: 50 },
          { text: "Somewhat comfortable", score: 70 },
          { text: "Very comfortable", score: 90 }
        ]
      }
    ]
  };
  
  // Filter questions based on requested skill areas
  return skillAreas.flatMap(area => 
    allQuestions[area] || []
  );
};
