export interface RelativeTimeTranslations {
  justNow: string
  minuteAgo: string
  minutesAgo: string // Should contain {count}
  hourAgo: string
  hoursAgo: string // Should contain {count}
  dayAgo: string
  daysAgo: string // Should contain {count}
}

export interface GetRelativeTimeOptions {
  locale: string
  translations: RelativeTimeTranslations
}

export function getRelativeTime(
  timestamp: string,
  options?: GetRelativeTimeOptions,
): string {
  const { locale, translations } = options ?? {
    locale: 'en',
    translations: {
      justNow: 'now',
      minuteAgo: '1 minute ago',
      minutesAgo: '{count} minutes ago',
      hourAgo: '1 hour ago',
      hoursAgo: '{count} hours ago',
      dayAgo: '1 day ago',
      daysAgo: '{count} days ago',
    },
  }
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()

  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) {
    return translations.justNow
  }

  if (diffSec < 3600) {
    const minutes = Math.floor(diffSec / 60)
    return minutes === 1
      ? translations.minuteAgo
      : translations.minutesAgo.replace('{count}', String(minutes))
  }

  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600)
    return hours === 1
      ? translations.hourAgo
      : translations.hoursAgo.replace('{count}', String(hours))
  }

  if (diffSec < 604800) {
    const days = Math.floor(diffSec / 86400)
    return days === 1
      ? translations.dayAgo
      : translations.daysAgo.replace('{count}', String(days))
  }

  // Fallback to absolute date format, using locale
  const dateLocale = locale === 'ar' ? 'ar-SA' : 'en-GB'
  return past.toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
