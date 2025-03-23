
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UaeCard, UaeButton } from '@/components/ui/uae';
import { AlertCircle, CheckCircle, Copy, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/toast';
import { useThemeContext } from '@/components/home/theme/ThemeContext';

interface Account {
  role: string;
  email: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
}

const TestAccountsManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { theme } = useThemeContext();

  const createTestAccounts = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-test-accounts');
      
      if (error) {
        console.error('Error creating test accounts:', error);
        toast({
          title: 'Error',
          description: 'Failed to create test accounts. Please try again.',
          type: 'error',
        });
        return;
      }
      
      setAccounts(data.results);
      toast({
        title: 'Success',
        description: 'Test accounts have been created successfully.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error invoking function:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Text copied to clipboard',
      type: 'success',
    });
  };

  const formatRoleName = (role: string) => {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <UaeCard className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Test Accounts Manager</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Create test accounts for different personas to test the platform. All accounts use the password "journey123!".
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <UaeButton 
            variant={theme === 'premium' ? 'gold' : 'desert'} 
            onClick={createTestAccounts}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Creating Accounts...
              </>
            ) : (
              'Create Test Accounts'
            )}
          </UaeButton>
        </div>

        {accounts.length > 0 && (
          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b grid grid-cols-12 gap-4 font-medium">
              <div className="col-span-5 sm:col-span-3">Role</div>
              <div className="col-span-5 sm:col-span-4">Email</div>
              <div className="col-span-2 sm:col-span-1 text-center">Status</div>
              <div className="hidden sm:block sm:col-span-3">Message</div>
              <div className="hidden sm:block sm:col-span-1 text-right">Copy</div>
            </div>
            <div className="divide-y">
              {accounts.map((account, index) => (
                <div key={index} className="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/50">
                  <div className="col-span-5 sm:col-span-3 font-medium">
                    {formatRoleName(account.role)}
                  </div>
                  <div className="col-span-5 sm:col-span-4 font-mono text-sm truncate">
                    {account.email}
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    {getStatusIcon(account.status)}
                  </div>
                  <div className="hidden sm:block sm:col-span-3 text-sm text-muted-foreground truncate">
                    {account.message}
                  </div>
                  <div className="hidden sm:flex sm:col-span-1 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(account.email)}
                      title="Copy email"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {accounts.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Login Information</h3>
            <p className="text-sm mb-2">
              All accounts use the password: <code className="bg-background p-1 rounded font-mono">journey123!</code>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1"
              onClick={() => copyToClipboard("journey123!")}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy Password
            </Button>
          </div>
        )}
      </CardContent>
    </UaeCard>
  );
};

export default TestAccountsManager;
