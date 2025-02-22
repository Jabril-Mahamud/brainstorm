import { DateFormatOptions } from './types';

export function formatDate(
  dateString: string,
  options: DateFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'en-US'
  }
): string {
  return new Date(dateString).toLocaleDateString(options.locale, options);
}

export function getResetTimeString(resetTime?: number): string {
  if (!resetTime) return 'unknown';
  
  const now = Date.now();
  const diff = resetTime - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} days, ${hours} hours`;
  }
  return `${hours} hours`;
}