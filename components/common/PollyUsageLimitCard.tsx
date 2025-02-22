'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createClient } from '@/utils/supabase/client';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PollyUsageClient, UsageLimits } from '@/utils/polly-usage-client';

export const PollyUsageLimitCard = () => {
  const [usageStats, setUsageStats] = useState<UsageLimits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCustomCredentials, setHasCustomCredentials] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUsageData = async () => {
      const supabase = createClient();
      
      try {
        setIsLoading(true);
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        if (!user) throw new Error('No authenticated user');
        
        const { data: settingsData, error: settingsError } = await supabase
          .from('user_tts_settings')
          .select('api_key')
          .single();
          
        if (settingsError && settingsError.code !== 'PGRST116') {
          throw settingsError;
        }

        if (!settingsData?.api_key) {
          const stats = await PollyUsageClient.checkUsageLimits(user.id);
          setUsageStats(stats);
        }
        
        setHasCustomCredentials(!!settingsData?.api_key);
        
      } catch (err) {
        console.error('Error fetching usage data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsageData();
  }, []);
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load usage data: {error}</AlertDescription>
      </Alert>
    );
  }
  
  if (hasCustomCredentials) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Polly Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Using custom AWS credentials - no character limit applies
            </AlertDescription>
          </Alert>
          {usageStats && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Characters synthesized this month: {usageStats.currentUsage.toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!usageStats) {
    return (
      <Alert>
        <AlertDescription>No usage data available</AlertDescription>
      </Alert>
    );
  }
  
  const usagePercentage = (usageStats.currentUsage / usageStats.monthlyLimit) * 100;
  const isApproachingLimit = usagePercentage >= 80;
  const isAtLimit = !usageStats.allowed;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Polly Usage Limit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress 
            value={usagePercentage} 
            className={isAtLimit ? "bg-red-200" : isApproachingLimit ? "bg-yellow-200" : ""}
          />
          
          <div className="flex justify-between text-sm">
            <span>
              Used: {usageStats.currentUsage.toLocaleString()} characters
            </span>
            <span className="text-muted-foreground">
              Limit: {usageStats.monthlyLimit.toLocaleString()} characters
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {usageStats.remainingCharacters.toLocaleString()} characters remaining this month
          </p>

          {isAtLimit && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Usage Limit Reached</AlertTitle>
              <AlertDescription>
                You have reached your monthly character limit. To continue using the service, please add custom AWS credentials or wait until next month's reset.
              </AlertDescription>
            </Alert>
          )}
          
          {isApproachingLimit && !isAtLimit && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Approaching Limit</AlertTitle>
              <AlertDescription>
                You are approaching your monthly character limit. Consider adding custom AWS credentials to avoid service interruption.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};