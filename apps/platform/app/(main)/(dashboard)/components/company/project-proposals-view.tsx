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

  console.log(proposalsData)

  const [showDetailView, setShowDetailView] = useState(false)

  const handleViewProposal = (proposalId: string) => {
    setSelectedProposalId(proposalId)
    setShowDetailView(true)
  }

  const handleCloseProposal = () => {
    setShowDetailView(false)
  }

  return (
    <>
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
    </>
  )
}
