import { ProProfile } from '@lib/atoms/pro/meta'
import { axiosInstance } from '../instance'

export type ProjectStatus = 'Open' | 'Closed' | 'InProgress' | 'Completed'

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
      media: Array<string>
      meta: {
        budget: number
        timeline: string
        duration: string
      }
      approved: boolean
      status: ProjectStatus
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
        UserProfile: {
          avatar: string
          headline: string
          meta: ProProfile['data']['meta']
        }
      }
      proposals: Array<{
        id: string
        projectId: string
        professionalId: string
        description: string
        price: number
        timeline: string
        media: Array<string>
        status: 'Rejected' | 'Accepted' | 'Pending'
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
        milestones: Array<{
          order: number
          title: string
          description: string
          price: number
          timeline: string
        }>
      }>
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

export const getAllProjects = async (page: number, limit: number) => {
  const res = await axiosInstance.get<GetAllCompanyProjectsRes>(
    `/company/projects?page=${page}&limit=${limit}`,
  )

  return res
}

export type GetProjectRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    title: string
    description: string
    skills: Array<string>
    media: Array<string>
    meta: {
      startedAt: string
      endedAt?: string
      budget: number
      timeline: string
      duration: string
    }
    createdAt: string
    deliverables: string
    jobTitle: string
    scope: string
    status: ProjectStatus
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
        logo: string
      }
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
      deletedAt: any
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
    applied: boolean
  }
  error: any
  path: string
  timestamp: string
}

export const getProject = async (id: string) => {
  const res = await axiosInstance
    .get<GetProjectRes>(`/company/projects/${id}`)
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
  media: Array<string>
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
  media: Array<string>
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
  media: Array<string>
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

  status: 'Open' | 'Closed' | 'InProgress' | 'Completed'
  timeline: string
  [property: string]: any
}
export const createProject = async (data: CreateProjectReq) => {
  const res = await axiosInstance
    .post<CreateProjectRes>('/company/projects', data)
    .then((res) => res.data.data)

  return res
}

export const updateProject = async (
  projectId: string,
  data: CreateProjectReq,
) => {
  const res = await axiosInstance
    .put<CreateProjectRes>(`/company/projects/${projectId}`, data)
    .then((res) => res.data.data)

  return res
}
