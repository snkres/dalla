'use client'

import { ProfileData, useProfileCard } from '../../hooks/use-profile-card'
import { ProfileCardHeader } from './profile-card-header'
import { ProfileAvailabilityBadge } from './profile-availability-badge'
import { ProfileInfo } from './profile-info'
import { ProfileActions } from './profile-actions'
import { ProfileStatsOverview } from './profile-stats-overview'
import { ProfileStatsDetails } from './profile-stats-details'
import { ProfileDelivery } from './profile-delivery'

interface ProfileCardProps {
  profile: ProfileData
  isPublicView: boolean
  isOwner: boolean
  onTogglePublicView?: () => void
  onUpdate?: (updatedProfile: Partial<ProfileData>) => Promise<void> | void
}

type FormValues = Pick<
  ProfileData,
  | 'name'
  | 'title'
  | 'availability'
  | 'projectCompletion'
  | 'hourlyRate'
  | 'weeklyAvailability'
>

export function ProfileCard({
  profile: initialProfile,
  isPublicView: initialIsPublicView,
  isOwner: initialIsOwner,
  onTogglePublicView: initialOnTogglePublicView,
  onUpdate,
}: ProfileCardProps) {
  const {
    form,
    isEditing,
    handleEdit,
    handleCancel,
    profile,
    isPublicView,
    isOwner,
    onTogglePublicView,
  } = useProfileCard({
    initialProfile,
    isPublicView: initialIsPublicView,
    isOwner: initialIsOwner,
    onTogglePublicView: initialOnTogglePublicView,
    onUpdate,
  })

  const displayProfile = isEditing ? form.state.values : profile

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <ProfileCardHeader
        isOwner={isOwner}
        isEditing={isEditing}
        isPublicView={isPublicView}
        isSaving={form.state.isSubmitting}
        hasChanges={form.state.isDirty}
        onTogglePublicView={onTogglePublicView}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={form.handleSubmit}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="p-5"
      >
        <div className="mb-2 flex justify-end">
          <ProfileAvailabilityBadge
            form={form}
            isEditing={isEditing}
            availability={displayProfile.availability}
          />
        </div>

        <ProfileInfo
          form={form}
          isEditing={isEditing}
          avatar={profile.avatar}
          isVerified={profile.isVerified}
          name={displayProfile.name}
          title={displayProfile.title}
          rating={profile.rating}
        />

        {(!isOwner || isPublicView) && <ProfileActions />}

        <ProfileStatsOverview
          form={form}
          isEditing={isEditing}
          hourlyRate={displayProfile.hourlyRate}
          totalEarned={profile.totalEarned}
        />

        <ProfileStatsDetails
          form={form}
          isEditing={isEditing}
          projectsCompleted={profile.projectsCompleted}
          successRate={profile.successRate}
          weeklyAvailability={displayProfile.weeklyAvailability}
        />

        <ProfileDelivery
          form={form}
          isEditing={isEditing}
          projectCompletion={displayProfile.projectCompletion}
        />

        <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
      </form>
    </div>
  )
}
