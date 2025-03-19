'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

import ProposalsOverivewModal from './proposals-overivew'
import ProposalDetails from './proposal-details'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'

interface ProjectProposalsViewProps {
  projectTitle: string
  onBack: () => void
}

export default function ProjectProposalsView({
  projectTitle,
  onBack,
}: ProjectProposalsViewProps) {
  const queryClient = useQueryClient()
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  )
  const proposalsData = queryClient
    .getQueryData<
      AxiosResponse<GetAllCompanyProjectsRes, any>
    >(['projects', 'overview'])
    ?.data.data[0].find((p) => p.title === projectTitle)?.proposals

  const [showDetailView, setShowDetailView] = useState(false)

  const handleViewProposal = (proposalId: string) => {
    setSelectedProposalId(proposalId)
    setShowDetailView(true)
  }

  const handleCloseProposal = () => {
    setShowDetailView(false)
  }

  return (
    <div className="flex h-full flex-col">
      {showDetailView && selectedProposalId && (
        <ProposalDetails
          handleCloseProposal={handleCloseProposal}
          selectedProposalId={selectedProposalId}
        />
      )}
      {!showDetailView && (
        <ProposalsOverivewModal
          projectTitle={projectTitle}
          onBack={onBack}
          handleViewProposal={handleViewProposal}
          proposals={proposalsData || []}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 h-full w-full bg-black/10 backdrop-blur-sm"
      />
    </div>
  )
}
