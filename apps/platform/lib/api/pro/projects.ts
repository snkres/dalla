import { axiosInstance } from '../instance'

export type Project = {
  id: string
  title: string
  jobTitle: string
  description: string
  skills: Array<string>
  meta: {
    budget: number
    status: string
    priority: string
    timeline: string
  }
  createdAt: string
  company: {
    id: string
    name: string
  }
  applied: boolean
}

export type AllProjectsRes = {
  statusCode: number
  success: boolean
  message: string
  data: Array<Project>
  error: any
  path: string
  timestamp: string
}

export async function getAllProjects() {
  const res = await axiosInstance
    .get<AllProjectsRes>('/professionals/projects')
    .then((res) => res.data.data)

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
