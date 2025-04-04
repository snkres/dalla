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

export function initLinkedInAuth() {
  const clientId = 'your-linkedin-client-id'
  const redirectUri = `${window.location.origin}/auth/linkedin/callback`
  const scope = 'r_liteprofile r_emailaddress'

  // Generate a random state parameter to prevent CSRF attack
  const state = Math.random().toString(36).substring(2)

  const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`

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
    setTimeout(() => {
      if (popup) popup.close()

      const mockProfile: LinkedInProfile = {
        id: 'linkedin123456',
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: 'https://example.com/avatar.jpg',
        email: 'john.doe@example.com',
        headline: 'Senior Software Engineer',
        summary:
          'Experienced software engineer with a passion for building scalable web applications.',
        location: {
          country: 'United States',
          city: 'San Francisco',
        },
        positions: [
          {
            companyName: 'Tech Company',
            title: 'Senior Software Engineer',
            startDate: {
              month: 1,
              year: 2018,
            },
            description:
              'Led development of key features resulting in 30% increase in user engagement. Managed team of 5 engineers. Implemented CI/CD pipeline reducing deployment time by 50%.',
            location: 'San Francisco, CA',
          },
          {
            companyName: 'Startup Inc.',
            title: 'Software Developer',
            startDate: {
              month: 7,
              year: 2017,
            },
            endDate: {
              month: 12,
              year: 2017,
            },
            description:
              'Developed front-end components using React. Collaborated with design team to implement UI/UX improvements.',
            location: 'San Francisco, CA',
          },
        ],
        educations: [
          {
            schoolName: 'Stanford University',
            degreeName: 'Master',
            fieldOfStudy: 'Computer Science',
            startDate: {
              month: 9,
              year: 2015,
            },
            endDate: {
              month: 6,
              year: 2017,
            },
            description: 'Focus on AI and Machine Learning',
          },
        ],
        skills: [
          'JavaScript',
          'React',
          'TypeScript',
          'Node.js',
          'UI/UX Design',
          'Team Leadership',
        ],
      }

      resolve(mockProfile)
    }, 2000)
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
