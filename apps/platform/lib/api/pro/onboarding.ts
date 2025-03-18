import type { ProOnboardingData } from 'app/(auth)/onboard/hooks/use-onboarding'
import { axiosInstance } from '../instance'
import { ProProfile } from '@lib/atoms/pro/meta'

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
