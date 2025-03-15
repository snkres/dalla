import { axiosInstance } from '../instance'

export type GetAllCompanyProjectsRes = {
  statusCode: number
  success: boolean
  message: string
  data: [
    Array<{
      id: string
      title: string
      description: string
      scope: string
      jobTitle: string
      skills: Array<string>
      deliverables: string
      meta: {
        budget: number
        duration: string
      }
      approved: boolean
      status: string
      companyId: string
      assignedProfessionalId: any
      createdAt: string
      updatedAt: string
      company: {
        id: string
        name: string
        email: string
        domain: any
        password: string
        onboarded: boolean
        suspended: boolean
        verified: boolean
        createdAt: string
        updatedAt: string
      }
      professional: any
      proposals: Array<{
        id: string
        projectId: string
        professionalId: string
        description: string
        price: number
        timeline: string
        media: Array<string>
        status: string
        createdAt: string
        updatedAt: string
      }>
    }>,
    {
      isFirstPage: boolean
      isLastPage: boolean
      currentPage: number
      previousPage: any
      nextPage: any
    },
  ]
  error: any
  path: string
  timestamp: string
}

export const getAllProjects = async (page: number, limit: number) => {
  const res = await axiosInstance
    .get<GetAllCompanyProjectsRes>(
      `/company/projects?page=${page}&limit=${limit}`,
    )
    .then((res) => res.data.data)

  return res
}
