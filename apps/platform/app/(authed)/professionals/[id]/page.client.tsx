'use client'

import { ProfileCard } from '../(components)/profile-card'
import { DetailedInfo } from '../(components)/detailed-info'
import { ProExp } from '../(components)/pro-exp'
import { Skills } from '../(components)/skills'
import { Projects } from '../(components)/projects'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { updateProProfile } from '@lib/api/pro/profile'
import { useQueryState } from 'nuqs'
import { getCookie } from 'cookies-next'

export function ProProfileClient({ id }: { id: string }) {
  const isOwner = getCookie('id') === id
  const [profile] = useAtom(proProfileAtom)
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handlePublicViewToggle = (value: boolean) => {
    setIsPublicView(value)
  }

  return (
    <>
      <div className="relative mt-6 grid grid-cols-1 gap-6 pb-6 lg:grid-cols-3">
        <div className="flex max-h-screen flex-col gap-4 overflow-hidden lg:sticky lg:top-16 lg:self-start">
          <ProfileCard
            profileImage={profile?.UserProfile?.avatar}
            name={profile?.name}
            title={profile?.UserProfile?.headline}
            isVerified={profile?.verified}
            isOwner={isOwner}
            yearsOfExperience={profile?.UserProfile?.meta?.yearsOfExperience}
            bio={profile?.UserProfile?.bio}
            onPublicViewToggle={handlePublicViewToggle}
            isPublicView={isPublicView}
            onUpdateProfile={async (updatedProfile) => {
              return await updateProProfile({
                bio: updatedProfile.bio,
                headline: updatedProfile.title,
                education: profile?.UserProfile?.education || [],
                experience: profile?.UserProfile?.experience || [],
                meta: {
                  ...profile?.UserProfile?.meta,
                  yearsOfExperience: updatedProfile.yearsOfExperience || 0,
                },
              })
            }}
          />
          <DetailedInfo
            name={profile?.name}
            email={profile?.email}
            phone={profile?.UserProfile?.meta?.phone}
            location={profile?.UserProfile?.meta?.location}
            designation={profile?.UserProfile?.headline}
            yearsOfExperience={profile?.UserProfile?.meta?.yearsOfExperience}
            isOwner={isOwner && !isPublicView}
          />
        </div>

        <div className="space-y-4 lg:col-span-2">
          {isOwner && !isPublicView && (
            <Projects
              projects={[
                {
                  title: 'Digital Marketing Strategy',
                  description: 'Campaign Development',
                  startDate: 'March 05, 2024',
                  endDate: 'March 05, 2024',
                  status: 'Ongoing',
                  teamMembers: ['John Doe', 'Jane Smith'],
                  progress: 60,
                  teamSize: 2,
                  category: 'Marketing',
                  color: '#FFA500',
                },
                {
                  title: 'Website Redesign',
                  description: 'UI/UX Design',
                  startDate: 'March 05, 2024',
                  endDate: 'March 05, 2024',
                  status: 'Completed',
                  teamMembers: ['John Doe', 'Jane Smith'],
                  progress: 100,
                  teamSize: 2,
                  category: 'Design',
                  color: '#0d0d0d',
                },
              ]}
            />
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProExp
              experiences={profile?.UserProfile?.experience || []}
              education={profile?.UserProfile?.education || []}
            />
            <Skills skills={profile?.UserProfile?.meta?.skills || []} />
          </div>
        </div>
      </div>
    </>
  )
}
