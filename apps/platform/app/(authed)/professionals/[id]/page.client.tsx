'use client'

import { ProfileCard } from './components/profile-card'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { updateProProfile } from '@lib/api/pro/profile'
import { useQueryState } from 'nuqs'
import { getCookie } from 'cookies-next'
import ProfileSummary from './components/profile-summary'
import ProjectsSection from './components/projects-section'
import { ExperienceSection } from './components/exp-section'
import { EducationSection } from './components/edu-section'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'

export function ProProfileClient({ id }: { id: string }) {
  const isOwner = getCookie('id') === id
  const [profile, setProfile] = useAtom(proProfileAtom)
  const { toast } = useToast()
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handlePublicViewToggle = (value: boolean) => {
    setIsPublicView(value)
  }
  console.log(profile)

  return (
    <div className="mx-auto max-w-[1400px] p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <ProfileCard
            profile={{
              name: profile?.name,
              title: profile?.UserProfile.headline,
              hourlyRate: null,
              totalEarned: null,
              projectsCompleted: null,
              successRate: null,
              weeklyAvailability: null,
              availability: 'available',
              rating: null,
              projectCompletion: null,
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
          />
          {/* <SkillsSection /> */}
          {/* <DetailedInfo /> */}
          {/* <FilesReview /> */}
        </div>
        <div className="space-y-6 lg:col-span-8">
          <ProfileSummary
            summary={{
              title: profile?.UserProfile.headline,
              content: profile?.UserProfile.bio,
              skills: profile?.UserProfile.meta.skills,
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdateSummary={(updatedSummary) => {
              updateProProfile({
                headline: updatedSummary.title,
                bio: updatedSummary.content,
                meta: {
                  ...profile?.UserProfile.meta,
                  skills: updatedSummary.skills,
                },
                education: profile?.UserProfile.education?.map(
                  ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
                ),
                experience: profile?.UserProfile.experience?.map(
                  ({ id, profileId, createdAt, updatedAt, ...exp }) => exp,
                ),
              }).then(() => {
                setProfile({
                  ...profile,
                  UserProfile: {
                    ...profile?.UserProfile,
                    headline: updatedSummary.title,
                    bio: updatedSummary.content,
                    meta: {
                      ...profile?.UserProfile.meta,
                      skills: updatedSummary.skills,
                    },
                  },
                })
                toast({
                  title: 'Profile updated successfully',
                  description: 'Your profile has been updated successfully',
                })
              })
            }}
          />
          <ProjectsSection />
          <ExperienceSection
            experiences={profile?.UserProfile.experience}
            onUpdateExperiences={(updatedExperiences) => {
              updateProProfile({
                experience: updatedExperiences.map(
                  ({ id, profileId, createdAt, updatedAt, ...exp }) => ({
                    ...exp,
                    meta: {
                      ...exp.meta,
                      skills: exp.meta.skills,
                    },
                  }),
                ),
                education: profile?.UserProfile.education?.map(
                  ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
                ),
                // meta: profile?.UserProfile.meta,
              }).then(() => {
                setProfile({
                  ...profile,
                  UserProfile: {
                    ...profile?.UserProfile,
                    experience: updatedExperiences,
                  },
                })
                toast({
                  title: 'Profile updated successfully',
                  description: 'Your profile has been updated successfully',
                })
              })
            }}
          />
          <EducationSection
            education={profile?.UserProfile.education}
            onUpdateEducation={(updatedEducation) => {
              updateProProfile({
                experience: profile?.UserProfile.experience?.map(
                  ({ id, profileId, createdAt, updatedAt, ...exp }) => ({
                    ...exp,
                    meta: {
                      ...exp.meta,
                      skills: exp.meta.skills,
                    },
                  }),
                ),
                education: updatedEducation?.map(
                  ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
                ),
              }).then(() => {
                setProfile({
                  ...profile,
                  UserProfile: {
                    ...profile?.UserProfile,
                    education: updatedEducation,
                  },
                })
                toast({
                  title: 'Profile updated successfully',
                  description: 'Your profile has been updated successfully',
                })
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
