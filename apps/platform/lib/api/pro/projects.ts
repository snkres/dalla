import { axiosInstance } from '../instance'

export type Project = {
  id: string
  title: string
  jobTitle: string
  description: string
  skills: Array<string>
  meta: {
    budget: string
    status: string
    priority: string
    timeline: string
  }
  createdAt: string
  company: {
    id: string
    name: string
  }
}

export type AllProjectsRes = {
  statusCode: number
  success: boolean
  message: string
  data: [
    Array<Project>,
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

export async function getAllProjects() {
  const res = await axiosInstance
    .get<AllProjectsRes>('/professionals/projects')
    .then((res) => res.data.data)

  return res
}
