import { VoiceId } from "@aws-sdk/client-polly";

export interface UsageLimits {
  allowed: boolean;
  currentUsage: number;
  remainingCharacters: number;
  monthlyLimit: number;
}

export interface PollyVoiceConfig {
  id: VoiceId;
  type: 'standard' | 'neural';
  isFree: boolean;
}
