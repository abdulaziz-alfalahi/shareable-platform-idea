
import React, { useState } from "react";
import { 
  Upload, 
  File, 
  Plus, 
  Check, 
  List,
  Search,
  Download,
  User,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/toast";
import DataEntryFileUpload from "@/components/data-entry/DataEntryFileUpload";
import ManualEntryForm from "@/components/data-entry/ManualEntryForm";
import StudentRecordsList from "@/components/data-entry/StudentRecordsList";

const DataEntryPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emirati-deepBlue mb-2">Student Data Entry</h1>
        <p className="text-gray-600">
          Upload student records or manually enter student grades and reports. This data will be integrated 
          into the platform until direct connections with educational institutions are established.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Batch Upload
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Manual Entry
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <List className="h-4 w-4" /> Manage Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <DataEntryFileUpload />
        </TabsContent>

        <TabsContent value="manual">
          <ManualEntryForm />
        </TabsContent>

        <TabsContent value="manage">
          <StudentRecordsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataEntryPage;
