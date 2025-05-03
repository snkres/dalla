'use client'

import { useState } from 'react'
import {
  Award,
  RefreshCw,
  Eye,
  XCircle,
  MessageSquare,
  CheckCircle,
  Clock,
  Calendar,
  Pin,
  ChevronRight,
  AlertCircle,
  Flag,
  AlertTriangle,
} from 'lucide-react'
import Image from 'next/image'
import {
  Textarea,
  TooltipProvider,
  Button,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@dalla/design-system'
import { formatCurrency } from '@lib/utils/format-currency'
import type { Milestone, ReviewSubmission } from '@lib/types/project'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { endProject, reviewMilestone } from '@lib/api/company/projects'
import { useQueryClient } from '@tanstack/react-query'
import { CompanyDetailsMilestone } from './active-milestone'
import { motion, AnimatePresence } from 'motion/react'

interface CompanyProjectMilestonesProps {
  projectId: string
  milestones: Milestone[]
  activeMilestone: number
  setActiveMilestone: (milestone: number) => void
  onReviewSuccess?: () => void
  isProjectCompleted: boolean
}

export function CompanyProjectMilestones({
  projectId,
  milestones,
  activeMilestone,
  setActiveMilestone,
  onReviewSuccess,
  isProjectCompleted,
}: CompanyProjectMilestonesProps) {
  const [reviewComment, setReviewComment] = useState('')

  const [detailsMilestone, setDetailsMilestone] = useState<number | null>(null)
  const [isEndProjectDialogOpen, setIsEndProjectDialogOpen] = useState(false)
  const [isEndingProject, setIsEndingProject] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleMilestoneAction = async (
    milestoneId: string,
    submissionId: string,
    review: ReviewSubmission,
  ) => {
    try {
      await reviewMilestone(projectId, milestoneId, submissionId, review)

      await queryClient.refetchQueries({
        queryKey: ['project', projectId],
      })

      const actionMessages: Record<ReviewSubmission['status'], string> = {
        Approved: 'Milestone approved! The professional has been notified.',
        ChangesRequested:
          'Change request sent. The professional has been notified.',
        Rejected: 'Milestone rejected. The professional has been notified.',
      }

      toast({
        title: actionMessages[review.status],
        variant: review.status === 'Rejected' ? 'destructive' : 'default',
      })

      setReviewComment('')

      if (review.status === 'Approved') {
        const currentIndex = milestones.findIndex(
          (m) => m.order === activeMilestone,
        )
        if (currentIndex !== -1 && currentIndex < milestones.length - 1) {
          const nextMilestoneOrder = milestones[currentIndex + 1].order
          setActiveMilestone(nextMilestoneOrder)
        } else {
          console.log('Last milestone approved.')
        }
      }

      onReviewSuccess?.()
    } catch (err: any) {
      toast({
        title: 'Error reviewing milestone',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred.',
        variant: 'destructive',
      })
    }
  }

  const handleEndProject = async () => {
    try {
      setIsEndingProject(true)
      await endProject(projectId).then(() => {
        setIsEndProjectDialogOpen(false)
        toast({
          title: 'Project ended successfully',
          description: 'The project has been marked as completed.',
        })
        queryClient.refetchQueries({
          queryKey: ['project', projectId],
        })
      })
    } catch (err: any) {
      toast({
        title: 'Error ending project',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsEndingProject(false)
    }
  }

  const currentMilestone = milestones.find((m) => m.order === activeMilestone)

  const lastSubmission = currentMilestone?.submissions?.find(
    (s) =>
      s.updatedAt ===
      currentMilestone?.submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0]?.updatedAt,
  )

  // Calculate total project value
  const totalProjectValue = milestones.reduce((sum, m) => sum + m.price, 0)

  // Calculate completed value
  const completedValue = milestones
    .filter((m) => m.status === 'Completed')
    .reduce((sum, m) => sum + m.price, 0)

  // Calculate completion percentage
  const completionPercentage =
    totalProjectValue > 0
      ? Math.round((completedValue / totalProjectValue) * 100)
      : 0

  // Check if all milestones are completed
  const allMilestonesCompleted = milestones.every(
    (m) => m.status === 'Completed',
  )

  return (
    <>
      <motion.div
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
              <Award className="h-4 w-4 text-[#1D8489]" />
            </div>
            <h2 className="font-medium text-gray-900">Project Milestones</h2>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="!border-[#63B7B7]/20 !bg-[#63B7B7]/10 !text-[#63B7B7]">
              {
                milestones.filter(
                  (milestone) => milestone.status === 'Completed',
                ).length
              }{' '}
              of {milestones.length} Completed
            </Badge>
          </div>
        </div>

        <div className="p-5">
          {/* Project Progress Bar */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>Project Progress</span>
              <div className="font-medium text-gray-900">
                {completionPercentage}%
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#63B7B7] to-[#1D8489]"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* End Project Button */}

          {/* Milestone Timeline */}
          <div className="relative mb-8">
            <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200" />

            {milestones.map((milestone, index) => {
              const isActive = activeMilestone === milestone.order
              const isCompleted = milestone.status === 'Completed'
              const isPending = milestone.status === 'Pending'
              const isUpcoming = !isCompleted && !isPending

              // Calculate percentage of total project value
              const valuePercentage = Math.round(
                (milestone.price / totalProjectValue) * 100,
              )

              return (
                <motion.div
                  key={milestone.order}
                  className={`relative mb-4 pl-12 ${isActive ? 'z-10' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Status Indicator */}
                  <motion.div
                    className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      isActive
                        ? 'border-[#63B7B7] ring-2 ring-[#63B7B7]/30'
                        : 'border-gray-200'
                    } ${
                      isCompleted
                        ? 'bg-[#63B7B7] text-white'
                        : isPending
                          ? 'border-blue-300 bg-blue-50'
                          : 'bg-gray-50'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : isPending ? (
                      <Clock className="h-4 w-4 text-blue-600" />
                    ) : (
                      <span className="text-xs font-medium text-gray-500">
                        {index + 1}
                      </span>
                    )}
                  </motion.div>

                  {/* Milestone Card */}
                  <motion.div
                    className={`group cursor-pointer rounded-lg border ${
                      isActive
                        ? 'border-[#63B7B7] bg-[#F7FCFC] shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                    } transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setDetailsMilestone(milestone.order)
                    }}
                    whileHover={{
                      y: -2,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                          <h3
                            className={`truncate text-base font-semibold ${isActive ? 'text-[#1D8489]' : 'text-gray-800'}`}
                          >
                            {milestone.title}
                          </h3>
                        </div>
                        <div className="ml-2 flex flex-shrink-0 items-center gap-2">
                          <Badge
                            variant={
                              isCompleted
                                ? 'default'
                                : isPending
                                  ? 'secondary'
                                  : 'outline'
                            }
                            className={
                              isCompleted
                                ? 'bg-[#63B7B7] hover:bg-[#1D8489]'
                                : ''
                            }
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-gray-500">Value</div>
                          <div className="font-medium text-gray-900">
                            {formatCurrency(milestone.price)}{' '}
                            <span className="text-xs text-gray-500">
                              ({valuePercentage}%)
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Timeline</div>
                          <div className="font-medium text-gray-900">
                            {milestone.timeline || '—'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Order</div>
                          <div className="font-medium text-gray-900">
                            {milestone.order} of {milestones.length}
                          </div>
                        </div>
                      </div>

                      {/* Submission Status Indicator */}
                      {milestone.submissions &&
                        milestone.submissions.length > 0 && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            {milestone.status === 'Completed' ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                <span>Approved</span>
                              </div>
                            ) : milestone.status === 'Pending' &&
                              milestone.submissions.some(
                                (s) => s.status === 'Pending',
                              ) ? (
                              <div className="flex items-center gap-1 text-blue-600">
                                <AlertCircle className="h-3 w-3" />
                                <span>Awaiting Review</span>
                              </div>
                            ) : milestone.submissions.some(
                                (s) => s.status === 'ChangesRequested',
                              ) ? (
                              <div className="flex items-center gap-1 text-amber-600">
                                <RefreshCw className="h-3 w-3" />
                                <span>Changes Requested</span>
                              </div>
                            ) : milestone.submissions.some(
                                (s) => s.status === 'Rejected',
                              ) ? (
                              <div className="flex items-center gap-1 text-red-600">
                                <XCircle className="h-3 w-3" />
                                <span>Rejected</span>
                              </div>
                            ) : null}
                          </div>
                        )}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
          {milestones.some((m) => m.status !== 'Pending') &&
            !isProjectCompleted && (
              <div className="mb-6 flex justify-end">
                <Dialog
                  open={isEndProjectDialogOpen}
                  onOpenChange={setIsEndProjectDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant={allMilestonesCompleted ? 'default' : 'outline'}
                      className={
                        allMilestonesCompleted
                          ? '!bg-[#1D8489] hover:!bg-[#176669]'
                          : 'border-amber-300 text-amber-600 hover:bg-amber-50'
                      }
                      size="sm"
                    >
                      <Flag className="mr-1.5 h-4 w-4" />
                      {allMilestonesCompleted
                        ? 'Complete Project'
                        : 'End Project Early'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {allMilestonesCompleted
                          ? 'Complete Project'
                          : 'End Project Early'}
                      </DialogTitle>
                      <DialogDescription>
                        {allMilestonesCompleted
                          ? 'All milestones have been completed. Are you sure you want to mark this project as complete?'
                          : "You're about to end this project before all milestones are completed. This action cannot be undone."}
                      </DialogDescription>
                    </DialogHeader>

                    {!allMilestonesCompleted && (
                      <div className="my-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                          <div>
                            <p className="mb-1 font-medium">
                              Warning: Incomplete Milestones
                            </p>
                            <p>
                              {
                                milestones.filter(
                                  (m) => m.status !== 'Completed',
                                ).length
                              }{' '}
                              of {milestones.length} milestones are not
                              completed. Ending the project now may have
                              contractual implications.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsEndProjectDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleEndProject}
                        disabled={isEndingProject}
                        className={
                          allMilestonesCompleted
                            ? '!bg-[#1D8489] hover:!bg-[#176669]'
                            : 'bg-amber-600 hover:bg-amber-700'
                        }
                      >
                        {isEndingProject
                          ? 'Processing...'
                          : allMilestonesCompleted
                            ? 'Complete Project'
                            : 'End Project'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
        </div>
      </motion.div>

      {detailsMilestone && (
        <CompanyDetailsMilestone
          milestone={
            milestones.find((m) => m.order === detailsMilestone) as Milestone
          }
          isOpen={detailsMilestone !== null}
          setIsOpen={() => setDetailsMilestone(null)}
          handleMilestoneAction={handleMilestoneAction}
          projectTotalValue={totalProjectValue}
          milestoneCount={milestones.length}
        />
      )}
    </>
  )
}
