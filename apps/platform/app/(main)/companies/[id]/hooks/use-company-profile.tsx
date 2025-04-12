import { globalAtom } from '@lib/atoms/global'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCompanyProfile,
  getOwnCompanyProfile,
  updateCompanyProfile,
} from '@lib/api/company/profile'
import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { type CompanyProfile, companyMetaAtom } from '@lib/atoms/company/meta'

export function useCompanyProfile({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const isOwner = global.id === id
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data, isLoading } = useQuery({
    queryKey: ['company-profile', id],
    queryFn: () => getCompanyProfile(id),
    enabled: !isOwner,
  })
  const { data: ownProfile, isLoading: ownProfileLoading } = useQuery({
    queryKey: ['own-company-profile', id],
    queryFn: () => getOwnCompanyProfile(),
    enabled: isOwner,
  })
  const profile = isOwner ? ownProfile : data
  const [meta, setMeta] = useAtom(companyMetaAtom)
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handleTogglePublicView = () => {
    setIsPublicView(!isPublicView)
  }

  const updateProfileMutation = useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['own-company-profile', id], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              CompanyProfile: {
                ...oldData.data.data,
                ...updatedData.data?.data,
              },
            },
          },
        }
      })

      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been updated successfully',
      })
    },
    onError: (error) => {
      console.error('Failed to update profile:', error)
      toast({
        title: 'Update failed',
        description: 'There was a problem updating your profile',
        variant: 'destructive',
      })
    },
  })

  const handleProfileUpdate = async (
    payload: Partial<CompanyProfile['data']['CompanyProfile']>,
  ) => {
    updateProfileMutation.mutate(payload)
  }

  return {
    profile: profile?.data,
    isLoading: isLoading || ownProfileLoading,
    isOwner,
    handleProfileUpdate,
    isPublicView,
    handleTogglePublicView,
  }
}
