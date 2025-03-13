import type { ProOnboardingData } from 'app/(auth)/onboard/hooks/use-onboarding'
import { axiosInstance } from '../instance'
import type { ProProfile } from '@lib/atoms/pro/profile'

export async function proOnboarding(payload: ProOnboardingData) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: ProProfile
    }>('/professionals/onboarding', payload)
    .then((res) => res.data)

  return res
}
