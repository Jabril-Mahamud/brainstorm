import { FREE_VOICE_IDS, FreeVoiceId } from "../constants";

export function isFreeVoice(voiceId: string): voiceId is FreeVoiceId {
  return FREE_VOICE_IDS.includes(voiceId as FreeVoiceId);
}

export async function hasCustomCredentials(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_tts_settings')
    .select('api_key')
    .eq('id', userId)
    .single();

  return Boolean(data?.api_key);
}

export function filterVoicesByAccess<T extends { Id: string }>(
  voices: T[],
  hasCustomCreds: boolean
): T[] {
  if (hasCustomCreds) {
    return voices;
  }
  return voices.filter(voice => isFreeVoice(voice.Id));
}