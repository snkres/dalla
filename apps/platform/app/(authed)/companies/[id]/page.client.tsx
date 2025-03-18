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

export function CompanyProfileClient({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const isOwner = global.id === id
  console.log(id, global.id)
  const [profile, setProfile] = useAtom(companyProfileAtom)
  const { toast } = useToast()
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const handleProfileUpdate = async (
    updateData: Partial<CompanyProfile['data']['CompanyProfile']>,
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
          ...(profile?.data?.CompanyProfile?.meta || {}),
          ...metaUpdates,
        }
      }

      await updateCompanyProfile(apiPayload)

      setProfile({
        ...profile,
        data: {
          ...profile.data,
          CompanyProfile: {
            ...profile.data.CompanyProfile,
            ...directFields,
            meta: {
              ...(profile?.data?.CompanyProfile?.meta || {}),
              ...metaUpdates,
            },
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
              industry: profile?.data.CompanyProfile.meta?.industry,
              verified: profile?.data.verified,
              logo: profile?.data.CompanyProfile.logo,
              name: profile?.data.name,
              size: profile?.data.CompanyProfile.meta?.size,
              location: profile?.data.CompanyProfile.location,
              website: profile?.data.CompanyProfile.website,
              rating: 5,
              joinedAt: new Date(profile.data.createdAt).toLocaleDateString(),
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={handleProfileUpdate}
            onTogglePublicView={() => setIsPublicView(!isPublicView)}
          />
          <ContactInfoCard
            data={{
              email: profile?.data.email,
              website: profile?.data.CompanyProfile.website,
              location: profile?.data.CompanyProfile.location,
              socialLinks: profile?.data.CompanyProfile.meta?.socialLinks,
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={handleProfileUpdate}
          />
        </aside>
        <main className="space-y-6 lg:col-span-2">
          <AboutSection
            data={{
              name: profile?.data.name,
              size: profile?.data.CompanyProfile.meta?.size,
              industry: profile?.data.CompanyProfile.meta?.industry,
              headline: profile?.data.CompanyProfile.headline,
              bio: profile?.data.CompanyProfile.bio,
              areas: profile?.data.CompanyProfile.areas || [],
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={(data) => {
              handleProfileUpdate({
                // ...profile?.data.CompanyProfile,
                headline: data.headline,
                bio: data.bio,
                areas: data.areas,
              })
            }}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AreasSection
              areas={profile?.data.CompanyProfile.areas || []}
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={(data) => {
                handleProfileUpdate({
                  // ...profile?.data.CompanyProfile,
                  areas: data.areas,
                })
              }}
            />
            <TargetIndustriesSection
              industries={profile?.data.CompanyProfile.targetIndustries || []}
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={(data) => {
                handleProfileUpdate({
                  // ...profile?.data.CompanyProfile,
                  targetIndustries: data.targetIndustries,
                })
              }}
            />
          </div>
          <GoalsSection
            goals={profile?.data.CompanyProfile.goals || []}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={(data) => {
              handleProfileUpdate({
                goals: data.goals,
              })
            }}
          />
        </main>
      </div>
    </div>
  )
}
