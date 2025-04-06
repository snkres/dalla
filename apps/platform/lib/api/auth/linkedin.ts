export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  profilePicture: string
  email: string
  headline: string
  summary: string
  location: {
    country: string
    city: string
  }
  positions: {
    companyName: string
    title: string
    startDate: {
      month: number
      year: number
    }
    endDate?: {
      month: number
      year: number
    }
    description: string
    location: string
  }[]
  educations: {
    schoolName: string
    degreeName: string
    fieldOfStudy: string
    startDate: {
      month: number
      year: number
    }
    endDate?: {
      month: number
      year: number
    }
    description: string
  }[]
  skills: string[]
}

// LinkedIn OAuth Configuration
const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ''
const LINKEDIN_REDIRECT_URI = 'http://localhost:3000/login'
// ? `${window.location.origin}/api/auth/linkedin/callback`
// :

const LINKEDIN_SCOPE = 'openid profile email'

export function initLinkedInAuth() {
  if (typeof window === 'undefined') {
    return Promise.reject(
      new Error('LinkedIn auth can only be used in browser'),
    )
  }

  // Generate a random state parameter to prevent CSRF attack
  const state = Math.random().toString(36).substring(2)

  const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(LINKEDIN_SCOPE)}`

  // OAuth dialog popup window
  const width = 600
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const popup = window.open(
    oauthUrl,
    'LinkedIn Authorization',
    `width=${width},height=${height},left=${left},top=${top}`,
  )

  return new Promise<LinkedInProfile>((resolve, reject) => {
    // Listen for messages from the popup
    const messageListener = (event: MessageEvent) => {
      // Verify origin of message for security
      if (event.origin !== window.location.origin) return

      if (event.data.type === 'linkedin_auth_success') {
        window.removeEventListener('message', messageListener)
        if (popup) popup.close()
        resolve(event.data.profile)
      }

      if (event.data.type === 'linkedin_auth_error') {
        window.removeEventListener('message', messageListener)
        if (popup) popup.close()
        reject(new Error(event.data.error || 'LinkedIn authentication failed'))
      }
    }

    window.addEventListener('message', messageListener)

    // Fallback for when the popup is closed or authentication times out
    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopupClosed)
        window.removeEventListener('message', messageListener)
        reject(new Error('Authentication was cancelled'))
      }
    }, 1000)

    // Set a timeout in case authentication takes too long
    setTimeout(() => {
      clearInterval(checkPopupClosed)
      window.removeEventListener('message', messageListener)
      if (popup) popup.close()
      reject(new Error('Authentication timed out'))
    }, 120000) // 2 minutes timeout
  })
}

export function linkedInToCVFormat(profile: LinkedInProfile) {
  const formatDate = (
    date: { month: number; year: number } | undefined,
    isEndDate = false,
  ) => {
    if (!date) {
      return isEndDate ? 'Present' : ''
    }

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return `${monthNames[date.month - 1]} ${date.year}`
  }

  const formatExperienceDates = (position: LinkedInProfile['positions'][0]) => {
    const startDate = formatDate(position.startDate)
    const endDate = formatDate(position.endDate, true)
    return `${startDate} - ${endDate}`
  }

  const formatEducationDates = (
    education: LinkedInProfile['educations'][0],
  ) => {
    const startDate = formatDate(education.startDate)
    const endDate = formatDate(education.endDate, true)
    return `${startDate} - ${endDate}`
  }

  const splitDescriptions = (description: string): string[] => {
    return description
      .split(/\.\s+/)
      .filter(Boolean)
      .map((desc) => desc.trim() + '.')
  }

  return {
    data: {
      profile: {
        name: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
        phone: '',
        location: `${profile.location.city}, ${profile.location.country}`,
        url: `https://linkedin.com/in/${profile.id}`,
        summary: profile.summary,
      },
      educations: profile.educations.map((edu) => ({
        school: edu.schoolName,
        degree: `${edu.degreeName} in ${edu.fieldOfStudy}`,
        gpa: '',
        date: formatEducationDates(edu),
        descriptions: [edu.description],
      })),
      workExperiences: profile.positions.map((pos) => ({
        company: pos.companyName,
        jobTitle: pos.title,
        date: formatExperienceDates(pos),
        descriptions: splitDescriptions(pos.description),
      })),
      skills: {
        featuredSkills: profile.skills.map((skill) => ({
          skill,
          rating: 4,
        })),
        descriptions: [],
      },
      projects: [],
      custom: {
        descriptions: [],
      },
      url: `https://linkedin.com/in/${profile.id}`,
    },
    success: true,
    statusCode: 200,
    message: 'LinkedIn data parsed successfully',
    error: null,
    path: '',
    timestamp: new Date().toISOString(),
  }
}
