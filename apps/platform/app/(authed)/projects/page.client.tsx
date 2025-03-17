'use client'

import { useAtom } from 'jotai'
import { useState } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@dallah/design-system'
import { PlusCircle, Briefcase, Search, Loader2 } from 'lucide-react'
import { Input } from '@dallah/design-system'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { ProjectFilters } from './components/filters'
import { ProjectsList } from './components/projects-list'
import { getAllProjects } from '@lib/api/company/projects'

const LIMIT = 10
export function ProjectsPageClient() {
  const [global] = useAtom(globalAtom)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const isCompany = global.mode === 'company'
  const isProfessional = global.mode === 'user'

  // Search and filter states
  const [searchQuery, setSearchQuery] = useQueryState('q', { defaultValue: '' })
  const [skillFilter, setSkillFilter] = useQueryState('skills', {
    defaultValue: '',
  })
  const [budgetFilter, setBudgetFilter] = useQueryState('budget', {
    defaultValue: '',
  })
  const [statusFilter, setStatusFilter] = useQueryState('status', {
    defaultValue: '',
  })

  // Fetch projects data
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'projects',
      searchQuery,
      skillFilter,
      budgetFilter,
      statusFilter,
    ],
    queryFn: async () => {
      // Build query string from filters

      // Different endpoints based on user role
      return getAllProjects(page, LIMIT)
    },
  })

  const clearAllFilters = () => {
    setSearchQuery('')
    setSkillFilter('')
    setBudgetFilter('')
    setStatusFilter('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the query state
  }
  console.log(data)

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white pb-6 pt-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {isCompany ? 'Manage Projects' : 'Explore Projects'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isCompany
                  ? 'Post and manage your projects to find the perfect professionals'
                  : 'Discover projects that match your skills and expertise'}
              </p>
            </div>

            {isCompany && (
              <Button
                className="!bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90"
                onClick={() => router.push('/dashboard?addProject=true')}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            )}
          </div>

          <div className="mt-6">
            <form onSubmit={handleSearch} className="flex w-full gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects by keyword, title, or skill..."
                  className="w-full pl-10"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="!bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <ProjectFilters
              skillFilter={skillFilter}
              setSkillFilter={setSkillFilter}
              budgetFilter={budgetFilter}
              setBudgetFilter={setBudgetFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              clearAllFilters={clearAllFilters}
            />
          </div>

          {/* Projects list */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex h-60 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#63B7B7]" />
              </div>
            ) : error ? (
              <div className="rounded-xl bg-red-50 p-8 text-center">
                <h3 className="mb-2 text-lg font-medium text-red-800">
                  Error loading projects
                </h3>
                <p className="text-sm text-red-600">
                  {(error as Error).message}
                </p>
                <Button
                  onClick={() => clearAllFilters()}
                  className="mt-4 bg-red-100 text-red-800 hover:bg-red-200"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <ProjectsList
                projects={data?.[0] || []}
                isCompany={isCompany}
                isProfessional={isProfessional}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
