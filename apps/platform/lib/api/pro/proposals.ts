import { ProjectStatus } from '../company/projects'
import { axiosInstance } from '../instance'

export type ProposalStatus = 'Accepted' | 'Rejected' | 'Pending'

interface CreateProjectProposalRes {
  data: Data
  error: null
  message: string
  path: string
  statusCode: number
  success: boolean
  timestamp: string
  [property: string]: any
}

interface Data {
  createdAt: string
  description: string
  id: string
  media: string[]
  price: number
  professional: Professional
  professionalId: string
  project: Project
  projectId: string
  status: string
  timeline: string
  updatedAt: string
  [property: string]: any
}

interface Professional {
  createdAt: string
  email: string
  id: string
  name: string
  onboarded: boolean
  password: string
  suspended: boolean
  updatedAt: string
  username: string
  verified: boolean
  [property: string]: any
}

interface Project {
  approved: boolean
  assignedProfessionalId: null
  companyId: string
  createdAt: string
  deliverables: string
  description: string
  id: string
  jobTitle: string
  meta: Meta
  scope: string
  skills: string[]
  status: string
  title: string
  updatedAt: string
  [property: string]: any
}

interface Meta {
  budget: number
  timeline: string
  [property: string]: any
}

export async function createProjectProposal(
  projectId: string,
  payload: {
    price: number
    timeline: string
    description: string
    relevantProjects: Array<string>
    media: Array<string>
  },
) {
  const res = await axiosInstance
    .post<CreateProjectProposalRes>(
      `/professionals/projects/${projectId}/proposals`,
      payload,
    )
    .then((res) => res.data)

  return res
}
export type GetAllProposalsRes = {
  statusCode: number
  success: boolean
  message: string
  data: [
    Array<{
      id: string
      status: ProposalStatus
      createdAt: string
      project: {
        title: string
        id: string
        meta: {
          budget: number
          duration: string
        }
        company: {
          id: string
          name: string
          CompanyProfile: {
            meta: {
              size: string
              type: string
              phone: string
              industry: string
              socialLinks: {
                url: string
                name: string
              }
            }
          }
        }
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

export async function getAllProposals(page: number, limit: number) {
  const res = await axiosInstance
    .get<GetAllProposalsRes>(
      `/professionals/proposals?page=${page}&limit=${limit}`,
    )
    .then((res) => res.data)

  return res
}
export type GetProposalByIdRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    projectId: string
    professionalId: string
    description: string
    price: number
    timeline: string
    media: Array<string>
    status: ProposalStatus

    createdAt: string
    updatedAt: string
    professional: {
      id: string
      name: string
      username: string
      email: string
      password: string
      onboarded: boolean
      verified: boolean
      suspended: boolean
      createdAt: string
      updatedAt: string
    }
    project: {
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
      status: ProjectStatus
      companyId: string
      assignedProfessionalId: any
      createdAt: string
      updatedAt: string
      company: {
        id: string
        name: string
        CompanyProfile: {
          logo: string
          meta: {
            location: string
          }
        }
      }
      _count: {
        proposals: number
      }
    }
    relevantProjects: Array<any>
  }
  error: any
  path: string
  timestamp: string
}

export async function getProposalById(proposalId: string, projectId: string) {
  const res = await axiosInstance
    .get<GetProposalByIdRes>(
      `/professionals/projects/${projectId}/proposals/${proposalId}`,
    )
    .then((res) => res.data)

  return res
}

export async function deleteProposal(proposalId: string, projectId: string) {
  const res = await axiosInstance
    .delete(`/professionals/projects/${projectId}/proposals/${proposalId}`)
    .then((res) => res.data)

  return res
}
