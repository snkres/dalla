'use client'

import { CompanyCard } from './components/company-card'
import { AboutSection } from './components/about-section'
import { AreasSection } from './components/areas-section'
import { TargetIndustriesSection } from './components/target-section'
import { GoalsSection } from './components/goals-section'
import { ContactInfoCard } from './components/contact-info'
import { useCompanyProfile } from './hooks/use-company-profile'
import { DallaLoading } from '@dalla/components/dalla-loading'

export function CompanyProfileClient({ id }: { id: string }) {
  const {
    profile,
    isLoading,
    isOwner,
    handleProfileUpdate,
    isPublicView,
    handleTogglePublicView,
  } = useCompanyProfile({ id })

  if (isLoading) {
    return (
      <DallaLoading
        title="Loading profile..."
        description="Please wait while we prepare the profile"
      />
    )
  }

  if (!profile) return null

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="relative mt-6 grid grid-cols-1 gap-6 pb-10 lg:grid-cols-3">
        <aside className="space-y-6 self-start lg:sticky lg:top-6 lg:col-span-1">
          <CompanyCard
            data={{
              industry: profile.data.CompanyProfile.meta?.industry,
              verified: profile.data.verified,
              logo: profile.data.CompanyProfile.logo,
              name: profile.data.name,
              size: profile.data.CompanyProfile.meta?.size || '',
              location: profile.data.CompanyProfile.location,
              website: profile.data.CompanyProfile.website,
              rating: 5,
              openProjects:
                profile.data?.projects?.filter(
                  (project: any) => project.status === 'Open',
                ) || [],
              joinedAt: new Date(profile.data.createdAt).toLocaleDateString(),
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={(updatedCompany) => {
              handleProfileUpdate({
                location: updatedCompany.location || '',
                meta: {
                  ...profile?.data.CompanyProfile.meta,
                  size: updatedCompany.size || '',
                  industry: updatedCompany.industry || '',
                },
              })
            }}
            onTogglePublicView={handleTogglePublicView}
          />
          <ContactInfoCard
            data={{
              email: profile.data.email,
              website: profile.data.CompanyProfile.website,
              location: profile.data.CompanyProfile.location,
              socialLinks: profile.data.CompanyProfile.meta?.socialLinks,
            }}
            isOwner={isOwner}
            isPublicView={isPublicView}
            onUpdate={(updatedCompany) => {
              handleProfileUpdate({
                website: updatedCompany.website || '',
                meta: {
                  ...profile?.data.CompanyProfile.meta,
                  socialLinks: updatedCompany.socialLinks || {},
                },
              })
            }}
          />
        </aside>
        <main className="space-y-6 lg:col-span-2">
          <AboutSection
            data={{
              name: profile?.data.name,
              size: profile?.data.CompanyProfile.meta?.size || '',
              industry: profile?.data.CompanyProfile.meta?.industry,
              headline: profile?.data.CompanyProfile.headline,
              bio: profile?.data.CompanyProfile.bio,
              areas: profile?.data.CompanyProfile.areas || [],
            }}
            isPublicView={isPublicView}
            isOwner={isOwner}
            onUpdate={(data) => {
              handleProfileUpdate({
                headline: data.headline,
                bio: data.bio,
                areas: data.areas,
                meta: {
                  ...profile?.data.CompanyProfile.meta,
                },
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
