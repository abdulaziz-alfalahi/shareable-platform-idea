
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Student } from "@/types/student";
import { useToast } from "@/hooks/toast";

import PassportHeader from "./PassportHeader";
import PassportNavigation from "./layout/PassportNavigation";
import PassportTabsContent from "./layout/PassportTabsContent";

interface CareerPassportProps {
  student: Student;
}

const CareerPassport: React.FC<CareerPassportProps> = ({ student }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("passport");

  return (
    <div className="container mx-auto py-8 px-4">
      <PassportHeader />

      <Tabs
        defaultValue="passport"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <PassportNavigation />
        <PassportTabsContent activeTab={activeTab} student={student} />
      </Tabs>
    </div>
  );
};

export default CareerPassport;
