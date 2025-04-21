export function translateDuration(duration: string, locale: string) {
  if (locale === 'ar') {
    return duration
      .replace('days', 'أيام')
      .replace('weeks', 'أسابيع')
      .replace('months', 'أشهر')
      .replace('years', 'سنوات')
  }
  return duration
}
