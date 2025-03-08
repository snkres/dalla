import type { PlatformInfo, SocialLink } from '@lib/types/profile'
import { SOCIAL_PLATFORMS } from '../../app/(authed)/professionals/[username]/components/platforms-data'

/**
 * Detects the platform from a URL using multiple methods
 */
export function detectPlatform(url: string): PlatformInfo {
  if (!url) {
    return getDefaultPlatform()
  }

  // Normalize the URL for consistent matching
  const normalizedUrl = normalizeUrl(url)

  // Try to match using regex patterns first (most accurate)
  const regexMatch = SOCIAL_PLATFORMS.find(
    (platform) => platform.regex && platform.regex.test(normalizedUrl),
  )

  if (regexMatch) {
    return regexMatch
  }

  // Fall back to domain matching
  const domainMatch = SOCIAL_PLATFORMS.find((platform) => {
    if (Array.isArray(platform.domain)) {
      return platform.domain.some(
        (domain) => domain && normalizedUrl.includes(domain),
      )
    }
    return platform.domain && normalizedUrl.includes(platform.domain)
  })

  if (domainMatch) {
    return domainMatch
  }

  // Check for common TLDs to identify if it's likely a personal website/portfolio
  if (/\.(com|io|dev|me|xyz|co|net|org|tech)$/i.test(normalizedUrl)) {
    return (
      SOCIAL_PLATFORMS.find((p) => p.name === 'Portfolio') ||
      getDefaultPlatform()
    )
  }

  return getDefaultPlatform()
}

/**
 * Normalizes a URL by ensuring it has a protocol and removing www.
 */
function normalizeUrl(url: string): string {
  let normalizedUrl = url.toLowerCase()

  // Add protocol if missing
  if (
    !normalizedUrl.startsWith('http://') &&
    !normalizedUrl.startsWith('https://')
  ) {
    normalizedUrl = `https://${normalizedUrl}`
  }

  try {
    const urlObj = new URL(normalizedUrl)
    // Remove www. prefix for consistent matching
    return urlObj.hostname.replace(/^www\./, '') + urlObj.pathname
  } catch (e) {
    // If URL parsing fails, just return the original
    return normalizedUrl
  }
}

/**
 * Returns the default platform info for unknown platforms
 */
function getDefaultPlatform(): PlatformInfo {
  return {
    name: 'Website',
    icon: 'Globe',
    domain: '',
    color: '',
  }
}

/**
 * Enhances a social link with platform information
 */
export function enhanceSocialLink(
  social: SocialLink,
): SocialLink & { platformInfo: PlatformInfo } {
  return {
    ...social,
    platformInfo: detectPlatform(social.url),
  }
}
