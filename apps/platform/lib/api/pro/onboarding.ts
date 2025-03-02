import { ProOnboardingData } from 'app/(auth)/onboard/page'
import { axiosInstance } from '../instance'

export async function proOnboarding(payload: ProOnboardingData) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/professionals/onboarding', payload)
    .then((res) => res.data)

  return res
}
