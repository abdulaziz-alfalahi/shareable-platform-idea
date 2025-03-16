
import { ArrowUpCircleIcon } from "lucide-react";
import { Vacancy } from "@/types/jobs";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface VacancySkillsListProps {
  vacancy: Vacancy;
}

const VacancySkillsList = ({ vacancy }: VacancySkillsListProps) => {
  const { t, language } = useLanguage();

  return (
    <div className={`space-y-2 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div>
        <p className="text-sm font-medium">{t('job.required.skills')}:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {vacancy.requiredSkills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {vacancy.missingSkills.length > 0 && (
        <div>
          <p className="text-sm font-medium flex items-center">
            {t('job.skills.develop')}
            <ArrowUpCircleIcon size={14} className="ml-1 text-emirati-desertGold" />
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {vacancy.missingSkills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VacancySkillsList;
