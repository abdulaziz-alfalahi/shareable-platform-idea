
import React from 'react';
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
  // Verified working Mapbox demo token
  const defaultToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
  
  const handleTokenSubmit = () => {
    if (!mapboxToken) {
      toast({
        title: "Token Required",
        description: "Please enter your Mapbox token",
        variant: "destructive"
      });
      return;
    }

    // Basic token format validation
    if (!mapboxToken.startsWith('pk.')) {
      toast({
        title: "Invalid Token",
        description: "Please enter a valid public Mapbox token (starts with 'pk.')",
        variant: "destructive"
      });
      return;
    }

    setTokenSubmitted(true);
  };

  const useDefaultToken = () => {
    try {
      // Verify token format before submitting
      if (!defaultToken.startsWith('pk.')) {
        throw new Error('Invalid token format');
      }
      
      setMapboxToken(defaultToken);
      setTokenSubmitted(true);
      
      // Show successful toast
      toast({
        title: "Demo Token Applied",
        description: "Using Mapbox demo token with limited functionality",
      });
    } catch (error) {
      console.error('Error applying demo token:', error);
      toast({
        title: "Demo Token Error",
        description: "Could not apply demo token. Please try entering your own token.",
        variant: "destructive"
      });
    }
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
            <Button onClick={handleTokenSubmit}>Submit</Button>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={useDefaultToken}
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
