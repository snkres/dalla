import { useState, useEffect, useCallback, useMemo, useId } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { getAllSkills } from '@lib/utils/skill-utils'
import { useQueryState } from 'nuqs'
import { applyFilters } from '@lib/utils/filter-utils'
import {
  getAllProjectsProfessionalView,
  type GetAllProjectsProfessionalViewRes,
} from '@lib/api/pro/projects'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@dalla/design-system'

const LIMIT = 4

export function useProfessionalDashboard() {
  const { toast } = useToast()
  const instanceId = useId()

  // Data fetching state
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Project data query
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['all-projects', page],
    queryFn: () => getAllProjectsProfessionalView(page, LIMIT),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })

  // UI state
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchHelp, setShowSearchHelp] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sortBy, setSortBy] = useState<'newest' | 'budget-high' | 'budget-low'>(
    'newest',
  )

  // Filter state
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<
    [number, number]
  >([0, 100000])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  // Project detail state
  const [showProjectDetail, setShowProjectDetail] = useState(false)
  const [showProjectApplication, setShowProjectApplication] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useQueryState('projectId', {
    defaultValue: null,
    parse: (value) => value || null,
  })

  // Filtered project results
  const [filteredProjects, setFilteredProjects] = useState<
    GetAllProjectsProfessionalViewRes['data'][0] | []
  >([])

  // Derived project state
  const [selectedProject, setSelectedProject] = useState<
    GetAllProjectsProfessionalViewRes['data'][0][number] | null
  >(data?.data[0].find((project) => project.id === selectedProjectId) || null)

  // Extract all skills from projects
  const allSkills = useMemo(() => {
    return getAllSkills(data?.data?.[0] || []) || []
  }, [data])

  // Check if any filters are active
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

  // Update selected project when projectId changes
  useEffect(() => {
    setSelectedProject(
      data?.data[0].find((project) => project.id === selectedProjectId) || null,
    )
  }, [selectedProjectId, data])

  // Show project detail when projectId is set
  useEffect(() => {
    if (selectedProjectId && data?.data?.[0]?.length) {
      setShowProjectDetail(true)
    }
  }, [selectedProjectId, data])

  // Handle body scrolling when modal is open
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

  // Update total count when data changes
  useEffect(() => {
    if (data?.data?.[1]?.totalCount) {
      setTotalCount(data.data[1].totalCount)
    }
  }, [data])

  // Sort projects handler
  const sortProjects = useCallback(
    (projects: GetAllProjectsProfessionalViewRes['data'][0]) => {
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

  // Apply filters and sorting when dependencies change
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

  // Action handlers
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleProjectClick = useCallback(
    (
      project: GetAllProjectsProfessionalViewRes['data'][0][number],
      e: React.MouseEvent,
    ) => {
      e.preventDefault()
      setSelectedProject(project)
      setSelectedProjectId(project.id)
      setShowProjectDetail(true)
      setShowProjectApplication(false)
    },
    [setSelectedProjectId],
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
    setSelectedProjectId(null)

    setTimeout(() => {
      window.scrollTo(0, scrollY)
    }, 10)
  }, [scrollPosition, setSelectedProjectId])

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

  // UI helpers
  const renderSortOption = useCallback(
    (option: 'newest' | 'budget-high' | 'budget-low', label: string) => (
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
    ),
    [sortBy],
  )

  const getProjectKey = useCallback(
    (
      project: GetAllProjectsProfessionalViewRes['data'][0][number],
      index: number,
    ) => {
      return project.id
        ? `project-${project.id}`
        : `project-${instanceId}-${index}`
    },
    [instanceId],
  )

  const totalPages = Math.ceil(totalCount / LIMIT)

  return {
    // Data
    filteredProjects,
    allSkills,
    selectedProject,
    totalPages,
    LIMIT,

    // Loading states
    isLoading,
    isRefreshing,
    isFetching,
    isError,
    refetch,

    // Pagination
    page,
    handlePageChange,

    // Search & filters
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    hasActiveFilters,
    showFilterPanel,
    setShowFilterPanel,
    showSearchHelp,
    setShowSearchHelp,
    selectedBudgetRange,
    setSelectedBudgetRange,
    selectedDurations,
    setSelectedDurations,
    selectedLocations,
    setSelectedLocations,
    selectedSkills,
    setSelectedSkills,

    // Actions
    handleRefresh,
    handleResetFilters,
    clearAllFilters,
    handleProjectClick,
    handleApplyClick,
    handleBackToDetails,
    handleCloseAll,

    // UI state
    showProjectDetail,
    showProjectApplication,
    instanceId,

    // UI helpers
    renderSortOption,
    getProjectKey,
  }
}
