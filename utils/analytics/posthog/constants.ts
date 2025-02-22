export const POSTHOG_CONFIG = {
    apiKey: process.env.POSTHOG_KEY as string,
    apiHost: process.env.POSTHOG_HOST || 'https://app.posthog.com',
    personProfiles: 'identified_only' as const
  } as const;
  