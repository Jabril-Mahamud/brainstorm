import { createClient as createClientServer } from '@/utils/supabase/server';
import { createClient as createClientBrowser } from '@/utils/supabase/client';
import { UsageLimits } from '../types';
import { MONTHLY_CHARACTER_LIMIT } from '../constants';

export async function calculateUsageLimits(
  supabase: any,
  userId: string, 
  charactersToAdd: number = 0
): Promise<UsageLimits> {
  const startOfMonth = new Date(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    1
  ).toISOString();

  const { data: usage, error } = await supabase
    .from('polly_usage')
    .select('characters_synthesized')
    .eq('user_id', userId)
    .gte('synthesis_date', startOfMonth);

  if (error) {
    throw new Error(`Failed to fetch usage data: ${error.message}`);
  }

  const currentUsage = usage?.reduce(
    (sum: number, row: any) => sum + (row.characters_synthesized || 0),
    0
  ) || 0;

  const remainingCharacters = Math.max(0, MONTHLY_CHARACTER_LIMIT - currentUsage);

  return {
    allowed: remainingCharacters >= charactersToAdd,
    currentUsage,
    remainingCharacters,
    monthlyLimit: MONTHLY_CHARACTER_LIMIT
  };
}
