'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@dallah/design-system'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@dallah/design-system'
import { useQueryState } from 'nuqs'
import { ProjectFilters } from '../filters'
import { ProjectsList } from './projects-list'
import { getAllProjectsProfessionalView } from '@lib/api/pro/projects'
import { useTransitionRouter } from 'next-view-transitions'
import { getAllProposals } from '@lib/api/pro/proposals'

const LIMIT = 10

export function ProfessionalProjectsView() {
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => parseInt(value, 10),
    serialize: (value) => value.toString(),
  })

  // Search and filter states
  const [searchQuery, setSearchQuery] = useQueryState('q', { defaultValue: '' })

  // Fetch projects data
  const { data, isLoading, error } = useQuery({
    queryKey: ['proposals', searchQuery, page],
    queryFn: async () => {
      return getAllProposals(page, LIMIT).then((res) => res.data)
    },
  })

  const totalPages = Math.ceil((data?.[1]?.totalCount || 0) / LIMIT)

  const clearAllFilters = () => {
    setSearchQuery('')
    setPage(1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1) // Reset to first page on new search
  }

  return (
    <div className="bg-gray-50 pb-12">
      <div className="bg-white pb-6 pt-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My Projects
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                View your applied and current projects
              </p>
            </div>
          </div>

          {/* <div className="mt-6">
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
          </div> */}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filters sidebar
          <div className="lg:col-span-1">
            <ProjectFilters clearAllFilters={clearAllFilters} />
          </div> */}
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
              <>
                <ProjectsList
                  projects={
                    data?.[0].map((proposal) => ({
                      ...proposal.project,
                      appliedAt: proposal.createdAt,
                      proposalStatus: proposal.status,
                    })) || []
                  }
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-left"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          // Show pages around current page
                          let pageNum = page
                          if (page <= 3) {
                            pageNum = i + 1
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = page - 2 + i
                          }

                          // Ensure page numbers are within valid range
                          if (pageNum > 0 && pageNum <= totalPages) {
                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  page === pageNum ? 'default' : 'outline'
                                }
                                onClick={() => setPage(pageNum)}
                                className={`h-10 w-10 ${page === pageNum ? '!bg-[#63B7B7] text-white' : ''}`}
                              >
                                {pageNum}
                              </Button>
                            )
                          }
                          return null
                        },
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="flex items-center gap-1"
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
