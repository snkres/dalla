import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

export interface ProfileData {
  avatar: string
  isVerified: boolean
  name: string
  title: string
  hourlyRate: number | null
  totalEarned: number | null
  projectsCompleted: number | null
  successRate: number | null
  weeklyAvailability: number | null
  availability: string
  rating: number | null
  projectCompletion: string | null
}

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Professional title is required'),
  availability: z.string(),
  projectCompletion: z.string().nullable(),
  hourlyRate: z
    .number({
      coerce: true,
      invalid_type_error: 'Hourly rate must be a number',
    })
    .min(0, 'Hourly rate cannot be negative')
    .nullable(),
  weeklyAvailability: z
    .number({
      coerce: true,
      invalid_type_error: 'Weekly availability must be a number',
    })
    .min(0, 'Weekly availability cannot be negative')
    .nullable(),
})

interface UseProfileCardProps {
  initialProfile: ProfileData
  isPublicView: boolean
  isOwner: boolean
  onTogglePublicView?: () => void
  onUpdate?: (updatedProfile: Partial<ProfileData>) => Promise<void> | void
}

export function useProfileCard({
  initialProfile,
  isPublicView,
  isOwner,
  onTogglePublicView,
  onUpdate,
}: UseProfileCardProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    defaultValues: {
      name: initialProfile.name || '',
      title: initialProfile.title || '',
      availability: initialProfile.availability || 'unavailable',
      projectCompletion: initialProfile.projectCompletion || null,
      hourlyRate: initialProfile.hourlyRate ?? null,
      weeklyAvailability: initialProfile.weeklyAvailability ?? null,
    },
    onSubmit: async ({ value }) => {
      if (!onUpdate) return

      try {
        await onUpdate(value)
        setIsEditing(false)
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been successfully updated.',
        })
      } catch (error) {
        console.error('Update Failed:', error)
        toast({
          title: 'Update Failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
          variant: 'destructive',
        })
      }
    },

    validators: {
      onChange: profileSchema,
    },
  })

  const handleEdit = useCallback(() => {
    form.reset()
    setIsEditing(true)
  }, [form])

  const handleCancel = useCallback(() => {
    if (form.state.isDirty) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to cancel?',
        )
      ) {
        form.reset()
        setIsEditing(false)
      }
    } else {
      setIsEditing(false)
    }
  }, [form])

  useEffect(() => {
    if (!isEditing) {
      form.reset()
    }
  }, [initialProfile, isEditing, form])

  return {
    form,
    isEditing,
    handleEdit,
    handleCancel,
    profile: initialProfile,
    isPublicView,
    isOwner,
    onTogglePublicView,
  }
}

export type ProfileCardFormInstance = ReturnType<typeof useProfileCard>['form']
