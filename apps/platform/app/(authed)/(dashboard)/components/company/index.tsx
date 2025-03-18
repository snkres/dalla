'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  AlertCircle,
  Search,
  Filter,
  Info,
  X,
  Users,
  BookOpen,
  Clock,
  Award,
  ArrowUpRight,
} from 'lucide-react'
import { Button, Input } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { ProjectsOverview } from './projects-overview'
import { Sidebar } from './sidebar'
import { AddProject } from './add-project'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@lib/api/company/projects'

import { ConsultantDetail } from 'app/(authed)/(dashboard)/components/company/professional-detail'
import { parseAsBoolean, useQueryState } from 'nuqs'
import {
  getAllProfessionals,
  GetAllProfessionalsRes,
} from '@lib/api/company/professionals'
import { ProfessionalCard } from './professional-card'

const LIMIT = 6
export default function CompanyHome() {
  const [page, setPage] = useState(1)
  const [filteredProfessionals, setFilteredProfessionals] = useState<
    GetAllProfessionalsRes['data'][0]
  >([])
  const [selectedProfessional, setSelectedProfessional] = useState<
    GetAllProfessionalsRes['data'][0][number] | null
  >(null)
  const { data: professionals, isFetched: professionalsFetched } = useQuery({
    queryKey: ['professionals', page],
    queryFn: () => getAllProfessionals(page, LIMIT),
  })
  const [showAddProject, setShowAddProject] = useQueryState(
    'startProject',
    parseAsBoolean,
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [showProfessionalDetail, setShowProfessionalDetail] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const {
    data: projectsOverviewData,
    refetch: refetchProjectsOverview,
    isLoading: projectsOverviewLoading,
  } = useQuery({
    queryKey: ['projects', page, 'company'],
    queryFn: () => getAllProjects(page, 5),
  })

  useEffect(() => {
    if (professionals?.data[0]) {
      setFilteredProfessionals(professionals.data[0])
    }
  }, [professionalsFetched])

  const filterOptions = [
    {
      key: 'all',
      label: 'All Consultants',
      icon: <Users className="mr-1.5 h-3.5 w-3.5" />,
    },
    {
      key: 'available',
      label: 'Available Now',
      icon: <Clock className="mr-1.5 h-3.5 w-3.5" />,
    },
    {
      key: 'topRated',
      label: 'Top Rated',
      icon: <Award className="mr-1.5 h-3.5 w-3.5" />,
    },
    {
      key: 'recent',
      label: 'Recently Active',
      icon: <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />,
    },
    {
      key: 'saved',
      label: 'Saved Profiles',
      icon: <BookOpen className="mr-1.5 h-3.5 w-3.5" />,
    },
  ]

  useEffect(() => {
    if (!professionals?.data[0]) return

    let results = [...(professionals.data[0] || [])]

    if (searchQuery) {
      results = results.filter(
        (consultant) =>
          consultant.User.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          consultant.meta.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          consultant.meta.location
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    }

    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'available':
          results = results.filter((c) => c.meta.availability === 'Available')
          break
        case 'topRated':
          results = results.filter((c) => c.meta.successRate >= 4.8)
          break
        case 'recent':
          // In a real app, you'd filter by last active date
          results = results.slice(0, 3)
          break
        case 'saved':
          // In a real app, you'd have a saved list
          results = results.filter((_, i) => i % 2 === 0)
          break
      }
    }

    setFilteredProfessionals(results as GetAllProfessionalsRes['data'][0])
  }, [searchQuery, activeFilter, professionals])

  const handleProfessionalClick = (
    professional: GetAllProfessionalsRes['data'][0][number],
  ) => {
    setSelectedProfessional(professional)
    setShowProfessionalDetail(true)
  }

  const handleCloseDetail = () => {
    setShowProfessionalDetail(false)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setActiveFilter('all')
  }

  return (
    <div>
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:max-w-[1350px]">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProjectsOverview
              onPostJob={() => setShowAddProject(true)}
              projects={projectsOverviewData?.data.data[0] || []}
              isLoading={projectsOverviewLoading}
              onHireConsultant={() => {
                /* Scroll to consultant list or navigate */
              }}
            />

            <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-medium text-gray-900">
                    Find Consultants
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Discover and connect with top talent for your projects
                  </p>
                </div>
                <Button
                  className="h-9 !bg-[#63B7B7] !text-sm hover:!bg-[#63B7B7]/90"
                  onClick={() => setShowAddProject(true)}
                >
                  <Users className="mr-1.5 h-4 w-4" />
                  Start a Project
                </Button>
              </div>
              <div className="relative">
                <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <div className="relative flex flex-grow items-center">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by skill, expertise, or location..."
                      className="h-10 w-full border-0 py-2 pl-9 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'mx-1 my-1 h-8 rounded-md px-3 text-xs',
                      showFilterPanel
                        ? '!bg-[#63B7B7]/10 !text-[#63B7B7]'
                        : '!bg-gray-50 !text-gray-600',
                    )}
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                  >
                    <Filter className="mr-1.5 h-3.5 w-3.5" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-6 p-4 shadow-sm">
              <div className="scrollbar-hide flex overflow-x-auto pb-1">
                {filterOptions.map((option) => (
                  <Button
                    key={option.key}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'mr-2 flex h-8 items-center whitespace-nowrap rounded-full px-3 text-xs',
                      activeFilter === option.key
                        ? 'bg-[#63B7B7] text-white'
                        : 'bg-[#63B7B7]/5 text-gray-700 hover:bg-[#63B7B7]/10',
                    )}
                    onClick={() => setActiveFilter(option.key)}
                  >
                    {option.icon}
                    <span className="font-medium">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            {searchQuery && (
              <div className="mb-5 flex items-start rounded-lg bg-[#63B7B7]/5 p-3 text-sm text-[#63B7B7]">
                <Info className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p>
                      Showing results for{' '}
                      <strong>&quot;{searchQuery}&quot;</strong>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 rounded-full p-0 text-gray-400 hover:text-gray-600"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {filteredProfessionals.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProfessionals.map((professional) => (
                    <ProfessionalCard
                      key={professional.userId}
                      professional={professional}
                      onClick={() => handleProfessionalClick(professional)}
                    />
                  ))}
                </div>

                <div className="mt-4 flex w-full items-center justify-between gap-2">
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
                      {
                        length: Math.ceil(
                          (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                        ),
                      },
                      (_, i) => {
                        // Show pages around current page
                        let pageNum = page
                        if (page <= 3) {
                          pageNum = i + 1
                        } else if (
                          page >=
                          Math.ceil(
                            (professionals?.data[1]?.totalCount ?? 0) / LIMIT -
                              2,
                          )
                        ) {
                          pageNum =
                            Math.ceil(
                              (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                            ) -
                            4 +
                            i
                        } else {
                          pageNum = page - 2 + i
                        }

                        // Ensure page numbers are within valid range
                        if (
                          pageNum > 0 &&
                          pageNum <=
                            Math.ceil(
                              (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                            )
                        ) {
                          return (
                            <Button
                              key={pageNum}
                              variant={page === pageNum ? 'default' : 'outline'}
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
                    onClick={() =>
                      setPage(
                        Math.min(
                          professionals?.data[1]?.totalCount ?? 0,
                          page + 1,
                        ),
                      )
                    }
                    disabled={page === professionals?.data[1]?.totalCount ?? 0}
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
              </>
            ) : (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No consultants found
                </h3>
                <p className="mx-auto mb-5 max-w-md text-sm text-gray-500">
                  We couldn&apos;t find any consultants matching your search
                  criteria. Try adjusting your search or filters.
                </p>
                <Button
                  className="h-9 bg-[#63B7B7] text-sm hover:bg-[#63B7B7]/90"
                  onClick={clearFilters}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      {showProfessionalDetail && selectedProfessional && (
        <>
          <AnimatePresence mode="wait">
            <ConsultantDetail
              key={`consultant-detail-${selectedProfessional.userId}`}
              username={selectedProfessional.User.username}
              onClose={handleCloseDetail}
            />
          </AnimatePresence>

          <motion.div
            key="consultant-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={handleCloseDetail}
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {showAddProject && (
          <AddProject
            key="add-project-modal"
            onClose={() => setShowAddProject(false)}
            onProjectCreated={() => {
              refetchProjectsOverview()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
