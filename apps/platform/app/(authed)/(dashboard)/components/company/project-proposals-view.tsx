'use client'

import React, { useState } from 'react'

import { motion } from 'motion/react'
import sampleProposals from '@lib/data/sampleProposals'
import ProposalsOverivewModal from './proposals-overivew'
import ProposalDetails from './proposal-details'

interface ProjectProposalsViewProps {
  projectTitle: string
  onBack: () => void
}

export default function ProjectProposalsView({
  projectTitle,
  onBack,
}: ProjectProposalsViewProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [showDetailView, setShowDetailView] = useState(false)

  const handleViewProposal = (proposalId: string) => {
    setSelectedProposal(proposalId)
    setShowDetailView(true)
  }

  const handleCloseProposal = () => {
    setShowDetailView(false)
  }

  const selectedProposalData = selectedProposal
    ? sampleProposals.find((p) => p.id === selectedProposal)
    : null

  return (
    <div className="flex h-full flex-col">
      {showDetailView && selectedProposalData && (
        <ProposalDetails
          handleCloseProposal={handleCloseProposal}
          selectedProposal={selectedProposal}
          sampleProposals={sampleProposals}
        />
      )}
      {!showDetailView && (
        <ProposalsOverivewModal
          projectTitle={projectTitle}
          onBack={onBack}
          handleViewProposal={handleViewProposal}
          sampleProposals={sampleProposals}
        />
      )}
      {(showDetailView || !showDetailView) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 h-full w-full bg-black/10 backdrop-blur-sm"
        />
      )}
    </div>
  )
}
