
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabNavigation from "./TabNavigation";
import PersonaTab from "./PersonaTab";
import SearchInput from "./SearchInput";
import { journeyData } from "./journeyData";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface MindMapContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MindMapContent: React.FC<MindMapContentProps> = ({ activeTab, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();

  // Filter journey data based on search query
  const filteredJourneyData = useMemo(() => {
    if (!searchQuery.trim()) return journeyData;

    const lowerQuery = searchQuery.toLowerCase().trim();
    
    return journeyData.map(persona => ({
      ...persona,
      steps: persona.steps.filter(step => 
        step.title.toLowerCase().includes(lowerQuery) || 
        step.items.some(item => item.toLowerCase().includes(lowerQuery))
      )
    })).filter(persona => persona.steps.length > 0);
  }, [searchQuery, journeyData]);

  // Display all personas if search is active, otherwise show just the active tab
  const displayAllPersonas = searchQuery.trim() !== "";

  return (
    <div className={`max-w-5xl mx-auto ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-emirati-deepBlue mb-6">{t('mindmap.title')}</h1>
      <p className="text-gray-600 mb-8">
        {t('mindmap.description')}
      </p>

      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabNavigation activeTab={activeTab} />
        
        {(displayAllPersonas ? filteredJourneyData : journeyData.filter(p => p.id === activeTab)).map(persona => (
          <TabsContent 
            key={persona.id} 
            value={displayAllPersonas ? "search-results" : persona.id} 
            className="mt-4" 
            forceMount={displayAllPersonas ? true : undefined}
          >
            {displayAllPersonas && (
              <div className="mb-8 pb-4 border-b border-emirati-sandBeige">
                <h3 className="text-xl font-medium text-emirati-deepBlue mb-2">
                  {language === 'ar' ? 'نتائج البحث عن:' : 'Search results for:'} "{searchQuery}"
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'عرض الخطوات المطابقة من' : 'Showing matching steps from'} {persona.title}
                </p>
              </div>
            )}
            <PersonaTab id={persona.id} filtered={displayAllPersonas} />
          </TabsContent>
        ))}

        {displayAllPersonas && filteredJourneyData.length === 0 && (
          <div className="mt-8 text-center py-8 border border-dashed border-emirati-sandBeige rounded-lg">
            <p className="text-lg text-gray-600">
              {language === 'ar' ? 'لا توجد نتائج لـ' : 'No results found for'} "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'ar' ? 'جرب مصطلح بحث مختلف أو تصفح حسب نوع المستخدم' : 'Try a different search term or browse by persona'}
            </p>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default MindMapContent;
