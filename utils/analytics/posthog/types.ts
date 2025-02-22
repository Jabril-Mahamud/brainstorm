import { User } from '@supabase/supabase-js'

export interface PostHogEvent {
  eventName: string;
  properties?: Record<string, any>;
}

export interface PostHogConfig {
  apiKey: string;
  apiHost: string;
}
