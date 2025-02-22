import { createClient } from '@/utils/supabase/server';
import { UsageLimits } from '../types';
import { calculateUsageLimits } from '../shared/usage';

export class PollyUsageTracker {
  static async checkUsageLimits(
    userId: string, 
    charactersToAdd: number
  ): Promise<UsageLimits> {
    const supabase = await createClient();
    return calculateUsageLimits(supabase, userId, charactersToAdd);
  }

  static async recordUsage(
    userId: string,
    characters: number,
    voiceId: string
  ): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('polly_usage')
      .insert({
        user_id: userId,
        characters_synthesized: characters,
        voice_id: voiceId,
        synthesis_date: new Date().toISOString()
      });

    if (error) throw error;
  }
}
