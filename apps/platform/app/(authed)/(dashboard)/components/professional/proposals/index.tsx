'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@dallah/utils'
import { Proposal } from '@lib/types/proposals'
import Overview from './overview'
import TabContainer from './tab-container'
import ProposalList from './proposal-list'
import ProposalDetails from './proposal-details'
import FloatingButtons from './floating-buttons'
import submittedProposals from './submitted-proposals'
import activeProposals from './active-proposals'

export function ProfessionalProposals() {
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  )
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

  const sortProposals = (proposals: Proposal[]) => {
    return [...proposals].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc'
          ? a.bidAmount - b.bidAmount
          : b.bidAmount - a.bidAmount
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      }
      return 0
    })
  }

  const filterProposals = (proposals: Proposal[]) => {
    if (!searchQuery) return proposals
    return proposals.filter(
      (proposal) =>
        proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proposal.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proposal.clientName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const getVisibleProposals = useMemo(() => {
    const proposals =
      activeTab === 'active'
        ? activeProposals
        : activeTab === 'submitted'
          ? submittedProposals
          : []
    return sortProposals(filterProposals(proposals))
  }, [activeTab, searchQuery, sortBy, sortOrder])

  const viewProposalDetails = (proposal: Proposal) => {
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
        totalProposals={activeProposals.length + submittedProposals.length}
        totalConversions={0}
        conversionRate={0}
        averageResponseTime={0}
        averageConversionTime={0}
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
            <ProposalDetails
              proposal={selectedProposal}
              isMobile={isMobile}
              onClose={closeProposalDetails}
            />
          </motion.div>
        ) : null}
      </div>
      <FloatingButtons />
    </div>
  )
}
