import { createClient } from '@/utils/supabase/client';
import { isFreeVoice, hasCustomCredentials as checkCustomCredentials } from '../shared/voices';

export async function canUseVoice(userId: string, voiceId: string): Promise<boolean> {
  if (isFreeVoice(voiceId)) {
    return true;
  }
  
  const supabase = createClient();
  return await checkCustomCredentials(supabase, userId);
}