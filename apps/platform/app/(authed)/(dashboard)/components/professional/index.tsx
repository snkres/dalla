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
  Search,
} from 'lucide-react'
import { Button } from '@dalla/design-system'
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
import {
  getAllProjectsProfessionalView,
  GetAllProjectsProfessionalViewRes,
} from '@lib/api/pro/projects'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { getAllSkills } from '@lib/utils/skill-utils'
import { useQueryState } from 'nuqs'
import { useTranslation } from '@hooks/use-translation'
import { cn } from '@dalla/utils'
import { useLocale } from '@hooks/use-locale'

const LIMIT = 4

const getProjectKey = (
  project: GetAllProjectsProfessionalViewRes['data'][0][number],
  index: number,
) => `${project.id}-${index}`

export function ProfessionalHome() {
  const t = useTranslation()
  const { locale } = useLocale()
  const { toast } = useToast()
  const instanceId = useId()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['all-projects', page],
    queryFn: () => getAllProjectsProfessionalView(page, LIMIT),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<
    GetAllProjectsProfessionalViewRes['data'][0] | []
  >([])
  const [showSearchHelp, setShowSearchHelp] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)

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

  const [selectedProjectId, setSelectedProjectId] = useQueryState('projectId', {
    defaultValue: null,
    parse: (value) => value || null,
    history: 'replace',
  })
  const [selectedProject, setSelectedProject] = useState<
    GetAllProjectsProfessionalViewRes['data'][0][number] | null
  >(null)

  useEffect(() => {
    if (data?.data?.[0]?.length && selectedProjectId) {
      const foundProject = data.data[0].find(
        (project) => project.id === selectedProjectId,
      )
      setSelectedProject(foundProject || null)
      if (foundProject) {
        setShowProjectDetail(true)
      }
    } else {
      setSelectedProject(null)
    }
  }, [data, selectedProjectId])

  useEffect(() => {
    if (data?.data?.[1]?.totalCount) {
      setTotalCount(data.data[1].totalCount)
    }
  }, [data])

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
    (projects: GetAllProjectsProfessionalViewRes['data'][0]) => {
      if (!projects) return []
      let sortedProjects = [...projects]
      if (sortBy === 'newest') {
        sortedProjects.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime(),
        )
      } else if (sortBy === 'budget-high') {
        sortedProjects.sort(
          (a, b) => (b.meta.budget || 0) - (a.meta.budget || 0),
        )
      } else if (sortBy === 'budget-low') {
        sortedProjects.sort(
          (a, b) => (a.meta.budget || 0) - (b.meta.budget || 0),
        )
      }
      return sortedProjects
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

      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${currentScrollY}px`

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.position = originalPosition
        document.body.style.width = originalWidth
        document.body.style.top = originalTop
        if (!showProjectDetail && !showProjectApplication) {
          window.scrollTo(0, currentScrollY)
        }
      }
    } else {
      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top
          ? parseInt(document.body.style.top, 10) * -1
          : scrollPosition
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [showProjectDetail, showProjectApplication, scrollPosition])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleProjectClick = useCallback(
    (project: GetAllProjectsProfessionalViewRes['data'][0][number]) => {
      setSelectedProject(project)
      setSelectedProjectId(project.id)
      setShowProjectDetail(true)
      setShowProjectApplication(false)
    },
    [setSelectedProjectId],
  )

  const handleApplyClick = useCallback(() => {
    if (!selectedProject) return
    if (selectedProject.applied) {
      toast({
        title: t.dashboard.professionalHome.alreadyAppliedToastTitle,
        description:
          t.dashboard.professionalHome.alreadyAppliedToastDescription,
        variant: 'default',
      })
      return
    }
    setShowProjectDetail(false)
    setShowProjectApplication(true)
  }, [selectedProject, toast, t])

  const handleBackToDetails = useCallback(() => {
    setShowProjectApplication(false)
    setShowProjectDetail(true)
  }, [])

  const handleCloseAll = useCallback(() => {
    setShowProjectDetail(false)
    setShowProjectApplication(false)
    setSelectedProjectId(null)
  }, [setSelectedProjectId])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }, [refetch])

  const handleProposalSuccess = useCallback(() => {
    setShowProjectApplication(false)
    setSelectedProjectId(null)
    refetch()
    toast({
      title: t.dashboard.professionalHome.proposalSuccessToastTitle,
      description: t.dashboard.professionalHome.proposalSuccessToastDescription,
    })
  }, [refetch, toast, t, setSelectedProjectId])

  const handleProposalError = useCallback(
    (error: Error) => {
      toast({
        title: t.dashboard.professionalHome.proposalErrorToastTitle,
        description:
          error.message ||
          t.dashboard.professionalHome.proposalErrorToastDescription,
        variant: 'destructive',
      })
    },
    [toast, t],
  )

  const clearAllFilters = useCallback(() => {
    setActiveFilter('all')
    setSearchQuery('')
    setSelectedBudgetRange([0, 100000])
    setSelectedDurations([])
    setSelectedLocations([])
    setSelectedSkills([])
    setShowFilterPanel(false)
  }, [])

  const filterOptions = useMemo(
    () => [
      { key: 'all', label: t.dashboard.professionalHome.filterAllProjects },
      {
        key: 'recommended',
        label: t.dashboard.professionalHome.filterRecommended,
      },
      {
        key: 'viewed',
        label: t.dashboard.professionalHome.filterRecentlyViewed,
      },
      { key: 'saved', label: t.dashboard.professionalHome.filterSavedProjects },
      {
        key: 'applied',
        label: t.dashboard.professionalHome.filterMyApplications,
      },
    ],
    [t],
  )

  const sortOptions = useMemo(
    () => [
      {
        key: 'newest' as const,
        label: t.dashboard.professionalHome.sortNewest,
      },
      {
        key: 'budget-high' as const,
        label: t.dashboard.professionalHome.sortBudgetHighLow,
      },
      {
        key: 'budget-low' as const,
        label: t.dashboard.professionalHome.sortBudgetLowHigh,
      },
    ],
    [t],
  )

  const renderSortOption = (
    option: 'newest' | 'budget-high' | 'budget-low',
    label: string,
  ) => (
    <button
      key={option}
      onClick={() => setSortBy(option)}
      className={cn(
        'whitespace-nowrap px-3 py-1 text-sm',
        sortBy === option
          ? 'font-medium text-[#63B7B7]'
          : 'text-gray-600 hover:text-gray-900',
      )}
    >
      {label}
    </button>
  )

  const totalPages = Math.ceil(totalCount / LIMIT)

  return (
    <div
      className="flex flex-col lg:flex-row"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <ProfileSidebar />
      <div className="flex-1 bg-gray-50/50 p-4 lg:ml-[280px] lg:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            handleResetFilters={clearAllFilters}
            budgetRanges={budgetRanges}
            durationOptions={durationOptions}
            locationOptions={locationOptions}
            allSkills={allSkills.map((skill) => skill.name)}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'h-9 bg-white text-xs',
                showFilterPanel ? '!border-[#63B7B7] !text-[#63B7B7]' : '',
              )}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              {t.dashboard.shared.filters}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white"
              onClick={handleRefresh}
              disabled={isRefreshing || isFetching}
            >
              <RefreshCw
                className={cn(
                  'h-4 w-4',
                  isRefreshing || isFetching ? 'animate-spin' : '',
                )}
              />
              <span className="sr-only">
                {t.dashboard.professionalHome.refreshResultsButton}
              </span>
            </Button>
          </div>
        </div>

        <FilterChips
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setShowSearchHelp={setShowSearchHelp}
          showSearchHelp={showSearchHelp}
          filterCategories={filterCategories}
        />

        <div className="mb-5 flex items-center justify-end border-b border-gray-200 pb-2">
          <span className="mr-2 text-sm text-gray-500">
            {t.dashboard.professionalHome.sortByLabel}
          </span>
          {sortOptions.map((opt) => renderSortOption(opt.key, opt.label))}
        </div>

        {hasActiveFilters && (
          <div className="mb-5 flex items-start rounded-lg bg-[#63B7B7]/5 p-3 text-sm text-[#63B7B7]">
            <AlertCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>
              {searchQuery
                ? t.dashboard.shared.showingResultsFor.replace(
                    '{searchQuery}',
                    searchQuery,
                  )
                : t.dashboard.shared.filtersApplied}{' '}
              <button
                onClick={clearAllFilters}
                className="ml-1 font-medium text-[#63B7B7] underline hover:text-[#509a9a]"
              >
                {t.dashboard.shared.clearFilters}
              </button>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {isLoading ? (
            <div className="col-span-full py-10 text-center text-gray-500">
              {t.dashboard.shared.loading}
            </div>
          ) : isError ? (
            <div className="col-span-full rounded-md border border-red-200 bg-red-50 p-4 text-center text-red-700">
              {t.dashboard.shared.errorLoading}
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={getProjectKey(project, index)}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center">
              <Search className="mx-auto mb-3 h-10 w-10 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800">
                {t.dashboard.professionalHome.noProjectsFound}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t.dashboard.professionalHome.noProjectsFoundDescription}
              </p>
            </div>
          )}
        </div>

        {totalCount > LIMIT && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isLoading || isFetching}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t.dashboard.shared.previous}
            </Button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isLoading || isFetching}
            >
              {t.dashboard.shared.next}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showProjectDetail && selectedProject && (
          <ProjectDetail
            projectId={selectedProject.id}
            onClose={handleCloseAll}
            onApplyClick={handleApplyClick}
          />
        )}
        {showProjectApplication && selectedProject && (
          <ApplyProposal project={selectedProject} onClose={handleCloseAll} />
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
