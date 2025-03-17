'use client'

import { ProfileCard } from './components/profile-card'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import {
  createShowCaseProject,
  updateProProfile,
  updateShowCaseProject,
} from '@lib/api/pro/profile'
import { useQueryState } from 'nuqs'
import ProfileSummary from './components/profile-summary'
import { ProjectsSection } from './components/projects-section'
import { ExperienceSection } from './components/exp-section'
import { EducationSection } from './components/edu-section'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { LanguagesSection } from './components/langs-section'
import { SocialsSection } from './components/socials-section'
import { Language, Social, ShowcaseProject } from '@lib/types/profile'
import { VerificationsSection } from './components/verifications-section'
import { globalAtom } from '@lib/atoms/global'
import { ReviewsSection } from './components/reviews-section'

export function ProProfileClient({ username }: { username: string }) {
  const [global] = useAtom(globalAtom)
  const isOwner = global.username === username
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
        education: profile?.data?.education?.map(
          ({ id, profileId, createdAt, updatedAt, ...edu }) => edu,
        ),
        experience: profile?.data?.experience?.map(
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
        data: {
          ...profile.data,
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
              name: profile?.data?.User.name,
              avatar: profile?.data?.avatar,
              title: profile?.data?.headline,
              hourlyRate: Number(profile?.data?.meta['hourlyRate']) || null,
              totalEarned: Number(profile?.data?.meta['totalEarned']) || null,
              projectsCompleted:
                Number(profile?.data?.meta['projectsCompleted']) || null,
              successRate: Number(profile?.data?.meta['successRate']) || null,
              weeklyAvailability:
                Number(profile?.data?.meta['weeklyAvailability']) || null,
              availability: profile?.data?.meta['availability'],
              rating: Number(profile?.data?.meta['rating']) || null,
              projectCompletion:
                profile?.data?.meta['projectCompletion'] || null,
              isVerified: profile?.data?.User.verified,
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onTogglePublicView={
              isOwner ? () => setIsPublicView(!isPublicView) : undefined
            }
            onUpdate={(updatedProfile) => {
              handleProfileUpdate({
                meta: {
                  ...profile?.data?.meta,
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
              languages={profile?.data?.meta?.['languages'] ?? []}
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
                    ...profile?.data?.meta,
                    languages: languagesObj,
                  },
                })
              }}
              isPublicView={isPublicView}
              isOwner={isOwner}
            />
            <VerificationsSection
              isEmailVerified={profile?.data?.User.verified}
              isPublicView={isPublicView}
              isOwner={isOwner}
            />
            <SocialsSection
              socials={Object.entries(
                profile?.data?.meta?.socialLinks ||
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
                      ...profile?.data?.meta,
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
              title: profile?.data?.headline,
              content: profile?.data?.bio,
              skills: profile?.data?.meta['skills'] || [],
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={(updatedSummary) => {
              handleProfileUpdate({
                headline: updatedSummary.title,
                bio: updatedSummary.content,
                meta: {
                  ...profile?.data?.meta,
                  skills: updatedSummary.skills,
                },
              })
            }}
          />
          <ProjectsSection
            projects={profile?.data?.projects || []}
            proId={profile?.data?.id || ''}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={async (updatedProjects) => {
              try {
                const finalProjects: typeof profile.data.User.projects = []

                for (const project of updatedProjects) {
                  const projectData = {
                    title: project.title,
                    role: project.role,
                    description: project.description,
                    skills: project.skills,
                    thumbnail: project.thumbnail || '',
                    link: project.link || '',
                    media: project.media || [],
                  }

                  if (project.id) {
                    await updateShowCaseProject(
                      profile?.data?.id,
                      project.id,
                      projectData,
                    )

                    finalProjects.push({
                      id: project.id,
                      ...projectData,
                    })
                  } else {
                    try {
                      const response = await createShowCaseProject(
                        profile?.data?.id,
                        projectData,
                      )

                      const newProject = response.data.data

                      finalProjects.push({
                        id: newProject.id,
                        title: newProject.title,
                        role: newProject.role,
                        description: newProject.description,
                        skills: newProject.meta.skills,
                        thumbnail: newProject.thumbnail,
                        link: newProject.link,
                        media: newProject.media,
                      })
                    } catch (error) {
                      console.error('Failed to create project:', error)
                    }
                  }
                }

                setProfile({
                  ...profile,
                  data: {
                    ...profile.data,
                    projects: finalProjects,
                  },
                })

                toast({
                  title: 'Projects updated successfully',
                  description: 'Your projects have been updated successfully',
                })
              } catch (error) {
                console.error('Failed to update projects:', error)
                toast({
                  title: 'Update failed',
                  description: 'There was a problem updating your projects',
                  variant: 'destructive',
                })
              }
            }}
          />
          <ReviewsSection />
          <ExperienceSection
            experiences={profile?.data?.experience || []}
            onUpdate={(updatedExperiences) => {
              setProfile({
                ...profile,
                data: {
                  ...profile.data,
                  experience: updatedExperiences,
                },
              })

              handleProfileUpdate({
                experience: updatedExperiences.map(
                  ({
                    id,
                    profileId,
                    createdAt,
                    updatedAt,
                    ...exp
                  }: {
                    id: string
                    profileId: string
                    createdAt: Date
                    updatedAt: Date
                    meta: { skills: any }
                    [key: string]: any
                  }) => ({
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
            education={profile?.data?.education || []}
            onUpdateEducation={(updatedEducation) => {
              if (!profile) return

              setProfile({
                ...profile,
                data: {
                  ...profile.data,
                  education: updatedEducation,
                },
              })

              handleProfileUpdate({
                education: updatedEducation?.map(
                  ({
                    id,
                    profileId,
                    createdAt,
                    updatedAt,
                    ...edu
                  }: {
                    id: string
                    profileId: string
                    createdAt: string
                    updatedAt: string
                    school: string
                    degree: string
                    field: string
                    startDate: string
                    endDate: string
                    description: string
                  }) => edu,
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
