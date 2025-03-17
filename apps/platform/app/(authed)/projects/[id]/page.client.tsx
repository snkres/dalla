'use client'

import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { ProjectSharedDetails } from './components/shared-details'
import { CompanyProjectView } from './components/company-view'
import { ProfessionalProjectView } from './components/professional-view'

export function ProjectPageClient({ id }: { id: string }) {
  const [global] = useAtom(globalAtom)
  const router = useRouter()
  const isCompany = global.mode === 'company'
  const isProfessional = global.mode === 'user'

  // Fetch project data using the appropriate API based on user role
  const { data, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      // Different endpoints for different roles
      const endpoint = isCompany
        ? `/api/company/projects/${id}`
        : `/api/projects/${id}`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }
      return response.json()
    },
  })

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
        <ProjectSharedDetails project={data} />
      </div>

      <div className="mt-8">
        {isCompany && <CompanyProjectView project={data} />}
        {isProfessional && <ProfessionalProjectView project={data} />}
      </div>
    </div>
  )
}
