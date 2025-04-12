import { parseAsBoolean, useQueryState } from 'nuqs'
import {
  getAllProfessionals,
  GetAllProfessionalsRes,
} from '@lib/api/company/professionals'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@lib/api/company/projects'
import { Users, Clock, Award, ArrowUpRight, BookOpen } from 'lucide-react'

// Constants
const LIMIT = 6

// Types
type Professional = GetAllProfessionalsRes['data'][0][number]
type ProfessionalList = GetAllProfessionalsRes['data'][0]

// Filter options
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

export const useCompanyDashboard = () => {
  // Pagination state
  const [page, setPage] = useState(1)

  // Professional state
  const [filteredProfessionals, setFilteredProfessionals] =
    useState<ProfessionalList>([])
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null)
  const [showProfessionalDetail, setShowProfessionalDetail] = useState(false)

  // UI state
  const [showAddProject, setShowAddProject] = useQueryState(
    'startProject',
    parseAsBoolean,
  )
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Queries
  const { data: professionals, isFetched: professionalsFetched } = useQuery({
    queryKey: ['professionals', page],
    queryFn: () => getAllProfessionals(page, LIMIT),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  })

  const {
    data: projectsOverviewData,
    refetch: refetchProjectsOverview,
    isLoading: projectsOverviewLoading,
  } = useQuery({
    queryKey: ['projects', 'overview'],
    queryFn: () => getAllProjects(1, 5),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })

  // Effects
  useEffect(() => {
    if (professionals?.data[0]) {
      setFilteredProfessionals(professionals.data[0])
    }
  }, [professionalsFetched])

  useEffect(() => {
    if (!professionals?.data[0]) return
    setFilteredProfessionals(
      applyFilters(professionals.data[0], searchQuery, activeFilter),
    )
  }, [searchQuery, activeFilter, professionals])

  // Filter logic
  function applyFilters(
    professionals: ProfessionalList,
    query: string,
    filter: string,
  ): ProfessionalList {
    let results = [...professionals]

    // Apply search query filter
    if (query) {
      results = results.filter(
        (consultant) =>
          consultant.User.name.toLowerCase().includes(query.toLowerCase()) ||
          consultant.meta.skills.some((skill) =>
            skill.toLowerCase().includes(query.toLowerCase()),
          ) ||
          consultant.meta.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply category filter
    if (filter !== 'all') {
      switch (filter) {
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

    return results
  }

  // Handler functions
  const handleProfessionalClick = (professional: Professional) => {
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

  return {
    // Pagination
    page,
    setPage,
    LIMIT,

    // Projects data
    projectsOverviewData,
    projectsOverviewLoading,
    refetchProjectsOverview,

    // Professionals data
    professionals,
    professionalsFetched,
    filteredProfessionals,

    // Professional detail
    selectedProfessional,
    showProfessionalDetail,
    handleProfessionalClick,
    handleCloseDetail,

    // UI controls
    showAddProject,
    setShowAddProject,
    showFilterPanel,
    setShowFilterPanel,

    // Filters
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filterOptions,
    clearFilters,
  }
}
