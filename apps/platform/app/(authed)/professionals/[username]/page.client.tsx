'use client'

import { ProfileCard } from './components/profile-card'
import { useAtom } from 'jotai'
import { proMetaAtom, ProProfile } from '@lib/atoms/pro/meta'
import {
  createShowCaseProject,
  getOwnProProfile,
  getProProfile,
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DallaLoading } from '@dallah/components/dalla-loading'

export function ProProfileClient({ username }: { username: string }) {
  const [global] = useAtom(globalAtom)
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
  const { toast } = useToast()
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const profile = isOwner ? ownProfile?.data : proProfile?.data

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

  const createProjectMutation = useMutation({
    mutationFn: ({ proId, projectData }: { proId: string; projectData: any }) =>
      createShowCaseProject(proId, projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['own-pro-profile', username] })
    },
    onError: (error) => {
      console.error('Failed to create project:', error)
    },
  })

  const updateProjectMutation = useMutation({
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

  if (isLoading || ownProfileLoading)
    return (
      <DallaLoading
        title="Loading profile..."
        description="Please wait while we prepare the profile"
      />
    )
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
              profileMutation.mutate({
                meta: {
                  ...profile?.data?.meta,
                  hourlyRate: updatedProfile.hourlyRate || 0,
                  totalEarned: updatedProfile.totalEarned || 0,
                  projectsCompleted: updatedProfile.projectsCompleted || 0,
                  successRate: updatedProfile.successRate || 0,
                  weeklyAvailability:
                    String(updatedProfile.weeklyAvailability) || '0',
                  availability: updatedProfile.availability,
                  projectCompletion: updatedProfile.projectCompletion || '',
                },
                education: [
                  ...(ownProfile?.data.data.education || []).map(
                    ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                      cleanedEntry,
                  ),
                ],
                experience: [
                  ...(ownProfile?.data.data.experience || []).map(
                    ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                      cleanedEntry,
                  ),
                ],
              })
            }}
          />
          <div className="mx-auto flex max-w-5xl flex-col gap-5">
            <LanguagesSection
              languages={profile?.data?.meta?.languages ?? {}}
              onUpdate={(languages) => {
                const languagesObj = Object.entries(languages).reduce(
                  (acc, [language, proficiency]) => ({
                    ...acc,
                    [language]: proficiency,
                  }),
                  {},
                )

                profileMutation.mutate({
                  meta: {
                    ...profile?.data?.meta,
                    languages: languagesObj,
                  },
                  education: [
                    ...(ownProfile?.data.data.education || []).map(
                      ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                        cleanedEntry,
                    ),
                  ],
                  experience: [
                    ...(ownProfile?.data.data.experience || []).map(
                      ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                        cleanedEntry,
                    ),
                  ],
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

                profileMutation.mutate({
                  meta: {
                    ...profile?.data?.meta,
                    socialLinks: socialLinksObj,
                  },
                  education: [
                    ...(ownProfile?.data.data.education || []).map(
                      ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                        cleanedEntry,
                    ),
                  ],
                  experience: [
                    ...(ownProfile?.data.data.experience || []).map(
                      ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                        cleanedEntry,
                    ),
                  ],
                })
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
              profileMutation.mutate({
                headline: updatedSummary.title,
                bio: updatedSummary.content,
                meta: {
                  ...profile?.data?.meta,
                  skills: updatedSummary.skills,
                },
                education: ownProfile?.data.data.education.map(
                  ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                    cleanedEntry,
                ),
                experience: ownProfile?.data.data.experience.map(
                  ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                    cleanedEntry,
                ),
              })
            }}
          />
          <ProjectsSection
            projects={profile?.data?.projects || []}
            proId={profile?.data?.User?.id || ''}
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
                    await updateProjectMutation.mutateAsync({
                      proId: ownProfile?.data.data.User.id || '',
                      projectId: project.id,
                      projectData,
                    })

                    finalProjects.push({
                      id: project.id,
                      ...projectData,
                    })
                  } else {
                    try {
                      const response = await createProjectMutation.mutateAsync({
                        proId: profile?.data?.User?.id,
                        projectData,
                      })

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

                toast({
                  title: 'Projects updated successfully',
                  description: 'Your projects have been updated successfully',
                })
              } catch (error) {
                console.error('Failed to update projects:', error)
                console.log(error)
                toast({
                  title: 'Update failed',
                  description: 'There was a problem updating your projects',
                  variant: 'destructive',
                })
              }
            }}
          />
          <ReviewsSection projects={profile?.data?.User.projects || []} />
          <ExperienceSection
            experiences={profile?.data?.experience || []}
            onUpdate={(updatedExperiences) => {
              const cleanedExp = updatedExperiences.map(
                ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                  cleanedEntry,
              )
              profileMutation.mutate({
                experience: [...cleanedExp],
                education: ownProfile?.data.data.education.map(
                  ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                    cleanedEntry,
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

              const cleanedEducation = updatedEducation.map(
                ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                  cleanedEntry,
              )

              profileMutation.mutate({
                education: [...cleanedEducation],
                experience: ownProfile?.data.data.experience.map(
                  ({ profileId, createdAt, updatedAt, ...cleanedEntry }) =>
                    cleanedEntry,
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
