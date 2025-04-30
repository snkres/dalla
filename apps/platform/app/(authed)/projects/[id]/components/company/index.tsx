'use client'

import {
  Button,
  Progress,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Riyal,
  Badge,
} from '@dalla/design-system'
import {
  Users,
  FileText,
  Star,
  MessageSquare,
  Eye,
  Download,
  CheckSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { GetProjectRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'
import { Link } from 'next-view-transitions'
import { useState } from 'react'
import ProposalDetailModal from '../proposal-detail-modal'
import StatusBadge from 'app/(authed)/proposals/components/status-badge'
import type { ProposalStatus } from '@lib/api/pro/proposals'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { CompanyProjectMilestones } from './milestones'

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
    project.professional.proposals[0].milestones.find(
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
  if (!project.milestones) {
    project.milestones = mockMilestones as any
  }

  // Calculate milestone progress
  const completedMilestones = project.milestones.filter(
    (m) => m.status === 'Completed',
  ).length
  const totalMilestones = project.milestones.length
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
          <CompanyProjectMilestones
            milestones={project.professional.proposals[0].milestones}
            activeMilestone={activeMilestone || 0}
            setActiveMilestone={setActiveMilestone}
            handleMilestoneAction={handleMilestoneAction}
            handleSubmitComment={handleSubmitComment}
            commentText={commentText}
            setCommentText={setCommentText}
          />
          {/* Budget Overview Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                  <Riyal className="h-4 w-4 text-[#1D8489]" />
                </div>
                <h2 className="font-medium text-gray-900">Budget Overview</h2>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
                  <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                    Total Budget
                  </div>
                  <div className="flex items-center gap-1.5 text-xl font-semibold text-[#64B7B7]/80">
                    {formatCurrency(project.meta?.budget, 'h-5 w-5')}
                  </div>
                </div>

                <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
                  <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                    Spent
                  </div>
                  <div className="text-lg font-semibold text-[#64B7B7]/80">
                    {formatCurrency(
                      project.meta?.budget * (milestoneProgress / 100) || 0,
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
                  <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                    Remaining
                  </div>
                  <div className="text-lg font-semibold text-[#64B7B7]/80">
                    {formatCurrency(
                      project.meta?.budget * (1 - milestoneProgress / 100) || 0,
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#3c7878]">Spent</span>
                  <span className="text-[#3c7878]">
                    {Math.round(milestoneProgress)}%
                  </span>
                </div>
                <Progress
                  value={milestoneProgress}
                  className="!bg-[#64b7b71f]"
                  indicatorClassName="!bg-[#64B7B7]/90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column (4 cols on large screens) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Professional Assigned Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                  <Users className="h-4 w-4 text-[#1D8489]" />
                </div>
                <h2 className="font-medium text-gray-900">
                  Professional Assigned
                </h2>
              </div>
            </div>

            <div className="p-5">
              {project.status === 'InProgress' ? (
                <ProjectAssignedProfessional project={project} />
              ) : (
                <div className="flex h-64 items-center justify-center p-5 text-sm text-gray-500">
                  No professional assigned yet
                </div>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                  <FileText className="h-4 w-4 text-[#1D8489]" />
                </div>
                <h2 className="font-medium text-gray-900">Project Files</h2>
              </div>
            </div>

            <div className="p-6">
              {project.media.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                  No files available
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {project.media.map((file) => (
                    <div
                      key={file}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-3 flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2F2] shadow-sm">
                          <FileText className="h-5 w-5 text-[#1D8489]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {file}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                          onClick={() => window.open(file, '_blank')}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            const link = document.createElement('a')
                            link.href = file
                            link.download = file.split('/').pop() || 'download'
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Proposals Card - Only show if project is Open */}
          {project.status === 'Open' && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <FileText className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">Proposals</h2>
                </div>
              </div>

              <div className="p-5">
                {project.proposals.length > 0 ? (
                  <div className="space-y-4">
                    {project.proposals.map((proposal) => (
                      <motion.div
                        key={proposal.id}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{
                          boxShadow: '0 4px 12px rgba(99, 183, 183, 0.1)',
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#63B7B7]/30"
                        onClick={() => handleProposalClick(proposal)}
                      >
                        <div className="mb-3 flex items-start gap-3">
                          <div className="relative">
                            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#63B7B7]/10">
                              <Image
                                src={
                                  proposal.professional.UserProfile?.avatar ||
                                  '/placeholder.svg' ||
                                  '/placeholder.svg'
                                }
                                alt={proposal.professional.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">
                              {proposal.professional.name}
                            </div>
                            <div className="line-clamp-1 text-xs text-gray-500">
                              {proposal.professional.UserProfile?.headline}
                            </div>
                          </div>
                          <StatusBadge
                            status={proposal.status as ProposalStatus}
                          />
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <svg
                              className="mr-1.5 h-4 w-4 text-[#63B7B7]"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 8V12L14 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                            {proposal.timeline}
                          </div>
                          <div className="text-sm font-medium text-[#63B7B7]">
                            {formatCurrency(proposal.price)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="mb-4 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <h3 className="text-base font-medium text-gray-900">
                        No proposals yet
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Your project is waiting for professionals to submit
                        proposals.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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

function ProjectAssignedProfessional({
  project,
}: {
  project: GetProjectRes['data']
}) {
  const assignedProposal = project.proposals?.find(
    (proposal) => proposal.professionalId === project?.professional?.id,
  )

  const professional = assignedProposal?.professional

  if (!professional) {
    return (
      <div className="flex h-56 items-center justify-center p-5 text-sm text-gray-500">
        No professional information available
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border border-gray-200">
          <AvatarImage
            src={professional.UserProfile?.avatar || '/placeholder.svg'}
            alt={professional.name}
          />
          <AvatarFallback>{professional.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-base font-medium text-gray-900">
              {professional.name}
            </div>
            {professional.UserProfile?.meta?.rating && (
              <div className="flex items-center gap-1 rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span className="text-xs font-medium text-amber-700">
                  {professional.UserProfile.meta.rating}
                </span>
              </div>
            )}
          </div>

          <div className="mt-0.5 text-sm text-gray-500">
            {professional.UserProfile?.headline}
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              className="h-8 !bg-[#63B7B7] text-xs !text-white hover:!bg-[#1D8489]"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Message
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="!h-8 text-xs"
              asChild
            >
              <Link href={`/professionals/${professional.username}`} prefetch>
                View Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
