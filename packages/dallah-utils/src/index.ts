/**
 * Generates a random color.
 */
export function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

/**
 * Returns either black or white, depending on which has a better
 * contrast with the given color.
 *
 * It doesn't work well for all colors but it's sufficient for
 * our demo purposes.
 */
export function matchingTextColor(color: string) {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? '#000' : '#fff'
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

import { formatInTimeZone } from 'date-fns-tz'

// Map of common locations to their timezones
const locationToTimezone: Record<string, string> = {
  'New York': 'America/New_York',
  'Los Angeles': 'America/Los_Angeles',
  Chicago: 'America/Chicago',
  London: 'Europe/London',
  Paris: 'Europe/Paris',
  Berlin: 'Europe/Berlin',
  Cairo: 'Africa/Cairo',
  Dubai: 'Asia/Dubai',
  Mumbai: 'Asia/Kolkata',
  Tokyo: 'Asia/Tokyo',
  Sydney: 'Australia/Sydney',
  Toronto: 'America/Toronto',
  Singapore: 'Asia/Singapore',
  'Hong Kong': 'Asia/Hong_Kong',
  'United States': 'America/New_York', // Default for US
  UK: 'Europe/London',
  India: 'Asia/Kolkata',
  Australia: 'Australia/Sydney',
  Canada: 'America/Toronto',
  China: 'Asia/Shanghai',
  Japan: 'Asia/Tokyo',
  Germany: 'Europe/Berlin',
  France: 'Europe/Paris',
  Italy: 'Europe/Rome',
  Spain: 'Europe/Madrid',
  Brazil: 'America/Sao_Paulo',
  Russia: 'Europe/Moscow',
  'South Africa': 'Africa/Johannesburg',
  Mexico: 'America/Mexico_City',
  Egypt: 'Africa/Cairo',
  'Saudi Arabia': 'Asia/Riyadh',
  UAE: 'Asia/Dubai',
  Turkey: 'Europe/Istanbul',
  'South Korea': 'Asia/Seoul',
}

// Function to get local time for a location
/**
 * Returns the local time for a given location.
 * @param location The location to get the local time for.
 * @returns The local time for the given location.
 */
export const getLocalTimeForLocation = (location: string): string => {
  try {
    // Try to match the location with our mapping
    let timezone = 'UTC' // Default fallback

    // Check if the location exactly matches one of our keys
    if (locationToTimezone[location]) {
      timezone = locationToTimezone[location]
    } else {
      // Try to find a partial match
      const matchingKey = Object.keys(locationToTimezone).find((key) =>
        location.toLowerCase().includes(key.toLowerCase()),
      )

      if (matchingKey) {
        timezone = locationToTimezone[matchingKey]
      }
    }

    // Format the current time in the detected timezone
    return formatInTimeZone(new Date(), timezone, 'h:mm a')
  } catch (error) {
    console.error('Error getting local time:', error)
    return 'Local time unavailable'
  }
}
