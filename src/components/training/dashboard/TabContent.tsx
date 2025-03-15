
import React from "react";
import ProgramsTab from "./tabs/ProgramsTab";
import StudentsTab from "./tabs/StudentsTab";
import AssessmentsTab from "./tabs/AssessmentsTab";
import MetricsTab from "./tabs/MetricsTab";
import PartnersTab from "./tabs/PartnersTab";

interface TabContentProps {
  activeTab: string;
  trainingData: any;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, trainingData }) => {
  switch (activeTab) {
    case "programs":
      return <ProgramsTab trainingData={trainingData} />;
    case "students":
      return <StudentsTab />;
    case "assessments":
      return <AssessmentsTab />;
    case "metrics":
      return <MetricsTab />;
    case "partners":
      return <PartnersTab />;
    default:
      return null;
  }
};

export default TabContent;
