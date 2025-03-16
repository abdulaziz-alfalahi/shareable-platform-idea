
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Building,
  CheckCircle,
  Clock,
  ExternalLink,
  Share2
} from "lucide-react";
import { Vacancy } from "@/types/jobs";
import { JobMatchDetails } from "@/utils/career/types";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface JobOverviewTabProps {
  vacancy: Vacancy;
  matchDetails: JobMatchDetails;
  hasApplied: boolean;
  isSubmitting: boolean;
  onApply: () => void;
}

const JobOverviewTab: React.FC<JobOverviewTabProps> = ({ 
  vacancy, 
  matchDetails, 
  hasApplied, 
  isSubmitting, 
  onApply 
}) => {
  const { t, language } = useLanguage();

  return (
    <div className={`space-y-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div>
        <h3 className="font-medium mb-2">{t('job.description')}</h3>
        <p className="text-sm text-muted-foreground">
          This is an exciting opportunity to join {vacancy.company} as a {vacancy.title}. 
          In this role, you will be responsible for various tasks and projects in a dynamic environment.
          You will collaborate with other team members to achieve company goals and drive innovation.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{t('job.posted.date')}</h3>
          <p className="text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            {vacancy.postedDate}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{t('job.salary.range')}</h3>
          <p className="text-sm flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            {vacancy.salary}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{t('job.location')}</h3>
          <p className="text-sm flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            {vacancy.location}
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{t('job.company')}</h3>
          <p className="text-sm flex items-center">
            <Building className="h-4 w-4 mr-1 text-muted-foreground" />
            {vacancy.company}
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">{t('job.required.skills')}</h3>
        <div className="flex flex-wrap gap-2">
          {vacancy.requiredSkills.map((skill, index) => (
            <Badge key={index} variant="outline" 
              className={matchDetails.matchedSkills.includes(skill) ? 
                "bg-green-50 text-green-700 border-green-200" : 
                "bg-slate-50 text-slate-700 border-slate-200"
              }
            >
              {matchDetails.matchedSkills.includes(skill) && (
                <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
              )}
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button 
          disabled={hasApplied || isSubmitting}
          onClick={onApply}
          className="flex-1 bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90"
        >
          {isSubmitting ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              {t('job.applying')}
            </>
          ) : hasApplied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              {t('job.applied')}
            </>
          ) : (
            <>
              <Briefcase className="h-4 w-4 mr-2" />
              {t('job.apply')}
            </>
          )}
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Share2 className="h-4 w-4 mr-2" />
          {t('job.share')}
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <ExternalLink className="h-4 w-4 mr-2" />
          {t('job.visit.website')}
        </Button>
      </div>
    </div>
  );
};

export default JobOverviewTab;
