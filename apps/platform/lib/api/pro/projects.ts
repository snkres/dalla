import { GetProjectRes } from '../company/projects'
import { axiosInstance } from '../instance'

export type GetAllProjectsRes = {
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

export async function getAllProjects(page: number, limit: number) {
  const res = await axiosInstance
    .get<GetAllProjectsRes>(
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
