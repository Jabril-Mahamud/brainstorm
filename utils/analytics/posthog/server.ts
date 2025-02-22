import { User } from '@supabase/supabase-js'
import { PostHogConfig, PostHogEvent } from './types'
import { POSTHOG_CONFIG } from './constants'

export async function captureServerEvent(
  eventName: string,
  user: User | null,
  properties?: Record<string, any>
) {
  if (!POSTHOG_CONFIG.apiKey || !user?.id) return;

  try {
    const response = await fetch(`${POSTHOG_CONFIG.apiHost}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${POSTHOG_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        api_key: POSTHOG_CONFIG.apiKey,
        distinct_id: user.id,
        event: eventName,
        properties: {
          ...properties,
          source: 'server'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`PostHog API error: ${response.status}`);
    }
  } catch (error) {
    console.error('PostHog tracking error:', error);
  }
}