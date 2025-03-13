import { axiosInstance } from '../instance'

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
  duration: string
  priority: string
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
