'use client'

import type { GetProjectRes } from '@lib/api/company/projects'
import { useState } from 'react'
import ProposalDetailModal from '../proposal-detail-modal'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { CompanyProjectMilestones } from './milestones'
import { CompanyProjectAssigned } from './assigned'
import { CompanyProjectProposals } from './proposals'
import { CompanyProjectBudgetOverview } from './budget-overview'
import { CompanyProjectFiles } from './files'

// Mock data for milestone submissions
const mockMilestoneSubmissions = {
  'milestone-1': {
    id: 'submission-1',
    milestoneId: 'milestone-1',
    description:
      "I've completed the initial design phase with wireframes and mockups as requested. The design follows the brand guidelines and incorporates all the feedback from our previous discussions.",
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'pending', // pending, approved, rejected, changes_requested
    media: [
      '/placeholder.svg?height=300&width=500',
      '/placeholder.svg?height=300&width=500',
    ],
    comments: [
      {
        id: 'comment-1',
        author: 'professional',
        authorName: 'John Designer',
        text: "I've focused on making the UI intuitive and modern. Let me know if you'd like any adjustments to the color scheme.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  'milestone-2': {
    id: 'submission-2',
    milestoneId: 'milestone-2',
    description:
      "The core functionality has been implemented according to the specifications. All features are working as expected and I've included comprehensive documentation for each component.",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'approved',
    media: ['/placeholder.svg?height=300&width=500'],
    comments: [
      {
        id: 'comment-2',
        author: 'professional',
        authorName: 'John Developer',
        text: 'All core features are now implemented and tested. The documentation is in the attached PDF.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'comment-3',
        author: 'company',
        authorName: 'Sarah Client',
        text: 'This looks great! The functionality works perfectly. Approved!',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  'milestone-3': {
    id: 'submission-3',
    milestoneId: 'milestone-3',
    description:
      "I've completed the final testing phase and fixed all the reported bugs. The application is now ready for deployment with improved performance and stability.",
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    status: 'changes_requested',
    media: [
      '/placeholder.svg?height=300&width=500',
      '/placeholder.svg?height=300&width=500',
      '/placeholder.svg?height=300&width=500',
    ],
    comments: [
      {
        id: 'comment-4',
        author: 'professional',
        authorName: 'John Developer',
        text: 'All testing is complete and bugs have been fixed. The application is now ready for deployment.',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'comment-5',
        author: 'company',
        authorName: 'Sarah Client',
        text: 'Almost there! Could you please fix the loading animation on the dashboard page? It seems a bit slow.',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
}

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

export function CompanyProjectView({
  project,
}: {
  project: GetProjectRes['data']
}) {
  const [selectedProposal, setSelectedProposal] = useState<
    GetProjectRes['data']['proposals'][number] | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeMilestone, setActiveMilestone] = useState<number | null>(
    project?.professional?.proposals[0].milestones.find(
      (m) => m.status === 'Pending',
    )?.order || null,
  )
  const [commentText, setCommentText] = useState('')
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(
    'submission-1',
  )
  const { toast } = useToast()

  // Mock milestone data
  const mockMilestones: EnhancedMilestone[] = [
    {
      id: 'milestone-1',
      title: 'Initial Design Phase',
      description: 'Create wireframes and design mockups for the application',
      price: project.meta?.budget ? project.meta.budget * 0.3 : 3000,
      timeline: '2 weeks',
      order: 1,
      status: 'Completed',
      submission: mockMilestoneSubmissions['milestone-1'],
    },
    {
      id: 'milestone-2',
      title: 'Core Development',
      description: 'Implement the core functionality of the application',
      price: project.meta?.budget ? project.meta.budget * 0.5 : 5000,
      timeline: '3 weeks',
      order: 2,
      status: 'Completed',
      submission: mockMilestoneSubmissions['milestone-2'],
    },
    {
      id: 'milestone-3',
      title: 'Testing & Deployment',
      description: 'Final testing, bug fixes, and deployment',
      price: project.meta?.budget ? project.meta.budget * 0.2 : 2000,
      timeline: '1 week',
      order: 3,
      status: 'In Progress',
      submission: mockMilestoneSubmissions['milestone-3'],
    },
  ]

  // Add milestones to project if not present
  if (!project.professional?.proposals[0].milestones) {
    project.professional.proposals[0].milestones = mockMilestones as any
  }

  // Calculate milestone progress
  const completedMilestones =
    project.professional.proposals[0].milestones.filter(
      (m) => m.status === 'Completed',
    ).length
  const totalMilestones = project.professional.proposals[0].milestones.length
  const milestoneProgress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  const handleProposalClick = (
    proposal: GetProjectRes['data']['proposals'][number],
  ) => {
    setSelectedProposal(proposal)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProposal(null)
  }

  const handleSubmitComment = (milestoneOrder: number) => {
    if (!commentText.trim()) return

    toast({
      title: 'Comment submitted',
      description: 'Your comment has been added to the milestone submission.',
    })

    // In a real app, this would be an API call
    // For now, we'll just mock the behavior
    setCommentText('')
  }

  const handleMilestoneAction = (
    milestoneOrder: number,
    action: 'approve' | 'reject' | 'request_changes',
  ) => {
    // In a real app, this would be an API call
    // For now, we'll just show a toast

    const actionMessages = {
      approve: 'Milestone approved! The professional has been notified.',
      reject: 'Milestone rejected. The professional has been notified.',
      request_changes:
        'Change request sent. The professional has been notified.',
    }

    toast({
      title:
        action === 'approve'
          ? 'Milestone Approved'
          : action === 'reject'
            ? 'Milestone Rejected'
            : 'Changes Requested',
      description: actionMessages[action],
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content - Left Column (8 cols on large screens) */}
        <div className="space-y-6 lg:col-span-8">
          {project.professional?.proposals[0].milestones && (
            <CompanyProjectMilestones
              milestones={project.professional.proposals[0].milestones}
              activeMilestone={activeMilestone || 0}
              setActiveMilestone={setActiveMilestone}
              handleMilestoneAction={handleMilestoneAction}
              handleSubmitComment={handleSubmitComment}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          )}

          {!project.professional && (
            <CompanyProjectProposals
              proposals={project.proposals}
              handleProposalClick={handleProposalClick}
            />
          )}

          {/* Budget Overview Card */}
          <CompanyProjectBudgetOverview
            project={project}
            milestoneProgress={milestoneProgress}
          />
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
