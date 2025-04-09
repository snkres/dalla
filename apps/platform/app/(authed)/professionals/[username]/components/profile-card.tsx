'use client'

import { useState, useEffect } from 'react'
import { Button, Riyal } from '@dallah/design-system'
import {
  Edit,
  Clock,
  BadgeCheck,
  Award,
  Star,
  Briefcase,
  Calendar,
  CreditCard,
  CheckCircle,
  X,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Hourglass,
} from 'lucide-react'
import Image from 'next/image'
import { Input } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { formatCurrency } from '@lib/utils/format-currency'

export function ProfileCard({
  profile,
  isPublicView,
  isOwner,
  onTogglePublicView,
  onUpdate,
}: {
  profile: {
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
  isPublicView: boolean
  isOwner: boolean
  onTogglePublicView?: () => void
  onUpdate?: (updatedProfile: typeof profile) => void
}) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<typeof profile>>({
    ...profile,
    name: profile.name || '',
    title: profile.title || '',
    availability: profile.availability || '',
    projectCompletion: profile.projectCompletion || '',
    weeklyAvailability: profile.weeklyAvailability || 0,
    hourlyRate: profile.hourlyRate || 0,
    totalEarned: profile.totalEarned || 0,
    projectsCompleted: profile.projectsCompleted || 0,
    successRate: profile.successRate || 0,
    rating: profile.rating || 0,
  })
  console.log(editedProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Track if user has made changes
    if (isEditing) {
      const profileChanged =
        JSON.stringify(profile) !== JSON.stringify(editedProfile)
      setHasChanges(profileChanged)
    }
  }, [editedProfile, profile, isEditing])

  const handleEdit = () => {
    setEditedProfile({ ...profile })
    setIsEditing(true)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!editedProfile.name?.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!editedProfile.title?.trim()) {
      newErrors.title = 'Professional title is required'
    }

    if (
      editedProfile.hourlyRate !== null &&
      editedProfile.hourlyRate !== undefined &&
      editedProfile.hourlyRate < 0
    ) {
      newErrors.hourlyRate = 'Hourly rate cannot be negative'
    }

    if (
      editedProfile.weeklyAvailability !== null &&
      editedProfile.weeklyAvailability !== undefined &&
      editedProfile.weeklyAvailability < 0
    ) {
      newErrors.weeklyAvailability = 'Weekly availability cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)

    try {
      if (onUpdate) {
        await onUpdate(editedProfile as any)
      }
      setIsEditing(false)
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated',
      })
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating your profile',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (
        confirm('You have unsaved changes. Are you sure you want to cancel?')
      ) {
        setIsEditing(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Professional Profile
        </h2>

        {isOwner &&
          (!isEditing ? (
            <div className="flex items-center gap-2">
              {onTogglePublicView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onTogglePublicView}
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
                  title={
                    isPublicView
                      ? 'Switch to private view'
                      : 'Switch to public view'
                  }
                >
                  {isPublicView ? (
                    <EyeOff className="mr-1 !h-4 !w-4" />
                  ) : (
                    <Eye className="mr-1 !h-4 !w-4" />
                  )}
                  {isPublicView ? 'Private' : 'Public'}
                </Button>
              )}
              {!isPublicView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
                >
                  <Edit className="mr-1 !h-4 !w-4" />
                  Edit
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
              >
                <X className="mr-1 h-3 w-3" />
                Cancel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className={cn(
                  'h-7 rounded-full px-3 text-xs',
                  hasChanges
                    ? 'text-[#63B7B7] hover:bg-[#63B7B7]/10'
                    : 'cursor-not-allowed text-gray-400',
                )}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Save
                  </>
                )}
              </Button>
            </div>
          ))}
      </div>

      <div className="p-5">
        <div className="mb-2 flex justify-end">
          {isEditing ? (
            <Select
              value={editedProfile.availability}
              onValueChange={(value) => handleChange('availability', value)}
            >
              <SelectTrigger className="h-7 w-36 rounded-full text-xs">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="limited">Limited Availability</SelectItem>
                <SelectItem value="unavailable">Not Available</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1 text-xs',
                profile.availability === 'available'
                  ? 'bg-[#00A58C]/10 text-[#00A58C]'
                  : profile.availability === 'limited'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-gray-50 text-gray-600',
              )}
            >
              <div
                className={cn(
                  'h-2 w-2 animate-pulse rounded-full',
                  profile.availability === 'available'
                    ? 'bg-[#00A58C]'
                    : profile.availability === 'limited'
                      ? 'bg-amber-500'
                      : profile.availability === 'unavailable'
                        ? 'bg-gray-500'
                        : 'bg-gray-500',
                )}
              ></div>
              {profile.availability === 'available'
                ? 'Available now'
                : profile.availability === 'limited'
                  ? 'Limited Availability'
                  : profile.availability === 'unavailable'
                    ? 'Not Available'
                    : 'Not Determined'}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-4 h-24 w-24">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-4 ring-[#63B7B7]/20">
              <Image
                src={profile.avatar || '/placeholder.svg'}
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* <div className="absolute -right-1 -top-1 rounded-full bg-white p-0.5">
              <Award className="h-5 w-5 fill-amber-400 text-white" />
            </div> */}
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 rounded-full">
                <BadgeCheck className="h-5 w-5 fill-[#63B7B7] text-white" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mb-2 w-full space-y-2">
              <div>
                <Input
                  value={editedProfile.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={cn(
                    'h-8 text-center text-base font-medium',
                    errors.name && 'border-red-500 focus:ring-red-500',
                  )}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Input
                  value={editedProfile.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={cn(
                    'h-7 text-center text-sm',
                    errors.title && 'border-red-500 focus:ring-red-500',
                  )}
                  placeholder="Your professional title"
                />
                {errors.title && (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <h2 className="mb-0.5 text-lg font-semibold text-gray-800">
                {profile.name}
              </h2>
              <p className="mb-2 text-sm text-gray-600">{profile.title}</p>
            </>
          )}

          <div className="mb-4 flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= Math.floor(profile.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : star - 0.5 <= (profile.rating || 0)
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {profile.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>

          {(!isOwner || isPublicView) && (
            <div className="mb-5 grid w-full grid-cols-2 gap-3">
              <Button className="h-9 !bg-[#63B7B7] text-xs text-white transition-colors duration-200 hover:!bg-[#63B7B7]/90">
                Contact
              </Button>
              <Button
                variant="outline"
                className="h-9 border-[#63B7B7] text-xs text-[#63B7B7] transition-colors duration-200 hover:border-[#63B7B7] hover:!bg-[#63B7B7]/10"
              >
                Hire Now
              </Button>
            </div>
          )}

          <div className="mb-5 grid w-full grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
              <div className="mb-1 flex items-center justify-center">
                <Hourglass className="h-4 w-4 text-[#63B7B7]" />
              </div>
              {isEditing ? (
                <div>
                  <Input
                    type="number"
                    value={editedProfile.hourlyRate ?? ''}
                    onChange={(e) =>
                      handleChange(
                        'hourlyRate',
                        Number.parseInt(e.target.value) || 0,
                      )
                    }
                    className={cn(
                      'h-7 border-none bg-transparent text-center text-base font-medium text-[#63B7B7]',
                      errors.hourlyRate && 'border-red-500 focus:ring-red-500',
                    )}
                    placeholder="Enter hourly rate"
                  />
                  {errors.hourlyRate && (
                    <p className="mt-1 text-center text-xs text-red-500">
                      {errors.hourlyRate}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 text-base font-medium text-[#63B7B7]">
                  {formatCurrency(profile.hourlyRate || 0)}
                  <span className="text-gray-600">/hr</span>
                </div>
              )}
              <div className="text-xs text-gray-600">Hourly Rate</div>
            </div>

            <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
              <div className="mb-1 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-[#63B7B7]" />
              </div>

              <div className="flex items-center justify-center gap-1 text-base font-medium text-[#63B7B7]">
                {formatCurrency(profile.totalEarned || 0)}
              </div>

              <div className="text-xs text-gray-600">Total Earned</div>
            </div>
          </div>

          <div className="mb-5 w-full space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <CheckCircle className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full justify-between">
                <span className="text-xs text-gray-600">
                  Projects Completed
                </span>

                <span className="text-xs font-medium text-gray-800">
                  {profile.projectsCompleted || 0}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Award className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full justify-between">
                <span className="text-xs text-gray-600">Success Rate</span>
                <span className="text-xs font-medium text-gray-800">
                  {profile.successRate ? `${profile.successRate}%` : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Clock className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-gray-600">
                  Weekly Availability
                </span>
                {isEditing ? (
                  <div className="flex w-1/2 items-center">
                    <Input
                      type="number"
                      value={editedProfile.weeklyAvailability ?? ''}
                      onChange={(e) =>
                        handleChange(
                          'weeklyAvailability',
                          Number.parseInt(e.target.value) || 0,
                        )
                      }
                      className={cn(
                        'h-9 text-right !text-xs',
                        errors.weeklyAvailability &&
                          'border-red-500 focus:ring-red-500',
                      )}
                      placeholder="0"
                    />
                    <span className="ml-1 text-xs">hrs/week</span>
                    {errors.weeklyAvailability && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.weeklyAvailability}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-xs font-medium text-gray-800">
                    {profile.weeklyAvailability
                      ? `${profile.weeklyAvailability}+ hrs/week`
                      : 'N/A'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-100 pt-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
              <Calendar className="h-4 w-4 text-[#63B7B7]" />
              Typical Project Delivery
            </h3>

            {isEditing ? (
              <Select
                value={editedProfile.projectCompletion ?? ''}
                onValueChange={(value) =>
                  handleChange('projectCompletion', value)
                }
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue placeholder="Select completion time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2-3 weeks">2-3 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="1-2 months">1-2 Months</SelectItem>
                  <SelectItem value="undefined" disabled>
                    Not Determined
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
                <span className="text-sm font-medium capitalize text-[#63B7B7]">
                  {profile.projectCompletion
                    ? profile.projectCompletion
                    : profile.projectCompletion === 'undefined'
                      ? 'Not Determined'
                      : 'N/A'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
