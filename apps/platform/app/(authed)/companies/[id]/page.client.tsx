'use client'

import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { type CompanyProfile, companyMetaAtom } from '@lib/atoms/company/meta'
import { CompanyCard } from './components/company-card'
import {
  getCompanyProfile,
  getOwnCompanyProfile,
  updateCompanyProfile,
} from '@lib/api/company/profile'
import { AboutSection } from './components/about-section'
import { AreasSection } from './components/areas-section'
import { TargetIndustriesSection } from './components/target-section'
import { GoalsSection } from './components/goals-section'
import { ContactInfoCard } from './components/contact-info'
import { globalAtom } from '@lib/atoms/global'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DallaLoading } from '@dallah/components/dalla-loading'

export function CompanyProfileClient({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const isOwner = global.id === id
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data, isLoading } = useQuery({
    queryKey: ['company-profile', id],
    queryFn: () => getCompanyProfile(id),
    enabled: !isOwner,
  })
  const { data: ownProfile, isLoading: ownProfileLoading } = useQuery({
    queryKey: ['own-company-profile', id],
    queryFn: () => getOwnCompanyProfile(),
    enabled: isOwner,
  })
  const profile = isOwner ? ownProfile : data
  const [meta, setMeta] = useAtom(companyMetaAtom)
  const [isPublicView, setIsPublicView] = useQueryState('publicView', {
    defaultValue: false,
    parse: (value) => value === 'true',
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['own-company-profile', id], (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              CompanyProfile: {
                ...oldData.data.data,
                ...updatedData.data?.data,
              },
            },
          },
        }
      })

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

  const handleProfileUpdate = async (
    payload: Partial<CompanyProfile['data']['CompanyProfile']>,
  ) => {
    updateProfileMutation.mutate(payload)
  }

  if (isLoading || ownProfileLoading)
    return (
      <DallaLoading
        title="Loading profile..."
        description="Please wait while we prepare the profile"
      />
    )

  if (!profile) return null

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="relative mt-6 grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
        <aside className="space-y-6 self-start lg:sticky lg:top-6 lg:col-span-1">
          <CompanyCard
            data={{
              industry: profile.data.data.CompanyProfile.meta?.industry,
              verified: profile.data.data.verified,
              logo: profile.data.data.CompanyProfile.logo,
              name: profile.data.data.name,
              size: profile.data.data.CompanyProfile.meta?.size || '',
              location: profile.data.data.CompanyProfile.location,
              website: profile.data.data.CompanyProfile.website,
              rating: 5,
              openProjects:
                profile.data.data?.projects?.filter(
                  (project) => project.status === 'Open',
                ) || [],
              joinedAt: new Date(
                profile.data.data.createdAt,
              ).toLocaleDateString(),
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={(updatedCompany) => {
              handleProfileUpdate({
                location: updatedCompany.location || '',
                meta: {
                  ...profile?.data.data.CompanyProfile.meta,
                  size: updatedCompany.size || '',
                  industry: updatedCompany.industry || '',
                },
              })
            }}
            onTogglePublicView={() => setIsPublicView(!isPublicView)}
          />
          <ContactInfoCard
            data={{
              email: profile.data.data.email,
              website: profile.data.data.CompanyProfile.website,
              location: profile.data.data.CompanyProfile.location,
              socialLinks: profile.data.data.CompanyProfile.meta?.socialLinks,
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={(updatedCompany) => {
              handleProfileUpdate({
                website: updatedCompany.website || '',
                meta: {
                  ...profile?.data.data.CompanyProfile.meta,
                  socialLinks: updatedCompany.socialLinks || {},
                },
              })
            }}
          />
        </aside>
        <main className="space-y-6 lg:col-span-2">
          <AboutSection
            data={{
              name: profile?.data.data.name,
              size: profile?.data.data.CompanyProfile.meta?.size || '',

              industry: profile?.data.data.CompanyProfile.meta?.industry,
              headline: profile?.data.data.CompanyProfile.headline,
              bio: profile?.data.data.CompanyProfile.bio,
              areas: profile?.data.data.CompanyProfile.areas || [],
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={(data) => {
              handleProfileUpdate({
                headline: data.headline,
                bio: data.bio,
                areas: data.areas,
                meta: {
                  ...profile?.data.data.CompanyProfile.meta,
                },
              })
            }}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AreasSection
              areas={profile?.data.data.CompanyProfile.areas || []}
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={(data) => {
                handleProfileUpdate({
                  areas: data.areas,
                })
              }}
            />
            <TargetIndustriesSection
              industries={
                profile?.data.data.CompanyProfile.targetIndustries || []
              }
              isPublicView={isPublicView}
              isOwner={isOwner}
              onUpdate={(data) => {
                handleProfileUpdate({
                  targetIndustries: data.targetIndustries,
                })
              }}
            />
          </div>
          <GoalsSection
            goals={profile?.data.data.CompanyProfile.goals || []}
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
