'use client'

import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { getCookie } from 'cookies-next'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { companyProfileAtom } from '@lib/atoms/company/profile'
import { CompanyCard } from '../components/company-card'
import { updateCompanyProfile } from '@lib/api/company/profile'

export function CompanyProfileClient({ name }: { name: string }) {
  const isOwner = getCookie('name') === name
  const [profile, setProfile] = useAtom(companyProfileAtom)
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

      // Prepare the API payload with the correct structure
      const apiPayload: Partial<{
        location: string
        website: string
        meta: {
          size: string
          type: string
          phone: string
          industry: string
          socialLinks: {
            url: string
            name: string
          }
        }
      }> = {}

      // Map fields to the correct structure
      if (updateData.location) {
        apiPayload.location = updateData.location
      }

      if (updateData.website) {
        apiPayload.website = updateData.website
      }

      // Handle meta fields
      apiPayload.meta = {
        ...(profile?.CompanyProfile?.meta || {}),
        ...(updateData.industry && { industry: updateData.industry }),
        ...(updateData.size && { size: updateData.size }),
        ...(updateData.type && { type: updateData.type }),
        ...(updateData.phone && { phone: updateData.phone }),
        ...(updateData.socialLinks && { socialLinks: updateData.socialLinks }),
      }

      await updateCompanyProfile(apiPayload)

      // Update local state
      setProfile({
        ...profile,
        CompanyProfile: {
          ...profile.CompanyProfile,
          ...(updateData.location && { location: updateData.location }),
          ...(updateData.website && { website: updateData.website }),
          meta: {
            ...profile.CompanyProfile.meta,
            ...(updateData.industry && { industry: updateData.industry }),
            ...(updateData.size && { size: updateData.size }),
            ...(updateData.type && { type: updateData.type }),
            ...(updateData.phone && { phone: updateData.phone }),
            ...(updateData.socialLinks && {
              socialLinks: updateData.socialLinks,
            }),
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
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={handleProfileUpdate}
            onTogglePublicView={() => setIsPublicView(!isPublicView)}
          />
          {/* <ContactInfoCard /> */}
        </aside>
        <main className="space-y-6 lg:col-span-2">
          {/* <AboutSection /> */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* <AreasSection /> */}
            {/* <TargetIndustriesSection /> */}
          </div>
          {/* <GoalsSection /> */}
        </main>
      </div>
    </div>
  )
}
