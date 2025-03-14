'use client'
import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'motion/react'
import {
  Calendar,
  Clock,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  X,
  FileText as DocumentIcon,
} from 'lucide-react'

import { Loader2 } from 'lucide-react'
import { getAllProposals, GetAllProposalsRes } from '@lib/api/pro/proposals'
import Overview from './overview'
import TabContainer from './tab-container'
import ProposalList from './proposal-list'
import ProposalDetails from './proposal-details'
import FloatingButtons from './floating-buttons'
import { cn } from '@dallah/utils'

const getTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7)
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`
  } else {
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
  }
}

const mapStatus = (
  status: string | undefined,
): GetAllProposalsRes['data'][0][number]['status'] => {
  if (!status) return 'Submitted'

  switch (status.toLowerCase()) {
    case 'viewed':
      return 'Viewed'
    case 'interviewing':
      return 'Interviewing'
    case 'in review':
    case 'in_review':
      return 'In review'
    default:
      return 'Submitted'
  }
}

// Helper functions for data transformation
const formatAmount = (budget: any): string => {
  if (budget === undefined || budget === null) return '$0'
  const numericBudget =
    typeof budget === 'string' ? Number.parseFloat(budget) : Number(budget)
  return isNaN(numericBudget) ? '$0' : `$${numericBudget.toLocaleString()}`
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ProfessionalProposals() {
  const {
    data: proposals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['proposals', 'professional'],
    queryFn: getAllProposals,
  })
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProposal, setSelectedProposal] = useState<
    GetAllProposalsRes['data'][0][number] | null
  >(null)
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isMobile, setIsMobile] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Filter proposals based on active tab
  const activeProposals = useMemo(() => {
    if (!proposals) return []
    return proposals?.data[0].filter((proposal) =>
      ['In review', 'Interviewing'].includes(proposal.status),
    )
  }, [proposals])

  const submittedProposals = useMemo(() => {
    if (!proposals) return []
    return proposals?.data[0].filter((proposal) =>
      ['Pending', 'Viewed'].includes(proposal.status),
    )
  }, [proposals])

  const sortProposals = (proposals: GetAllProposalsRes['data'][0]) => {
    return [...proposals].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return sortOrder === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc'
          ? a.project.meta.budget - b.project.meta.budget
          : b.project.meta.budget - a.project.meta.budget
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.project.title.localeCompare(b.project.title)
          : b.project.title.localeCompare(a.project.title)
      }
      return 0
    })
  }

  const filterProposals = (proposals: GetAllProposalsRes['data'][0]) => {
    if (!searchQuery) return proposals
    return proposals.filter(
      (proposal) =>
        proposal.project.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        proposal.project.company.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
  }

  const getVisibleProposals = useMemo(() => {
    const proposals =
      activeTab === 'active'
        ? activeProposals
        : activeTab === 'submitted'
          ? submittedProposals
          : []
    return sortProposals(filterProposals(proposals || []))
  }, [
    activeTab,
    searchQuery,
    sortBy,
    sortOrder,
    activeProposals,
    submittedProposals,
  ])

  const viewProposalDetails = (
    proposal: GetAllProposalsRes['data'][0][number],
  ) => {
    setSelectedProposal(proposal)
    if (isMobile) {
      setIsDetailOpen(true)
    }
  }

  const closeProposalDetails = () => {
    setIsDetailOpen(false)
  }

  const handleSort = (field: 'date' | 'amount' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#63B7B7]" />
        <span className="ml-2 text-gray-600">Loading proposals...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Error Loading Proposals
          </h2>
          <p className="text-red-500">
            {error instanceof Error
              ? error.message
              : 'An unknown error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl rounded-2xl bg-white !py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Your Proposals
        </h1>
        <p className="text-gray-600">
          Track and manage your submitted applications and client interactions
        </p>
      </motion.div>

      <Overview
        totalProposals={proposals?.data[0].length || 0}
        totalConversions={activeProposals?.length || 0}
        conversionRate={
          (proposals?.data?.[0]?.length || 0) > 0
            ? (activeProposals?.length ||
                0 / (proposals?.data?.[0]?.length || 0)) * 100
            : 0
        }
        averageResponseTime={3} // Placeholder value
        averageConversionTime={7} // Placeholder value
      />

      <TabContainer
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeProposals={activeProposals}
        submittedProposals={submittedProposals}
        isMobile={isMobile}
        isDetailOpen={isDetailOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        viewType="professional"
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <ProposalList
            proposals={getVisibleProposals}
            selectedProposal={selectedProposal}
            onSelectProposal={viewProposalDetails}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        {(isMobile && isDetailOpen) || !isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={cn(
              'w-full lg:w-1/3',
              isMobile ? 'fixed inset-0 z-50 m-0' : '',
            )}
          >
            {isMobile && selectedProposal && (
              <AnimatePresence>
                {isDetailOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      'w-full overflow-hidden rounded-xl bg-white shadow-lg lg:col-span-1',
                      isMobile ? 'fixed inset-0 z-50 m-0' : '',
                    )}
                  >
                    {/* <ProposalDetails
                      proposalId={String(selectedProposal.id)}
                      projectId={selectedApiProposal?.project?.id}
                      isMobile={isMobile}
                      onClose={() => setIsDetailOpen(false)}
                    /> */}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {/* Desktop layout */}
            {/* <div className="hidden lg:block">
              {selectedProposal ? (
                <ProposalDetails
                  proposalId={String(selectedProposal.id)}
                  projectId={selectedApiProposal?.}
                  isMobile={false}
                  onClose={() => setIsDetailOpen(false)}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                  <div>
                    <DocumentIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="mb-2 text-lg font-medium">
                      No proposal selected
                    </h3>
                    <p className="text-sm text-gray-500">
                      Select a proposal from the list to view its details
                    </p>
                  </div>
                </div>
              )}
            </div> */}
          </motion.div>
        ) : null}
      </div>
      <FloatingButtons />
    </div>
  )
}
