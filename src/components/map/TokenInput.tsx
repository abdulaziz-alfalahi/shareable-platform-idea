
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
  // Updated Mapbox public token - this is a valid public token
  const defaultToken = 'pk.eyJ1IjoiYWhtYWRmYXdhZCIsImEiOiJjbG95MHFlMXAwYnJsMmtvMDZ3bnZ2Z2phIn0.qsp0opK6G6EiJ1sMhbLaZQ';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const validateAndSubmitToken = (token: string) => {
    setIsSubmitting(true);
    setValidationError(null);
    
    // Basic token format validation
    if (!token || !token.startsWith('pk.')) {
      toast({
        title: "Invalid Token Format",
        description: "Please enter a valid public Mapbox token (starts with 'pk.')",
        variant: "destructive"
      });
      setValidationError("Token must start with 'pk.'");
      setIsSubmitting(false);
      return false;
    }
    
    // Updated validation approach - use a simple static resources request
    // that's less likely to be rate-limited or have permission issues
    fetch(`https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${token}`)
      .then(response => {
        console.log(`Mapbox API response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Token validation failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setMapboxToken(token);
        setTokenSubmitted(true);
        setValidationError(null);
        toast({
          title: "Token Accepted",
          description: "Your Mapbox token has been validated and applied successfully.",
        });
      })
      .catch(error => {
        console.error('Token validation error:', error);
        
        let errorMessage = "The token could not be validated with Mapbox.";
        
        // More specific error messages based on common issues
        if (error.message.includes('401')) {
          errorMessage = "Unauthorized: The token may not have the required permissions. Make sure it's a public token.";
        } else if (error.message.includes('403')) {
          errorMessage = "Forbidden: The token may not have the required permissions or domain restrictions.";
        } else if (error.message.includes('429')) {
          errorMessage = "Rate limit exceeded: Too many requests with this token.";
        }
        
        setValidationError(errorMessage);
        
        toast({
          title: "Mapbox Token Error",
          description: errorMessage + " Please check your token and try again.",
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
    // Try the built-in default token
    validateAndSubmitToken(defaultToken);
  };

  const handleSkipValidation = () => {
    // For users who are certain their token is valid but are having validation issues
    if (mapboxToken && mapboxToken.startsWith('pk.')) {
      setMapboxToken(mapboxToken);
      setTokenSubmitted(true);
      toast({
        title: "Token Accepted",
        description: "Using your token without validation. If map doesn't load, please try again.",
      });
    } else {
      toast({
        title: "Invalid Token Format",
        description: "Even when skipping validation, token must start with 'pk.'",
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

        {validationError && (
          <Alert variant="destructive" className="bg-red-50 border-red-400">
            <AlertTitle className="text-red-700">Token Validation Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {validationError}
              <div className="mt-2 text-sm">
                <strong>Common fixes:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Ensure it's a <strong>public</strong> token (starts with pk.)</li>
                  <li>Check URL restrictions in your Mapbox account settings</li>
                  <li>Try generating a new token with appropriate scopes</li>
                  <li>Make sure your Mapbox account is active</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input 
              placeholder="Enter your Mapbox token (pk.xxx...)" 
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className={`flex-1 ${validationError ? 'border-red-400' : ''}`}
            />
            <Button 
              onClick={handleTokenSubmit} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validating..." : "Submit"}
            </Button>
          </div>
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={handleSkipValidation}
              className="text-orange-600 hover:text-orange-700"
              disabled={isSubmitting}
            >
              Skip Validation
            </Button>
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
