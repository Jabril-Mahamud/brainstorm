// types/tts.ts
export interface TTSSettings {
  id: string;
  tts_service: "Amazon" | "ElevenLabs";
  api_key?: string;
  aws_polly_voice?: string;
  elevenlabs_voice_id?: string;
  elevenlabs_stability?: number;
  elevenlabs_similarity_boost?: number;
  custom_voice_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ConvertButtonProps {
  text: string;
  fileName: string;
  voiceId?: string;
  onProgress: (progress: number) => void;
  onComplete: () => void;
  onError: (error: string) => void;
  disabled?: boolean;
  iconOnly?: boolean;
}

export interface Voice {
  voice_id: string;
  name: string;
  preview_url?: string;
  category?: string;
  id?: string;
  gender?: string;
  isFree?: boolean;
  isNeural?: boolean;
}