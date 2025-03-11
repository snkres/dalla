'use client'

import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import {
  type CompanyProfile,
  companyProfileAtom,
} from '@lib/atoms/company/profile'
import { CompanyCard } from './components/company-card'
import { updateCompanyProfile } from '@lib/api/company/profile'
import { AboutSection } from './components/about-section'
import { AreasSection } from './components/areas-section'
import { TargetIndustriesSection } from './components/target-section'
import { GoalsSection } from './components/goals-section'
import { ContactInfoCard } from './components/contact-info'
import { globalAtom } from '@lib/atoms/global'

export function CompanyProfileClient({ name }: { name: string }) {
  const [global] = useAtom(globalAtom)
  const isOwner = global.name?.replace(/\s+/g, '') === name?.replace(/\s+/g, '')

  const [profile, setProfile] = useAtom(companyProfileAtom)
  const { toast } = useToast()
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handleProfileUpdate = async (
    updateData: Partial<CompanyProfile['CompanyProfile']>,
    successMessage = 'Profile updated successfully',
  ) => {
    try {
      const { industry, size, type, phone, socialLinks, ...directFields } =
        updateData as any

      const metaUpdates = {
        ...(industry && { industry }),
        ...(size && { size }),
        ...(type && { type }),
        ...(phone && { phone }),
        ...(socialLinks && { socialLinks }),
      }

      const apiPayload: any = { ...directFields }

      if (Object.keys(metaUpdates).length > 0) {
        apiPayload.meta = {
          ...(profile?.CompanyProfile?.meta || {}),
          ...metaUpdates,
        }
      }

      await updateCompanyProfile(apiPayload)

      setProfile({
        ...profile,
        CompanyProfile: {
          ...profile.CompanyProfile,
          ...directFields,
          meta: {
            ...(profile?.CompanyProfile?.meta || {}),
            ...metaUpdates,
          },
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
    <div className="container mx-auto max-w-7xl px-4">
      <div className="relative mt-6 grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
        <aside className="space-y-6 self-start lg:sticky lg:top-6 lg:col-span-1">
          <CompanyCard
            data={{
              industry: profile?.CompanyProfile?.meta?.industry,
              verified: profile?.verified,
              logo: profile?.CompanyProfile?.logo,
              name: profile?.name,
              size: profile?.CompanyProfile?.meta?.size,
              location: profile?.CompanyProfile?.location,
              website: profile?.CompanyProfile?.website,
              rating: profile?.CompanyProfile?.meta?.rating,
              joinedAt: new Date(profile.createdAt).toLocaleDateString(),
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={handleProfileUpdate}
            onTogglePublicView={() => setIsPublicView(!isPublicView)}
          />
          <ContactInfoCard
            data={{
              email: profile?.email,
              website: profile?.CompanyProfile?.website,
              location: profile?.CompanyProfile?.location,
              socialLinks: profile?.CompanyProfile?.meta?.socialLinks,
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={handleProfileUpdate}
          />
        </aside>
        <main className="space-y-6 lg:col-span-2">
          <AboutSection
            data={{
              name: profile?.name,
              size: profile?.CompanyProfile?.meta?.size,
              industry: profile?.CompanyProfile?.meta?.industry,
              headline: profile?.CompanyProfile?.headline,
              bio: profile?.CompanyProfile?.bio,
              areas: profile?.CompanyProfile?.areas || [],
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={handleProfileUpdate}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AreasSection
              areas={profile?.CompanyProfile?.areas || []}
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={handleProfileUpdate}
            />
            <TargetIndustriesSection
              industries={profile?.CompanyProfile?.targetIndustries || []}
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={handleProfileUpdate}
            />
          </div>
          <GoalsSection
            goals={profile?.CompanyProfile?.goals || []}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={handleProfileUpdate}
          />
        </main>
      </div>
    </div>
  )
}
