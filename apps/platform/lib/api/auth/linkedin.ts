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
