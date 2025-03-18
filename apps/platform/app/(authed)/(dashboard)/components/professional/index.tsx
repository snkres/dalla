'use client'

import type React from 'react'

import { useState, useEffect, useCallback, useMemo, useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  AlertCircle,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { SearchBar } from './search-bar'
import { ProjectCard } from './project/card'
import { ProjectDetail } from './project/detail'
import { ApplyProposal } from './proposal'
import { ProfileSidebar } from './sidebar'
import {
  filterCategories,
  budgetRanges,
  durationOptions,
  locationOptions,
} from '@lib/data/projects'
import { applyFilters } from '@lib/utils/filter-utils'

import FilterChips from './filter-chips'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects, GetAllProjectsRes } from '@lib/api/pro/projects'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { getAllSkills } from '@lib/utils/skill-utils'

const LIMIT = 4

export function ProfessionalHome() {
  const { toast } = useToast()
  const instanceId = useId()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  // Enhanced query with loading state and refetch capability
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['all-projects', page],
    queryFn: () => getAllProjects(page, LIMIT),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<
    GetAllProjectsRes['data'][0] | []
  >([])
  const [showSearchHelp, setShowSearchHelp] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [selectedProject, setSelectedProject] = useState<
    GetAllProjectsRes['data'][0][number] | null
  >(null)
  const [showProjectDetail, setShowProjectDetail] = useState(false)
  const [showProjectApplication, setShowProjectApplication] = useState(false)
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<
    [number, number]
  >([0, 100000])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sortBy, setSortBy] = useState<'newest' | 'budget-high' | 'budget-low'>(
    'newest',
  )

  const allSkills = useMemo(() => {
    return getAllSkills(data?.data?.[0] || []) || []
  }, [data])

  const hasActiveFilters = useMemo(
    () =>
      activeFilter !== 'all' ||
      searchQuery !== '' ||
      selectedBudgetRange[0] !== 0 ||
      selectedBudgetRange[1] !== 100000 ||
      selectedDurations.length > 0 ||
      selectedLocations.length > 0 ||
      selectedSkills.length > 0,
    [
      activeFilter,
      searchQuery,
      selectedBudgetRange,
      selectedDurations,
      selectedLocations,
      selectedSkills,
    ],
  )

  const sortProjects = useCallback(
    (projects: GetAllProjectsRes['data'][0]) => {
      if (sortBy === 'newest') {
        return [...projects].sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime(),
        )
      } else if (sortBy === 'budget-high') {
        return [...projects].sort(
          (a, b) => (b.meta.budget || 0) - (a.meta.budget || 0),
        )
      } else if (sortBy === 'budget-low') {
        return [...projects].sort(
          (a, b) => (a.meta.budget || 0) - (b.meta.budget || 0),
        )
      }
      return projects
    },
    [sortBy],
  )

  useEffect(() => {
    let results = applyFilters(
      data?.data?.[0] || [],
      activeFilter,
      searchQuery,
      showFilterPanel,
      selectedBudgetRange,
      selectedDurations,
      selectedLocations,
      selectedSkills,
    )

    results = sortProjects(results)

    setFilteredProjects(results)
  }, [
    activeFilter,
    searchQuery,
    showFilterPanel,
    selectedBudgetRange,
    selectedDurations,
    selectedLocations,
    selectedSkills,
    data,
    sortBy,
    sortProjects,
  ])

  useEffect(() => {
    if (showProjectDetail || showProjectApplication) {
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      const originalOverflow = document.body.style.overflow
      const originalPosition = document.body.style.position
      const originalWidth = document.body.style.width
      const originalTop = document.body.style.top
      const originalHeight = document.body.style.height

      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.height = '100%'

      return () => {
        if (!showProjectDetail && !showProjectApplication) {
          document.body.style.overflow = originalOverflow
          document.body.style.position = originalPosition
          document.body.style.width = originalWidth
          document.body.style.top = originalTop
          document.body.style.height = originalHeight

          window.scrollTo(0, currentScrollY)
        }
      }
    }
  }, [showProjectDetail, showProjectApplication])

  useEffect(() => {
    if (data?.data?.[1]?.totalCount) {
      setTotalCount(data.data[1].totalCount)
    }
  }, [data])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleProjectClick = useCallback(
    (project: GetAllProjectsRes['data'][0][number], e: React.MouseEvent) => {
      e.preventDefault()
      setSelectedProject(project)
      setShowProjectDetail(true)
      setShowProjectApplication(false)
    },
    [],
  )

  const handleApplyClick = useCallback(() => {
    if (selectedProject?.applied) {
      toast({
        title: 'Already Applied',
        description: "You've already submitted a proposal for this project.",
        variant: 'default',
      })
      return
    }

    setShowProjectDetail(false)
    setShowProjectApplication(true)
  }, [selectedProject, toast])

  const handleBackToDetails = useCallback(() => {
    setShowProjectApplication(false)
    setShowProjectDetail(true)
  }, [])

  const handleCloseAll = useCallback(() => {
    const scrollY = document.body.style.top
      ? Number.parseInt(document.body.style.top.replace('px', '')) * -1
      : scrollPosition

    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('height')

    setShowProjectDetail(false)
    setShowProjectApplication(false)
    setSelectedProject(null)

    setTimeout(() => {
      window.scrollTo(0, scrollY)
    }, 10)
  }, [scrollPosition])

  const handleResetFilters = useCallback(() => {
    setSelectedBudgetRange([0, 100000])
    setSelectedDurations([])
    setSelectedLocations([])
    setSelectedSkills([])
  }, [])

  const clearAllFilters = useCallback(() => {
    setActiveFilter('all')
    setSearchQuery('')
    handleResetFilters()
  }, [handleResetFilters])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refetch()
      toast({
        title: 'Projects Updated',
        description: 'Successfully refreshed the latest projects.',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Refresh Failed',
        description: 'Unable to load the latest projects. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [refetch, toast])

  const renderSortOption = (
    option: 'newest' | 'budget-high' | 'budget-low',
    label: string,
  ) => (
    <Button
      key={`sort-${option}`}
      size="sm"
      className={`!rounded-md px-3 py-1 text-sm ${
        sortBy === option
          ? '!bg-[#234d64] text-white'
          : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'
      }`}
      onClick={() => setSortBy(option)}
    >
      {label}
    </Button>
  )

  const getProjectKey = useCallback(
    (project: GetAllProjectsRes['data'][0][number], index: number) => {
      return project.id
        ? `project-${project.id}`
        : `project-${instanceId}-${index}`
    },
    [instanceId],
  )

  const totalPages = Math.ceil(totalCount / LIMIT)

  return (
    <div className="w-full py-6">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Available Projects
              </h1>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing || isFetching}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading || isRefreshing || isFetching ? 'animate-spin text-[#234d64]' : ''}`}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </Button>
            </div>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilterPanel={showFilterPanel}
              setShowFilterPanel={setShowFilterPanel}
              showSearchHelp={showSearchHelp}
              setShowSearchHelp={setShowSearchHelp}
              selectedBudgetRange={selectedBudgetRange}
              setSelectedBudgetRange={setSelectedBudgetRange}
              selectedDurations={selectedDurations}
              setSelectedDurations={setSelectedDurations}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedSkills={selectedSkills}
              // setSelectedSkills={setSelectedSkills}
              handleResetFilters={handleResetFilters}
              budgetRanges={budgetRanges}
              durationOptions={durationOptions}
              locationOptions={locationOptions}
              allSkills={allSkills.map((skill) => skill.name)}
            />
            <FilterChips
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setShowSearchHelp={setShowSearchHelp}
              showSearchHelp={showSearchHelp}
              filterCategories={filterCategories}
            />

            <div className="mb-4 mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredProjects.length} projects
                {activeFilter !== 'all' &&
                  ` • Filtered by: ${filterCategories.find((f) => f.key === activeFilter)?.label}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
                {selectedSkills.length > 0 &&
                  ` • Skills: ${selectedSkills.length} selected`}
              </p>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-500"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                )}

                <div className="ml-2 flex items-center gap-1">
                  <span className="text-sm text-gray-700">Sort:</span>
                  <div className="flex gap-1">
                    {renderSortOption('newest', 'Newest')}
                    {renderSortOption('budget-high', 'Budget ↓')}
                    {renderSortOption('budget-low', 'Budget ↑')}
                  </div>
                </div>
              </div>
            </div>

            {isLoading || isRefreshing ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-${instanceId}-${i}`}
                    className="h-64 animate-pulse rounded-xl bg-gray-100"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-xl bg-gray-50 p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-red-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Error loading projects
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500">
                  We encountered an error while loading projects. Please try
                  again.
                </p>
                <Button
                  onClick={() => refetch()}
                  className="!bg-[#234d64] hover:!bg-[#234d64]/90"
                >
                  Retry
                </Button>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={getProjectKey(project, index)}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-gray-50 p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No projects found
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500">
                  We couldn&apos;t find any projects matching your search
                  criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="!bg-[#234d64] hover:!bg-[#234d64]/90"
                >
                  Clear Filters & Search
                </Button>
              </div>
            )}

            {filteredProjects.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex w-full items-center justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1 || isLoading || isRefreshing}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = page
                    if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isLoading || isRefreshing}
                          className={`h-10 w-10 ${page === pageNum ? '!bg-[#234d64] text-white' : ''}`}
                        >
                          {pageNum}
                        </Button>
                      )
                    }
                    return null
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages || isLoading || isRefreshing}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <ProfileSidebar />
        </div>
      </div>

      <AnimatePresence>
        {showProjectDetail && selectedProject && (
          <ProjectDetail
            projectId={selectedProject.id}
            onClose={handleCloseAll}
            onApplyClick={handleApplyClick}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProjectApplication && selectedProject && (
          <ApplyProposal
            project={selectedProject}
            onClose={handleBackToDetails}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showProjectDetail || showProjectApplication) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={handleCloseAll}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
