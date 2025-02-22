import { createClient } from '@/utils/supabase/server';
import { isFreeVoice, hasCustomCredentials as checkCustomCredentials } from '../shared/voices';

export async function canUseVoiceServer(userId: string, voiceId: string): Promise<boolean> {
  if (isFreeVoice(voiceId)) {
    return true;
  }
  
  const supabase = await createClient();
  return await checkCustomCredentials(supabase, userId);
}