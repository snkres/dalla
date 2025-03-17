'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import ProposalsOverivewModal from './proposals-overivew'
import ProposalDetails from './proposal-details'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'

interface ProjectProposalsViewProps {
  projectTitle: string
  onBack: () => void
  proposals: GetAllCompanyProjectsRes['data'][0][number]['proposals']
}

export default function ProjectProposalsView({
  projectTitle,
  onBack,
  proposals,
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

  return (
    <div className="flex h-full flex-col">
      {showDetailView && selectedProposal && (
        <ProposalDetails
          handleCloseProposal={handleCloseProposal}
          selectedProposal={selectedProposal}
          proposals={proposals || []}
        />
      )}
      {!showDetailView && (
        <ProposalsOverivewModal
          projectTitle={projectTitle}
          onBack={onBack}
          handleViewProposal={handleViewProposal}
          proposals={proposals || []}
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
