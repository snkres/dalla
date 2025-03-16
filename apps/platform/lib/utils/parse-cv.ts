import { CVParseResponse } from '@lib/api/pro/parse-cv'

export const extractDates = (dateStr: string) => {
  const processedDate = dateStr.replace(
    'Present',
    new Date().toLocaleDateString('en-UK', {
      month: 'short',
      year: 'numeric',
    }),
  )

  const dates = processedDate.split(' - ')
  if (dates.length !== 2) return { startDate: '', endDate: '' }

  const startDateParts = dates[0].trim().split(' ')
  const endDateParts = dates[1].trim().split(' ')

  if (startDateParts.length < 2 || endDateParts.length < 2)
    return { startDate: '', endDate: '' }

  const startMonth = startDateParts[0]
  const startYear = startDateParts[1]
  const endMonth = endDateParts[0]
  const endYear = endDateParts[1]

  return {
    startDate: `${startMonth} ${startYear}`,
    endDate: dates[1].includes('Present')
      ? 'Present'
      : `${endMonth} ${endYear}`,
  }
}

export const calculateYearsOfExperience = (
  workExperiences: CVParseResponse['data']['workExperiences'],
) => {
  let totalMonths = 0

  for (const experience of workExperiences) {
    const dateStr = experience.date

    const processedDate = dateStr.replace(
      'Present',
      new Date().toLocaleDateString('en-UK', {
        month: 'short',
        year: 'numeric',
      }),
    )

    const dates = processedDate.split(' - ')
    if (dates.length !== 2) continue

    const startDateParts = dates[0].trim().split(' ')
    const endDateParts = dates[1].trim().split(' ')

    if (startDateParts.length < 2 || endDateParts.length < 2) continue

    const startMonth = new Date(
      Date.parse(`${startDateParts[0]} 1, ${startDateParts[1]}`),
    ).getMonth()
    const startYear = Number.parseInt(startDateParts[1])

    const endMonth = new Date(
      Date.parse(`${endDateParts[0]} 1, ${endDateParts[1]}`),
    ).getMonth()
    const endYear = Number.parseInt(endDateParts[1])

    const months = (endYear - startYear) * 12 + (endMonth - startMonth)
    totalMonths += months > 0 ? months : 0
  }

  return Math.max(Math.round(totalMonths / 12), 1)
}

export const extractEducation = (
  educations: CVParseResponse['data']['educations'],
) => {
  return educations.map((edu) => {
    const { startDate, endDate } = extractDates(edu.date)

    let degree = "Bachelor's"
    let field = 'Computer Science'

    if (edu.degree) {
      const degreeMatch = edu.degree.match(
        /(Bachelor|Master|Doctor|Ph\.D|MBA|B\.S|M\.S|B\.A|M\.A)/i,
      )
      if (degreeMatch) {
        degree = degreeMatch[0]
      }

      const fieldMatch = edu.degree.match(/in\s([^-]+)/i)
      if (fieldMatch) {
        field = fieldMatch[1].trim()
      } else {
        const parts = edu.degree.split(' ')
        if (parts.length > 2) {
          field = parts
            .slice(2)
            .join(' ')
            .replace(/^in\s+/i, '')
        }
      }
    }

    return {
      school: edu.school,
      degree: degree,
      field: field,
      startDate: startDate,
      endDate: endDate,
      description: edu.descriptions.join('. '),
    }
  })
}

export const extractWorkExperience = (
  workExperiences: CVParseResponse['data']['workExperiences'],
) => {
  return workExperiences.map((exp) => {
    const { startDate, endDate } = extractDates(exp.date)

    return {
      title: exp.jobTitle,
      company: exp.company,
      location: '',
      startDate: startDate,
      endDate: endDate,
      meta: {
        skills: [] as string[],
        achievements: exp.descriptions
          .filter(
            (desc) =>
              desc.includes('%') ||
              desc.includes('increase') ||
              desc.includes('improve') ||
              desc.includes('enhance'),
          )
          .join('. '),
        responsibilities: exp.descriptions
          .filter(
            (desc) =>
              !desc.includes('%') &&
              !desc.includes('increase') &&
              !desc.includes('improve') &&
              !desc.includes('enhance'),
          )
          .join('. '),
        employmentType: 'Full-time',
      },
    }
  })
}
