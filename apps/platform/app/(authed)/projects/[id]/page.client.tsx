'use client'

import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { ProjectSharedDetails } from './components/shared-details'
import { CompanyProjectView } from './components/company-view'
import { getProject } from '@lib/api/company/projects'
import { Tabs, TabsList, TabsTrigger, Button } from '@dallah/design-system'
import { useState } from 'react'
import { EditProject } from './components/edit-project'
import { useTransitionRouter } from 'next-view-transitions'

const companyTabs = ['overview', 'professional', 'files', 'budget']
const professionalTabs = ['overview', 'company', 'team', 'files', 'budget']

export function ProjectPageClient({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const router = useTransitionRouter()
  const [activeTab, setActiveTab] =
    useState<(typeof companyTabs)[number]>('overview')
  const [showEditModal, setShowEditModal] = useState(false)
  const isCompany = global.mode === 'company'
  const isProfessional = global.mode === 'user'

  // Fetch project data using the appropriate API based on user role
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      return getProject(id)
    },
  })

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#63B7B7]" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="my-8 flex flex-col items-center justify-center rounded-lg bg-red-50 p-8 text-center">
        <h2 className="mb-2 text-lg font-medium text-red-800">
          Error loading project
        </h2>
        <p className="text-sm text-red-600">
          {error ? (error as Error).message : 'Project not found'}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ProjectSharedDetails
            project={data}
            isCompany={isCompany}
            setShowEditModal={setShowEditModal}
          />
          <div className="w-full border-t border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-12 w-full !justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
                {isCompany
                  ? companyTabs.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="h-12 !rounded-none border-b-2 border-transparent bg-transparent px-6 text-sm capitalize text-gray-600 data-[state=active]:border-[#63B7B7] data-[state=active]:font-medium data-[state=active]:text-[#1D8489]"
                      >
                        {tab}
                      </TabsTrigger>
                    ))
                  : professionalTabs.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="h-12 !rounded-none border-b-2 border-transparent bg-transparent px-6 text-sm capitalize text-gray-600 data-[state=active]:border-[#63B7B7] data-[state=active]:font-medium data-[state=active]:text-[#1D8489]"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        {isCompany && (
          <CompanyProjectView
            project={data}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        {/* {isProfessional && (
          <ProfessionalProjectView
            project={data}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )} */}
      </div>

      {showEditModal && (
        <EditProject
          project={data}
          onClose={() => setShowEditModal(false)}
          onProjectUpdated={() => {
            refetch()
            setShowEditModal(false)
          }}
        />
      )}
    </div>
  )
}
