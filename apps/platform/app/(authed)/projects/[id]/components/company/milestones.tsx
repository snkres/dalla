import { useState } from 'react'
import {
  Award,
  RefreshCw,
  Eye,
  XCircle,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Calendar,
  ArrowRight,
  Pin,
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
} from '@dalla/design-system'
import { formatCurrency } from '@lib/utils/format-currency'
import { Milestone, ReviewSubmission } from '@lib/types/project'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { reviewMilestone } from '@lib/api/company/projects'
import { useQueryClient } from '@tanstack/react-query'

interface CompanyProjectMilestonesProps {
  projectId: string
  milestones: Milestone[]
  activeMilestone: number
  setActiveMilestone: (milestone: number) => void
  onReviewSuccess?: () => void
}

export function CompanyProjectMilestones({
  projectId,
  milestones,
  activeMilestone,
  setActiveMilestone,
  onReviewSuccess,
}: CompanyProjectMilestonesProps) {
  const [reviewComment, setReviewComment] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleMilestoneAction = async (
    milestoneId: string,
    submissionId: string,
    review: ReviewSubmission,
  ) => {
    try {
      await reviewMilestone(projectId, milestoneId, submissionId, review)

      queryClient.invalidateQueries({
        queryKey: ['projects', projectId],
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
            <Award className="h-4 w-4 text-[#1D8489]" />
          </div>
          <h2 className="font-medium text-gray-900">Milestones</h2>
        </div>
        <Badge className="!border-[#63B7B7]/20 !bg-[#63B7B7]/10 !text-[#63B7B7]">
          {
            milestones.filter((milestone) => milestone.status === 'Completed')
              .length
          }{' '}
          of {milestones.length} Completed
        </Badge>
      </div>

      <div className="p-5">
        <div className="mb-1">
          <div className="flex h-8 w-full overflow-hidden rounded-full">
            <TooltipProvider>
              {milestones.map((milestone, index) => {
                const totalAmount = milestones.reduce(
                  (sum, m) => sum + m.price,
                  0,
                )
                const percentage = (milestone.price / totalAmount) * 100

                return (
                  <Tooltip key={milestone.order}>
                    <TooltipTrigger asChild>
                      <div
                        className={`group relative flex cursor-pointer items-center justify-center transition-all duration-300 hover:brightness-90 ${
                          activeMilestone === milestone.order
                            ? 'z-10 ring-2 ring-[#63B7B7] ring-offset-1 ring-offset-white'
                            : ''
                        }`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: `hsl(180, 35%, ${60 - index * 5}%)`,
                          ...(milestone.status === 'Completed' && {
                            filter: 'saturate(1.2) brightness(1.05)',
                          }),
                          ...(milestone.status === 'Pending' && {
                            opacity: 0.9,
                          }),
                          ...(milestone.status !== 'Completed' &&
                            milestone.status !== 'Pending' && {
                              filter: 'grayscale(50%) opacity(0.7)',
                            }),
                        }}
                        onClick={() => setActiveMilestone(milestone.order)}
                      >
                        <span className="truncate px-1 text-xs font-medium text-white">
                          {milestone.status === 'Completed' && (
                            <CheckCircle className="absolute -right-1 -top-1 z-20 h-3.5 w-3.5 rounded-full bg-white text-green-600 shadow-md" />
                          )}
                          {index + 1}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="z-50 border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-lg"
                    >
                      <p className="font-semibold text-gray-800">
                        {milestone.title}
                      </p>
                      <p className="text-gray-600">
                        {formatCurrency(milestone.price)} (
                        {Math.round(percentage)}%) -{' '}
                        <span
                          className={`font-medium ${
                            milestone.status === 'Completed'
                              ? 'text-green-600'
                              : milestone.status === 'Pending'
                                ? 'text-blue-600'
                                : 'text-gray-500'
                          }`}
                        >
                          {milestone.status}
                        </span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Project Start</span>
            <span>Project Completion</span>
          </div>
        </div>

        {activeMilestone && (
          <div className="mt-5">
            {milestones
              .filter((milestone) => milestone.order === activeMilestone)
              .map((milestone) => {
                const isPendingReview =
                  milestone.status === 'Pending' &&
                  milestone.submission?.status === 'Pending'

                const canSubmitReview = (
                  status: 'Approved' | 'ChangesRequested' | 'Rejected',
                ) => {
                  if (!isPendingReview) return false
                  if (status === 'Approved') return true
                  return !!reviewComment.trim()
                }

                const submitReview = (
                  status: 'Approved' | 'ChangesRequested' | 'Rejected',
                ) => {
                  if (!milestone.id || !milestone.submission?.id) {
                    console.error('Missing IDs for review action')
                    toast({
                      title: 'Error',
                      description:
                        'Cannot perform action, required data is missing.',
                      variant: 'destructive',
                    })
                    return
                  }
                  if (!canSubmitReview(status)) return

                  handleMilestoneAction(milestone.id, milestone.submission.id, {
                    status,
                    comments: reviewComment.trim(),
                  })
                }

                return (
                  <div
                    key={milestone.order}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="border-b border-gray-100 bg-gradient-to-r from-white to-blue-50/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                            <Pin className="h-4 w-4 text-[#63B7B7]" />
                          </div>
                          <h3 className="truncate text-base font-semibold text-gray-800">
                            {milestone.title}
                          </h3>
                        </div>
                        <div className="ml-2 flex flex-shrink-0 items-center gap-2">
                          <Badge
                            variant={
                              milestone.status === 'Completed'
                                ? 'default'
                                : milestone.status === 'Pending'
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {milestone.status} Here
                          </Badge>
                          <div className="whitespace-nowrap rounded-full bg-[#63B7B7]/10 px-2.5 py-0.5">
                            <span className="text-xs font-medium text-[#63B7B7]">
                              {formatCurrency(milestone.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="mb-1 text-sm font-medium text-gray-700">
                          Description:
                        </h4>
                        <p className="prose prose-sm max-w-none text-sm text-gray-600">
                          {milestone.description || (
                            <span className="italic text-gray-400">
                              No description provided.
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
                          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Est. Duration
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {milestone.timeline || '--'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
                          <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Order
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {milestone.order} of {milestones.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {milestone.submission ? (
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-gray-700">
                              Submission Details
                            </h4>
                            <Badge
                              variant={
                                milestone.submission.status === 'Approved'
                                  ? 'default'
                                  : milestone.submission.status === 'Rejected'
                                    ? 'destructive'
                                    : milestone.submission.status ===
                                        'ChangesRequested'
                                      ? 'secondary'
                                      : 'outline'
                              }
                            >
                              {milestone.submission.status}
                            </Badge>
                          </div>

                          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-4">
                              <p className="prose prose-sm max-w-none text-sm text-gray-600">
                                {milestone.submission.description || (
                                  <span className="italic text-gray-400">
                                    No submission notes provided.
                                  </span>
                                )}
                              </p>
                            </div>

                            {milestone.submission.media &&
                              milestone.submission.media.length > 0 && (
                                <div className="mb-4">
                                  <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Attachments
                                  </h5>
                                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {milestone.submission.media.map(
                                      (mediaUrl, idx) => (
                                        <div
                                          key={idx}
                                          className="group relative aspect-video overflow-hidden rounded-md border border-gray-200 transition-shadow duration-200 hover:shadow-md"
                                        >
                                          <Image
                                            src={mediaUrl || '/placeholder.svg'}
                                            alt={`Submission attachment ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) =>
                                              (e.currentTarget.src =
                                                '/placeholder.svg')
                                            }
                                          />
                                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              className="absolute bottom-2 right-2 h-8 w-8 rounded-full border-gray-300 bg-white/80 p-0 text-gray-600 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-gray-800 group-hover:opacity-100"
                                              onClick={() =>
                                                window.open(
                                                  mediaUrl,
                                                  '_blank',
                                                  'noopener noreferrer',
                                                )
                                              }
                                              aria-label={`View attachment ${idx + 1}`}
                                            >
                                              <Eye className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            <div className="mb-4 border-t border-gray-100 pt-3 text-right text-xs text-gray-500">
                              Submitted on:{' '}
                              <time
                                dateTime={new Date(
                                  milestone.submission.createdAt,
                                ).toISOString()}
                              >
                                {new Date(
                                  milestone.submission.createdAt,
                                ).toLocaleString(undefined, {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })}
                              </time>
                            </div>

                            {isPendingReview && (
                              <div className="mt-6 rounded-lg border border-dashed border-blue-300 bg-blue-50/50 p-4">
                                <h5 className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-800">
                                  <MessageSquare className="h-4 w-4 text-blue-600" />
                                  Review Submission & Provide Feedback
                                </h5>
                                <Textarea
                                  placeholder="Add an optional comment for approval, or a required comment for changes/rejection..."
                                  className="mb-3 min-h-[80px] resize-none border-gray-300 bg-white shadow-inner focus:border-blue-500 focus:ring-blue-500"
                                  value={reviewComment}
                                  onChange={(e) =>
                                    setReviewComment(e.target.value)
                                  }
                                  aria-label="Review comment"
                                />
                                <div className="flex flex-wrap items-center justify-end gap-2">
                                  {!reviewComment.trim() &&
                                    !canSubmitReview('Approved') && (
                                      <p className="mr-auto text-xs text-red-600">
                                        Comment required for requesting changes
                                        or rejecting.
                                      </p>
                                    )}
                                  <Button
                                    className="!bg-green-600 text-white shadow-sm hover:!bg-green-700 disabled:opacity-50"
                                    size="sm"
                                    onClick={() => submitReview('Approved')}
                                    disabled={!canSubmitReview('Approved')}
                                  >
                                    <CheckCircle className="mr-1.5 h-4 w-4" />
                                    Approve
                                  </Button>
                                  <Button
                                    className="!bg-amber-500 text-white shadow-sm hover:!bg-amber-600 disabled:opacity-50"
                                    size="sm"
                                    onClick={() =>
                                      submitReview('ChangesRequested')
                                    }
                                    disabled={
                                      !canSubmitReview('ChangesRequested')
                                    }
                                  >
                                    <RefreshCw className="mr-1.5 h-4 w-4" />
                                    Request Changes
                                  </Button>
                                  <Button
                                    className="!bg-red-600 text-white shadow-sm hover:!bg-red-700 disabled:opacity-50"
                                    size="sm"
                                    onClick={() => submitReview('Rejected')}
                                    disabled={!canSubmitReview('Rejected')}
                                  >
                                    <XCircle className="mr-1.5 h-4 w-4" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            )}

                            {milestone.submission.comment &&
                              !isPendingReview && (
                                <div className="mt-6 border-t border-gray-100 pt-4">
                                  <h5 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
                                    <MessageSquare className="h-4 w-4 text-[#63B7B7]" />
                                    Feedback Provided
                                  </h5>
                                  <div className="rounded-lg bg-gray-50/80 p-3">
                                    <p className="prose prose-sm max-w-none text-sm text-gray-700">
                                      {milestone.submission.comment}
                                    </p>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                          <p className="text-sm text-gray-500">
                            No submission has been made for this milestone yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
