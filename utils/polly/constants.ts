export const MONTHLY_CHARACTER_LIMIT = 10000;

export const FREE_VOICE_IDS = [
  'Joanna',
  'Matthew',
  'Salli',
  'Justin',
  'Joey',
  'Kendra',
  'Kimberly',
  'Kevin'
] as const;

export type FreeVoiceId = typeof FREE_VOICE_IDS[number];