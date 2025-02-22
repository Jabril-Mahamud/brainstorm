import { createClient } from '@/utils/supabase/client';
import { UsageLimits } from '../types';
import { calculateUsageLimits } from '../shared/usage';

export class PollyUsageClient {
  static async checkUsageLimits(
    userId: string, 
    charactersToAdd: number = 0
  ): Promise<UsageLimits> {
    const supabase = createClient();
    return calculateUsageLimits(supabase, userId, charactersToAdd);
  }
}
