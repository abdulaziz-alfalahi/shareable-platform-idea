
import React, { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer, Award } from "lucide-react";
import { useToast } from "@/hooks/toast";
import { UaeGeometricPattern } from "@/components/ui/uae";

interface Certificate {
  id: string;
  programName: string;
  centerName: string;
  studentName: string;
  completionDate: string;
  certificateNumber: string;
}

interface CertificateGeneratorProps {
  certificate?: Certificate;
}

// Sample certificate data
const sampleCertificate: Certificate = {
  id: "cert-123",
  programName: "Advanced Digital Marketing",
  centerName: "Emirates Skills Hub",
  studentName: "Abdulaziz Alfalahi",
  completionDate: "October 15, 2023",
  certificateNumber: "ESH-DM-2023-0042"
};

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ 
  certificate = sampleCertificate 
}) => {
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully."
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard."
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Prepared",
      description: "Your certificate is ready to print."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Training Certificate
        </CardTitle>
        <CardDescription>
          Your official certificate of completion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div 
            ref={certificateRef}
            className="w-full max-w-2xl border-8 border-double border-emirati-desertGold/30 p-8 mb-6 bg-white relative overflow-hidden"
          >
            {/* Cultural Decorative Elements */}
            <UaeGeometricPattern type="arabesque" position="corner" size="lg" />
            <UaeGeometricPattern type="arabesque" position="corner" size="lg" className="top-auto bottom-0 left-auto right-0 rotate-180" />
            
            {/* Certificate Header */}
            <div className="text-center mb-6 relative">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-emirati-oasisGreen/10 flex items-center justify-center">
                  <Award className="h-12 w-12 text-emirati-oasisGreen" />
                </div>
              </div>
              <h2 className="text-2xl font-serif text-emirati-deepBrown">Certificate of Completion</h2>
              <h3 className="text-lg font-serif text-emirati-camelBrown mt-1">شهادة إتمام</h3>
              <div className="h-1 w-24 bg-emirati-desertGold mx-auto my-3"></div>
            </div>
            
            {/* Certificate Body */}
            <div className="text-center mb-8 relative">
              <p className="text-gray-600 mb-4">This is to certify that</p>
              <h3 className="text-xl font-bold text-emirati-oasisGreen mb-4 font-serif">
                {certificate.studentName}
              </h3>
              <p className="text-gray-600 mb-4">has successfully completed the program</p>
              <h4 className="text-lg font-bold text-emirati-deepBrown mb-2">
                {certificate.programName}
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                provided by {certificate.centerName}
              </p>
              <p className="text-gray-600">
                Completed on <span className="font-medium">{certificate.completionDate}</span>
              </p>
            </div>
            
            {/* Certificate Footer with UAE-inspired design */}
            <div className="pt-6 mt-8 border-t border-emirati-desertGold/30 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <div className="h-2 w-16 bg-emirati-desertGold/20 rounded-full"></div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">Certificate ID:</p>
                  <p className="text-sm">{certificate.certificateNumber}</p>
                </div>
                <div className="text-center">
                  <div className="h-px w-36 bg-emirati-deepBrown mb-1"></div>
                  <p className="text-sm">Authorized Signature</p>
                </div>
              </div>
              
              {/* UAE Falcon Seal (stylized using CSS) */}
              <div className="absolute bottom-0 right-12 w-16 h-16 opacity-10">
                <div className="w-full h-full rounded-full border-2 border-emirati-desertGold flex items-center justify-center">
                  <div className="w-10 h-10 transform rotate-45 bg-emirati-desertGold/30"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="flex gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="flex gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateGenerator;
