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
import { LanguagesSection } from './components/langs-section'
import { SocialsSection } from './components/socials-section'
import { Language, Social } from '@lib/types/profile'
import { VerificationsSection } from './components/verifications-section'

export function ProProfileClient({ username }: { username: string }) {
  const isOwner = getCookie('username') === username
  console.log(isOwner, username, getCookie('username'))
  const [profile, setProfile] = useAtom(proProfileAtom)
  const { toast } = useToast()
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handleProfileUpdate = async (
    updateData: any,
    successMessage = 'Profile updated successfully',
  ) => {
    try {
      console.log('updateData', updateData)
      await updateProProfile({
        ...updateData,
        education: profile.UserProfile.education?.map(
          ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
        ),
        experience: profile.UserProfile.experience?.map(
          ({ id, profileId, createdAt, updatedAt, ...exp }) => ({
            ...exp,
            meta: {
              ...exp.meta,
              skills: exp.meta.skills,
            },
          }),
        ),
      })

      setProfile({
        ...profile,
        UserProfile: {
          ...profile.UserProfile,
          ...updateData,
        },
      })

      toast({
        title: successMessage,
        description: 'Your profile has been updated successfully',
      })
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast({
        title: 'Update failed',
        description: 'There was a problem updating your profile',
        variant: 'destructive',
      })
    }
  }

  if (!profile) return null

  return (
    <div className="mx-auto max-w-[1400px] p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <ProfileCard
            profile={{
              name: profile?.name,
              avatar: profile.UserProfile.avatar,
              title: profile?.UserProfile.headline,
              hourlyRate:
                Number(profile.UserProfile.meta['hourlyRate']) || null,
              totalEarned:
                Number(profile.UserProfile.meta['totalEarned']) || null,
              projectsCompleted:
                Number(profile.UserProfile.meta['projectsCompleted']) || null,
              successRate:
                Number(profile.UserProfile.meta['successRate']) || null,
              weeklyAvailability:
                Number(profile.UserProfile.meta['weeklyAvailability']) || null,
              availability: String(profile.UserProfile.meta['availability']),
              rating: Number(profile.UserProfile.meta['rating']) || null,
              projectCompletion:
                String(profile.UserProfile.meta['projectCompletion']) || null,
              isVerified: profile.verified,
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onTogglePublicView={
              isOwner ? () => setIsPublicView(!isPublicView) : undefined
            }
            onUpdate={(updatedProfile) => {
              handleProfileUpdate({
                meta: {
                  ...profile?.UserProfile.meta,
                  hourlyRate: updatedProfile.hourlyRate,
                  totalEarned: updatedProfile.totalEarned,
                  projectsCompleted: updatedProfile.projectsCompleted,
                  successRate: updatedProfile.successRate,
                  weeklyAvailability: updatedProfile.weeklyAvailability,
                  availability: updatedProfile.availability,
                  projectCompletion: updatedProfile.projectCompletion,
                },
              })
            }}
          />
          <div className="mx-auto flex max-w-5xl flex-col gap-5">
            <LanguagesSection
              languages={
                profile?.UserProfile.meta.languages as unknown as Language[]
              }
              onUpdate={(languages) => {
                const languagesObj = languages.reduce(
                  (acc, { language, proficiency }) => ({
                    ...acc,
                    [language]: proficiency,
                  }),
                  {},
                )

                handleProfileUpdate({
                  meta: {
                    ...profile?.UserProfile.meta,
                    languages: languagesObj,
                  },
                })
              }}
              isPublicView={isPublicView}
              isOwner={isOwner}
            />
            <VerificationsSection isEmailVerified={profile.verified} />
            <SocialsSection
              socials={Object.entries(
                profile?.UserProfile?.meta?.socialLinks ||
                  ({} as Record<string, string>),
              ).map(([platform, url]) => ({ platform, url }) as Social)}
              onUpdate={(socials) => {
                if (!profile) return

                const socialLinksObj = socials.reduce<Record<string, string>>(
                  (acc, { platform, url }) => ({
                    ...acc,
                    [platform]: url,
                  }),
                  {},
                )

                handleProfileUpdate(
                  {
                    meta: {
                      ...profile.UserProfile.meta,
                      socialLinks: socialLinksObj,
                    },
                  },
                  'Social links updated successfully',
                )
              }}
              isPublicView={isPublicView}
              isOwner={isOwner}
            />
          </div>
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
            onUpdate={(updatedSummary) => {
              handleProfileUpdate({
                headline: updatedSummary.title,
                bio: updatedSummary.content,
                meta: {
                  ...profile?.UserProfile.meta,
                  skills: updatedSummary.skills,
                },
              })
            }}
          />
          {process.env.NODE_ENV === 'development' && <ProjectsSection />}
          <ExperienceSection
            experiences={profile?.UserProfile.experience}
            onUpdate={(updatedExperiences) => {
              setProfile({
                ...profile,
                UserProfile: {
                  ...profile.UserProfile,
                  experience: updatedExperiences,
                },
              })

              handleProfileUpdate({
                experience: updatedExperiences.map(
                  ({ id, profileId, createdAt, updatedAt, ...exp }) => ({
                    ...exp,
                    meta: {
                      ...exp.meta,
                      skills: exp.meta.skills,
                    },
                  }),
                ),
              })
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
          />
          <EducationSection
            education={profile?.UserProfile.education}
            onUpdateEducation={(updatedEducation) => {
              if (!profile) return

              setProfile({
                ...profile,
                UserProfile: {
                  ...profile.UserProfile,
                  education: updatedEducation,
                },
              })

              handleProfileUpdate({
                education: updatedEducation?.map(
                  ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
                ),
              })
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
          />
        </div>
      </div>
    </div>
  )
}
