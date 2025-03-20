export type ValidationResult = {
  isValid: boolean
  message?: string
}

export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, message: 'URL is required' }
  }

  // Basic URL validation
  try {
    // Add protocol if missing
    const urlToCheck = url.match(/^https?:\/\//) ? url : `https://${url}`
    new URL(urlToCheck)
    return { isValid: true }
  } catch (e) {
    return { isValid: false, message: 'Please enter a valid URL' }
  }
}

export const validatePlatform = (platform: string): ValidationResult => {
  if (!platform) {
    return { isValid: false, message: 'Platform name is required' }
  }
  return { isValid: true }
}
