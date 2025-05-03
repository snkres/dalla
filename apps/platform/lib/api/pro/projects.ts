import { GetProjectRes } from '../company/projects'
import { axiosInstance } from '../instance'

export type GetAllProjectsProfessionalViewRes = {
  statusCode: number
  success: boolean
  message: string
  data: [
    Array<{
      id: string
      title: string
      jobTitle: string
      description: string
      skills: Array<string>
      media: Array<string>
      meta: {
        budget: number
        duration: string
      }
      createdAt: string
      company: {
        id: string
        name: string
      }
      _count: {
        proposals: number
      }
      applied: boolean
    }>,
    {
      isFirstPage: boolean
      isLastPage: boolean
      currentPage: number
      previousPage: any
      nextPage: any
      pageCount: number
      totalCount: number
    },
  ]
  error: any
  path: string
  timestamp: string
}

export async function getAllProjectsProfessionalView(
  page: number,
  limit: number,
) {
  const res = await axiosInstance
    .get<GetAllProjectsProfessionalViewRes>(
      `/professionals/projects?page=${page}&limit=${limit}`,
    )
    .then((res) => res.data)

  return res
}

export type GetProjectByIdRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    title: string
    description: string
    skills: Array<string>
    meta: {
      budget: number
      duration: string
    }
    media: Array<string>
    createdAt: string
    deliverables: string
    jobTitle: string
    scope: string
    status: string
    _count: {
      proposals: number
    }
    company: {
      id: string
      name: string
      createdAt: string
      _count: {
        projects: number
      }
      CompanyProfile: {
        location: string
      }
    }
    applied: boolean
  }
  error: any
  path: string
  timestamp: string
}

export async function getProjectById(id: string) {
  const res = await axiosInstance
    .get<GetProjectByIdRes>(`/professionals/projects/${id}`)
    .then((res) => res.data.data)

  return res
}

export const getProjectProfessionalView = async (id: string) => {
  const res = await axiosInstance
    .get<GetProjectRes>(`/professionals/projects/${id}`)
    .then((res) => res.data.data)

  return res
}

export async function submitMilestone({
  payload,
  projectId,
  milestoneId,
}: {
  payload: {
    description: string
    media: string[]
  }
  projectId: string
  milestoneId: string
}) {
  const res = await axiosInstance
    .post<GetProjectRes>(
      `/professionals/projects/${projectId}/milestones/${milestoneId}/submissions`,
      payload,
    )
    .then((res) => res.data.data)

  return res
}
