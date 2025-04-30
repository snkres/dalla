'use client'

import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { ProjectSharedDetails } from './components/shared-details'
import { CompanyProjectView } from './components/company'
import { ProfessionalProjectView } from './components/professional-view'
import { getProject } from '@lib/api/company/projects'
import { Tabs, TabsList, TabsTrigger, Button } from '@dalla/design-system'
import { useState } from 'react'
import { EditProject } from './components/edit-project'
import { useTransitionRouter } from 'next-view-transitions'
import { getProjectProfessionalView } from '@lib/api/pro/projects'
import { DallaLoading } from '@components/shared/dalla-loading'

export function ProjectPageClient({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const router = useTransitionRouter()
  const [activeTab, setActiveTab] =
    useState<(typeof companyTabs)[number]>('overview')
  const [showEditModal, setShowEditModal] = useState(false)
  const isCompany = global.mode === 'company'
  const isProfessional = global.mode === 'user'

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = isCompany ? getProject(id) : getProjectProfessionalView(id)
      return res
    },
  })

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <DallaLoading
          className="mt-64"
          description="Please wait while we load your project..."
        />
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

  const companyTabs = [
    'overview',
    data.status === 'Open' ? 'proposals' : '',
    data.status !== 'Open' ? 'professional' : '',
    'files',
    // 'budget',
  ]
  const professionalTabs = [
    'overview',
    'company',
    'files',
    //  'budget'
  ]
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ProjectSharedDetails
            project={data}
            isCompany={isCompany}
            setShowEditModal={setShowEditModal}
            isAssignedProfessional={data.professional?.id === global?.id}
          />

          {/* <div className="w-full border-t border-gray-200">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue={companyTabs[0] as string}
            >
              <TabsList className="h-12 w-full !justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
                {isCompany
                  ? companyTabs
                      .filter((tab) => tab !== '')
                      .map((tab) => (
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
          </div> */}
        </div>
        {isCompany && (
          <CompanyProjectView
            project={{
              ...data,
              milestones: [
                {
                  order: 1,
                  title: 'Initial Design Phase',
                  description:
                    'Create wireframes and design mockups for the application',
                  price: data.meta?.budget ? data.meta.budget * 0.3 : 3000,
                  timeline: '2 weeks',
                  status: 'Completed',
                  // submission: mockMilestoneSubmissions['milestone-1'],
                },
                {
                  order: 2,
                  title: 'Core Development',
                  description:
                    'Implement the core functionality of the application',
                  price: data.meta?.budget ? data.meta.budget * 0.5 : 5000,
                  timeline: '3 weeks',
                  status: 'Completed',
                  // submission: mockMilestoneSubmissions['milestone-2'],
                },
                {
                  order: 3,
                  title: 'Testing & Deployment',
                  description: 'Final testing, bug fixes, and deployment',
                  price: data.meta?.budget ? data.meta.budget * 0.2 : 2000,
                  timeline: '1 week',
                  status: 'In Progress',
                  // submission: mockMilestoneSubmissions['milestone-3'],
                },
              ],
            }}
          />
        )}
        {isProfessional && (
          <ProfessionalProjectView
            project={data}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
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
