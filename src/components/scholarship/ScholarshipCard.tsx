
import React from 'react';
import { format } from 'date-fns';
import { Award, CalendarDays, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Scholarship } from '@/types/scholarship';
import { Link } from 'react-router-dom';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  matchScore?: number;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, matchScore }) => {
  const formattedDeadline = scholarship.application_deadline ? 
    format(new Date(scholarship.application_deadline), 'MMM dd, yyyy') : 
    'No deadline';
  
  const daysUntilDeadline = scholarship.application_deadline ? 
    Math.ceil((new Date(scholarship.application_deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
    null;
  
  const isExpiring = daysUntilDeadline !== null && daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  const isExpired = daysUntilDeadline !== null && daysUntilDeadline <= 0;

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {matchScore && (
        <div className="bg-emirati-gold/90 text-white px-4 py-1 text-sm font-medium">
          Match Score: {matchScore}%
        </div>
      )}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="line-clamp-2 text-lg font-semibold">{scholarship.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Award className="h-4 w-4 mr-2 text-emirati-desertRed" />
            <span>Award: {typeof scholarship.award_amount === 'number' ? 
              scholarship.award_amount.toLocaleString('en-AE', { style: 'currency', currency: 'AED' }) : 
              scholarship.award_amount}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-emirati-desertRed" />
            <span className={`${isExpiring ? 'text-amber-600 font-medium' : ''} ${isExpired ? 'text-red-600 font-medium' : ''}`}>
              Deadline: {formattedDeadline}
              {isExpiring && ` (${daysUntilDeadline} days left)`}
              {isExpired && ' (Expired)'}
            </span>
          </div>
          
          {scholarship.sponsor && (
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-emirati-desertRed" />
              <span>Sponsor: {scholarship.sponsor}</span>
            </div>
          )}
          
          {scholarship.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-3">
              {scholarship.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="ml-auto text-emirati-desertRed" 
          asChild
          disabled={isExpired}
        >
          <Link to={`/scholarships/${scholarship.id}`}>
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipCard;
