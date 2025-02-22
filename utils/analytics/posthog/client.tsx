'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ReactNode } from 'react'
import { POSTHOG_CONFIG } from './constants'

if (typeof window !== 'undefined') {
  posthog.init(POSTHOG_CONFIG.apiKey, {
    api_host: POSTHOG_CONFIG.apiHost,
    person_profiles: POSTHOG_CONFIG.personProfiles,
  })
}

interface PostHogProviderProps {
  children: ReactNode
}

export function PostHogClientProvider({ children }: PostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}