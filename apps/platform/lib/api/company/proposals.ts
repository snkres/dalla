import { axiosInstance } from '../instance'
export interface UpdateProposalStatusRes {
  data: {
    createdAt: string
    description: string
    id: string
    media: string[]
    price: number
    professionalId: string
    projectId: string
    relevantProjects: {
      description?: string
      id?: string
      link?: string
      media?: string[]
      profileId?: string
      role?: string
      skills?: string[]
      thumbnail?: string
      title?: string
      [property: string]: any
    }[]
    status: string
    timeline: string
    updatedAt: string
    [property: string]: any
  }
  error: null
  message: string
  path: string
  /**
   * Pending | Accepted | Rejected
   */
  status: string
  statusCode: number
  success: boolean
  timestamp: string
  [property: string]: any
}

export const updateProposalStatus = async (
  projectId: string,
  proposalId: string,
  status: 'Accepted' | 'Rejected',
) => {
  const res = await axiosInstance
    .patch<UpdateProposalStatusRes>(
      `/company/projects/${projectId}/proposals/${proposalId}`,
      {
        status,
      },
    )
    .then((res) => res.data)

  return res
}
