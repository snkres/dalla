'use client'

import { reviewMilestone, type GetProjectRes } from '@lib/api/company/projects'
import { useState } from 'react'
import ProposalDetailModal from '../proposal-detail-modal'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { CompanyProjectMilestones } from './milestones'
import { CompanyProjectAssigned } from './assigned'
import { CompanyProjectProposals } from './proposals'
import { CompanyProjectBudgetOverview } from './budget-overview'
import { CompanyProjectFiles } from './files'
import type { ReviewSubmission, Milestone } from '@lib/types/project'
import { CompanyAllInOneSubmission } from './all-in-one-submission'

// Base type for proposals listed directly under the project (e.g., for selection)
type BaseProposal = GetProjectRes['data']['proposals'][number]

// Define the type for the specific proposal associated with the assigned professional
// Based on the linter error, its structure seems to be:
interface ProfessionalProposal {
  id: string
  projectId: string
  professionalId: string
  type: 'MilestoneBased' | 'AllInOne' // Use types from error message
  description: string
  price: number
  timeline: string
  media: string[]
  status: 'Pending' | 'Rejected' | 'Accepted'
  createdAt: string
  updatedAt: string
  deletedAt: any // Consider using 'null | string' or a more specific type if possible
  milestones: Milestone[] // This seems to be present based on the error
  submissions?: any[] // Replace 'any' with the actual Submission type from all-in-one-submission.tsx if possible
}
// Note: This no longer extends BaseProposal as their structures differ.

// We don't need EnhancedMilestone here anymore if using the correct Milestone type
/*
export interface EnhancedMilestone {
  id: string
  title: string
  description: string
  price: number
  timeline: string
  order: number
  status: 'Completed' | 'In Progress' | 'Pending'
  submission?: {
    id: string
    milestoneId: string
    description: string
    submittedAt: string
    status: string
    media: string[]
    comments: {
      id: string
      author: string
      authorName: string
      text: string
      createdAt: string
    }[]
  }
}
*/

export function CompanyProjectView({
  project,
}: {
  project: GetProjectRes['data']
}) {
  // selectedProposal should remain BaseProposal as it refers to the list
  const [selectedProposal, setSelectedProposal] = useState<BaseProposal | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Use the specific ProfessionalProposal type for the assigned proposal
  const professionalProposal = project.professional?.proposals?.[0] as
    | ProfessionalProposal
    | undefined

  // Ensure milestones are accessed safely from the professional's proposal
  const milestonesFromProfessional: Milestone[] | undefined =
    professionalProposal?.milestones

  const [activeMilestone, setActiveMilestone] = useState<number | null>(() => {
    // Use 'MilestoneBased' for the check
    if (
      professionalProposal?.type === 'MilestoneBased' &&
      milestonesFromProfessional
    ) {
      return (
        milestonesFromProfessional.find((m) => m.status === 'Pending')?.order ??
        null
      )
    }
    return null
  })

  // Determine project type using 'MilestoneBased'
  const isMilestoneProject =
    professionalProposal?.type === 'MilestoneBased' &&
    !!milestonesFromProfessional
  const milestones: Milestone[] = milestonesFromProfessional || []

  // Get the latest submission for AllInOne projects
  // Submissions should be part of the professionalProposal for AllInOne type
  const latestSubmission = !isMilestoneProject
    ? project.submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0]
    : professionalProposal?.submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0]

  // Calculate milestone progress only if it's a milestones project
  const completedMilestones = isMilestoneProject
    ? milestones.filter((m) => m.status === 'Completed')?.length || 0
    : 0
  const totalMilestones = isMilestoneProject ? milestones.length : 0 // length is 0 if not milestone project or no milestones
  const milestoneProgress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  const handleProposalClick = (proposal: BaseProposal) => {
    setSelectedProposal(proposal)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProposal(null)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content - Left Column (8 cols on large screens) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Conditional Rendering: Milestones or Fixed Price */}
          {project.professional && professionalProposal ? (
            isMilestoneProject ? (
              <CompanyProjectMilestones
                milestones={milestones} // Pass the correctly typed milestones
                activeMilestone={activeMilestone ?? milestones[0]?.order ?? 0} // Ensure a valid default
                setActiveMilestone={setActiveMilestone}
                projectId={project.id}
                isProjectCompleted={project.status === 'Completed'}
              />
            ) : (
              <CompanyAllInOneSubmission
                projectId={project.id}
                submission={latestSubmission} // Pass the latest submission
                professionalName={
                  project.professional?.name || 'the professional'
                }
                isProjectCompleted={project.status === 'Completed'}
              />
            )
          ) : null}

          {/* Show proposals list only if no professional is assigned yet */}
          {!project.professional && project.proposals.length > 0 && (
            <CompanyProjectProposals
              proposals={project.proposals}
              handleProposalClick={handleProposalClick}
            />
          )}

          {/* Budget Overview Card - Show regardless of type if professional assigned */}
          {project.professional && (
            <CompanyProjectBudgetOverview
              project={project}
              milestoneProgress={milestoneProgress} // Pass progress even if 0 for fixed
            />
          )}
        </div>

        {/* Sidebar - Right Column (4 cols on large screens) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Professional Assigned Card */}
          {project.professional && (
            <CompanyProjectAssigned professional={project.professional} />
          )}
          <CompanyProjectFiles media={project.media} />
        </div>
      </div>

      {/* Proposal Detail Modal */}
      <ProposalDetailModal
        proposal={selectedProposal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
