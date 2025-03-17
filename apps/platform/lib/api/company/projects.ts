import { ProProfile } from '@lib/atoms/pro/profile'
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
      professional: {
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
        professional: {
          id: string
          name: string
          username: string
          email: string
          domain: any
          password: string
          UserProfile: {
            avatar: string
            headline: string
            meta: ProProfile['data']['meta']
          }
        }
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

export interface CreateProjectReq {
  deliverables: string
  description: string
  jobTitle: string
  meta: Meta
  scope: string
  skills: string[]
  title: string
  [property: string]: any
}

export interface Meta {
  budget: number
  // priority: string
  duration: string
  [property: string]: any
}

export interface CreateProjectRes {
  data: CreateProjectData
  deliverables: string
  description: string
  error: null
  jobTitle: string
  message: string
  meta: CreateProjectResponseMeta
  path: string
  scope: string
  skills: string[]
  statusCode: number
  success: boolean
  timestamp: string
  title: string
  [property: string]: any
}

export interface CreateProjectData {
  approved: boolean
  assignedProfessionalId: null
  companyId: string
  createdAt: string
  deliverables: string
  description: string
  id: string
  jobTitle: string
  meta: CreateProjectDataMeta
  scope: string
  skills: string[]
  status: string
  title: string
  updatedAt: string
  [property: string]: any
}

export interface CreateProjectDataMeta {
  budget: string
  priority: string
  status: string
  timeline: string
  [property: string]: any
}

export interface CreateProjectResponseMeta {
  budget: string
  priority: string
  /**
   * Open | Closed | InProgress | Completed
   */
  status: string
  timeline: string
  [property: string]: any
}
export const createProject = async (data: CreateProjectReq) => {
  const res = await axiosInstance
    .post<CreateProjectRes>('/company/projects', data)
    .then((res) => res.data.data)

  return res
}
