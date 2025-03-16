
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, XCircle, CheckCircle, Clock } from "lucide-react";
import { JobMatchDetails } from "@/utils/career/types";
import { Vacancy } from "@/types/jobs";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface QuickApplicationCardProps {
  matchDetails: JobMatchDetails;
  vacancy: Vacancy;
  hasApplied: boolean;
  isSubmitting: boolean;
  onApply: () => void;
}

const QuickApplicationCard: React.FC<QuickApplicationCardProps> = ({
  matchDetails,
  vacancy,
  hasApplied,
  isSubmitting,
  onApply
}) => {
  const { t, language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-emirati-oasisGreen" />
          {t('job.quick.application')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`space-y-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <p className="text-sm">
            {t('job.profile.match')} <span className="font-medium">{matchDetails.matchPercentage}%</span> {t('job.matched')}.
          </p>
          
          {matchDetails.missingSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t('job.missing.skills')}</h4>
              <div className="flex flex-wrap gap-2">
                {matchDetails.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="h-3 w-3 mr-1 text-red-500" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button
            disabled={hasApplied || isSubmitting}
            onClick={onApply}
            className="w-full bg-emirati-oasisGreen text-white hover:bg-emirati-oasisGreen/90"
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
                {t('job.apply.profile')}
              </>
            )}
          </Button>
          
          <div className="text-xs text-muted-foreground">
            {t('job.profile.share')} {vacancy.company} {language === 'ar' ? 'كجزء من طلبك.' : 'as part of your application.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickApplicationCard;
