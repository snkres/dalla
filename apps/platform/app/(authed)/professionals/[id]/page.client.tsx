'use client'

import { ProfileCard } from './components/profile-card'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { updateProProfile } from '@lib/api/pro/profile'
import { useQueryState } from 'nuqs'
import { getCookie } from 'cookies-next'
import ProfileSummary from './components/profile-summary'

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
              availability: 'Available',
              rating: null,
              projectCompletion: null,
            }}
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
          />
          {/* <ProjectsSection /> */}
          {/* <ExperienceSection /> */}
          {/* <EducationSection /> */}
        </div>
      </div>
    </div>
  )
}
