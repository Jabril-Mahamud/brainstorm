export interface UserUsageStats {
  userId: string;
  email: string | null;
  username: string;
  daily: UsagePeriodStats;
  monthly: UsagePeriodStats;
  yearly: UsagePeriodStats;
}

export interface UsagePeriodStats {
  totalCharacters: number;
  limit: number;
  voiceDistribution: Record<string, number>;
  quotaRemaining: number;
  resetTime: number;
  lastUsedAt?: string;
}

export interface PollyUsageRecord {
  id?: number;
  user_id: string;
  characters_synthesized: number;
  voice_id: string;
  synthesis_date: string;
  content_hash?: string;
}

export interface PollyUsageData {
  user_id: string;
  characters_synthesized: number;
  voice_id: string;
  synthesis_date: string;
  user?: {
    email: string;
    id: string;
  } | null;
}

export interface UsageStats {
  totalCharacters: number;
  totalUsers: number;
  averagePerUser: number;
}
