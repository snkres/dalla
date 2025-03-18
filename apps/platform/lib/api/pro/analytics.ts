import { axiosInstance } from '../instance'

export async function getProfessionalAnalytics(payload: {
  from: string
  to: string
}) {
  const res = await axiosInstance
    .get('/professionals/proposals/statistics', { params: payload })
    .then((res) => res.data)

  return res
}
