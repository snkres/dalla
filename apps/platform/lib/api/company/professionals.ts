import { axiosInstance } from '../instance'

export type GetAllProfessionalsRes = {
  statusCode: number
  success: boolean
  message: string
  data: [
    Array<{
      avatar: string
      headline: string
      meta: {
        rating: number
        phone: string
        skills: Array<string>
        location: string
        hourlyRate: number
        socialLinks: {
          Portfolio: string
        }
        successRate: any
        totalEarned: any
        availability: string
        projectCompletion: string
        projectsCompleted: any
        yearsOfExperience: number
        weeklyAvailability: any
      }
      userId: string
      User: {
        id: string
        username: string
        email: string
        name: string
      }
    }>,
    {
      isFirstPage: boolean
      isLastPage: boolean
      currentPage: number
      previousPage: any
      nextPage: any
      totalCount: number
    },
  ]
  error: any
  path: string
  timestamp: string
}

export const getAllProfessionals = async (page: number, limit: number) => {
  const res = await axiosInstance.get<GetAllProfessionalsRes>(
    `/company/professional?page=${page}&limit=${limit}`,
  )
  return res.data
}
