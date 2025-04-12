import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import {
  createShowCaseProject,
  getOwnProProfile,
  getProProfile,
  updateProProfile,
  updateShowCaseProject,
} from '@lib/api/pro/profile'
import { useQueryState } from 'nuqs'
import { globalAtom } from '@lib/atoms/global'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'

export function useProfessionalProfile({ username }: { username: string }) {
  const [global] = useAtom(globalAtom)
  const { toast } = useToast()
  const isOwner = global.username === username
  const queryClient = useQueryClient()
  const { data: proProfile, isLoading } = useQuery({
    queryKey: ['pro-profile', username],
    queryFn: () => getProProfile(username),
    enabled: !isOwner,
  })
  const { data: ownProfile, isLoading: ownProfileLoading } = useQuery({
    queryKey: ['own-pro-profile', username],
    queryFn: () => getOwnProProfile(),
    enabled: isOwner,
  })
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handleTogglePublicView = () => {
    setIsPublicView(!isPublicView)
  }

  const profileMutation = useMutation({
    mutationFn: updateProProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['own-pro-profile', username] })
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

  const createShowCaseProjectMutation = useMutation({
    mutationFn: ({ proId, projectData }: { proId: string; projectData: any }) =>
      createShowCaseProject(proId, projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['own-pro-profile', username] })
    },
    onError: (error) => {
      console.error('Failed to create project:', error)
    },
  })

  const updateShowCaseProjectMutation = useMutation({
    mutationFn: ({
      proId,
      projectId,
      projectData,
    }: {
      proId: string
      projectId: string
      projectData: any
    }) => updateShowCaseProject(proId, projectId, projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['own-pro-profile', username] })
    },
    onError: (error) => {
      console.error('Failed to update project:', error)
    },
  })

  return {
    toast,
    profile: isOwner ? ownProfile?.data : proProfile?.data,
    isLoading: isLoading || ownProfileLoading,
    isOwner,
    profileMutation,
    isPublicView,
    handleTogglePublicView,
    createShowCaseProjectMutation,
    updateShowCaseProjectMutation,
  }
}
