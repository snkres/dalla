import { axiosInstance } from '../instance'

export type GetProfessionalAnalyticsRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    totalProposals: number
    acceptedProposals: number
    successRate: number
    interviews: number
  }
  error: any
  path: string
  timestamp: string
}

export async function getProfessionalAnalytics(payload: {
  from: string
  to: string
}) {
  const res = await axiosInstance
    .get<GetProfessionalAnalyticsRes>('/professionals/proposals/statistics', {
      params: payload,
    })
    .then((res) => res.data)

  return res
}
