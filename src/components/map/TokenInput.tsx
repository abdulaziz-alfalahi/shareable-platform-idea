
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TokenInputProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  setTokenSubmitted: (submitted: boolean) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  mapboxToken,
  setMapboxToken,
  setTokenSubmitted
}) => {
  // Verified Mapbox public token - this is a public demo token from Mapbox docs
  const defaultToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateAndSubmitToken = (token: string) => {
    setIsSubmitting(true);
    
    // Basic token format validation
    if (!token || !token.startsWith('pk.')) {
      toast({
        title: "Invalid Token Format",
        description: "Please enter a valid public Mapbox token (starts with 'pk.')",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return false;
    }
    
    // Test if token works by making a simple request to Mapbox
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/dubai.json?access_token=${token}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Token validation failed');
        }
        return response.json();
      })
      .then(() => {
        setMapboxToken(token);
        setTokenSubmitted(true);
        toast({
          title: "Token Accepted",
          description: "Your Mapbox token has been validated and applied successfully.",
        });
      })
      .catch(error => {
        console.error('Token validation error:', error);
        toast({
          title: "Invalid Token",
          description: "The token could not be validated with Mapbox. Please check it and try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleTokenSubmit = () => {
    validateAndSubmitToken(mapboxToken);
  };

  const useDefaultToken = () => {
    validateAndSubmitToken(defaultToken);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapbox Integration</CardTitle>
        <CardDescription>
          To use the map feature, please enter your Mapbox token or use our demo token.
          For full functionality, you can get a free token at <a href="https://www.mapbox.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>How to get your Mapbox token</AlertTitle>
          <AlertDescription>
            1. Sign up or log in to <a href="https://www.mapbox.com/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Mapbox</a><br />
            2. Go to your Account → Tokens<br />
            3. Create a new token or use your default public token<br />
            4. Copy and paste the token here (starts with 'pk.')
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input 
              placeholder="Enter your Mapbox token (pk.xxx...)" 
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleTokenSubmit} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validating..." : "Submit"}
            </Button>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={useDefaultToken}
              disabled={isSubmitting}
              className="text-emirati-oasisGreen"
            >
              Use Demo Token
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenInput;
