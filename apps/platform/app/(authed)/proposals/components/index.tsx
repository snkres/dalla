'use client'
import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'motion/react'
import { FileText as DocumentIcon } from 'lucide-react'

import { Loader2 } from 'lucide-react'
import {
  getAllProposals,
  GetAllProposalsRes,
  ProposalStatus,
} from '@lib/api/pro/proposals'
import Overview from './overview'
import TabContainer from './tab-container'
import ProposalList from './proposal-list'
import ProposalDetails from './proposal-details'
import FloatingButtons from './floating-buttons'
import { cn } from '@dalla/utils'

import { DallaLoading } from '@components/shared/dalla-loading'

export function ProfessionalProposals() {
  const {
    data: proposals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['proposals', 'professional'],
    queryFn: () => getAllProposals(1, 10),
  })

  const [activeTab, setActiveTab] = useState<ProposalStatus>('Pending')
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

  const activeProposals = useMemo(() => {
    if (!proposals) return []
    return proposals?.data[0].filter((proposal) =>
      ['Pending', 'Accepted', 'Rejected'].includes(proposal.status),
    )
  }, [proposals])

  const submittedProposals = useMemo(() => {
    if (!proposals) return []
    return proposals?.data[0].filter((proposal) =>
      ['Pending'].includes(proposal.status),
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
    const visibleProposals =
      activeTab === 'Accepted'
        ? proposals?.data[0].filter(
            (proposal) => proposal.status === 'Accepted',
          )
        : activeTab === 'Pending'
          ? proposals?.data[0].filter(
              (proposal) => proposal.status === 'Pending',
            )
          : proposals?.data[0].filter(
              (proposal) => proposal.status === 'Rejected',
            )
    return sortProposals(filterProposals(visibleProposals || []))
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
      <DallaLoading
        className="mt-64"
        description="Please wait while we load your proposals..."
      />
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

      <Overview />

      <TabContainer
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as ProposalStatus)}
        isMobile={isMobile}
        isDetailOpen={isDetailOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        viewType="professional"
        proposals={proposals?.data[0] || []}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <ProposalList
            proposals={getVisibleProposals}
            selectedProposal={selectedProposal}
            onSelectProposal={viewProposalDetails}
            selectedTab={activeTab}
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
                    <ProposalDetails
                      proposalId={String(selectedProposal.id)}
                      projectId={selectedProposal?.project?.id}
                      isMobile={isMobile}
                      onClose={() => setIsDetailOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <div className="hidden lg:block">
              {selectedProposal ? (
                <ProposalDetails
                  proposalId={String(selectedProposal.id)}
                  projectId={selectedProposal?.project?.id}
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
            </div>
          </motion.div>
        ) : null}
      </div>
      <FloatingButtons />
    </div>
  )
}
