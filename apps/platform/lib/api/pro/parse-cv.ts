import { axiosInstance } from '../instance'

export interface CVParseResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    profile: {
      name: string
      email: string
      phone: string
      location: string
      url: string
      summary: string
    }
    educations: Array<{
      school: string
      degree: string
      gpa: string
      date: string
      descriptions: string[]
    }>
    workExperiences: Array<{
      company: string
      jobTitle: string
      date: string
      descriptions: string[]
    }>
    skills: {
      featuredSkills: Array<{
        skill: string
        rating: number
      }>
      descriptions: string[]
    }
    projects: Array<{
      project: string
      date: string
      descriptions: string[]
    }>
    custom: {
      descriptions: string[]
    }
    url: string
  }
  error: null
  path: string
  timestamp: string
}

export async function parseCV(cv: File) {
  const formData = new FormData()
  formData.append('file', cv)

  console.log(formData)

  const res = await axiosInstance
    .post<CVParseResponse>('/professionals/parse-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)

  return res
}
