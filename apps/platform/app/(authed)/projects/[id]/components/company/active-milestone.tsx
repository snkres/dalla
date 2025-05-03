'use client'

import {
  Badge,
  Button,
  Modal,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@dalla/design-system'
import type { ReviewSubmission } from '@lib/types/project'
import type { Milestone } from '@lib/types/project'
import { useState } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { formatCurrency } from '@lib/utils/format-currency'
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Pin,
  RefreshCw,
  XCircle,
  FileText,
  History,
  Download,
  Share2,
  Printer,
  ArrowUpRight,
  AlertCircle,
  BarChart3,
} from 'lucide-react'
import Image from 'next/image'

interface CompanyActiveMilestoneProps {
  milestone: Milestone
  handleMilestoneAction: (
    milestoneId: string,
    submissionId: string,
    review: ReviewSubmission,
  ) => Promise<void>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  projectTotalValue?: number
  milestoneCount?: number
}

export function CompanyDetailsMilestone({
  milestone,
  isOpen,
  setIsOpen,
  handleMilestoneAction,
  projectTotalValue = 0,
  milestoneCount = 0,
}: CompanyActiveMilestoneProps) {
  const [reviewComment, setReviewComment] = useState('')
  const [activeTab, setActiveTab] = useState('details')
  const { toast } = useToast()

  const lastSubmission = milestone?.submissions?.find(
    (s) =>
      s.updatedAt ===
      milestone?.submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0]?.updatedAt,
  )

  const isPendingReview =
    milestone?.status === 'Pending' && lastSubmission?.status === 'Pending'

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
    if (!milestone.id || !lastSubmission?.id) {
      console.error('Missing IDs for review action')
      toast({
        title: 'Error',
        description: 'Cannot perform action, required data is missing.',
        variant: 'destructive',
      })
      return
    }
    if (!canSubmitReview(status)) return

    handleMilestoneAction(milestone.id, lastSubmission.id, {
      status,
      comments: reviewComment.trim(),
    })
  }

  // Calculate percentage of total project value
  const valuePercentage =
    projectTotalValue > 0
      ? Math.round((milestone.price / projectTotalValue) * 100)
      : 0

  // Format dates for better display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  // Get submission history
  const submissionHistory = milestone.submissions || []

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width="lg">
      <div className="flex max-h-[85vh] flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Pin className="h-5 w-5 text-[#63B7B7]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {milestone.title}
                  </h2>
                  <Badge
                    variant={
                      milestone.status === 'Completed'
                        ? 'default'
                        : milestone.status === 'Pending'
                          ? 'secondary'
                          : milestone.status === 'Changes'
                            ? 'outline'
                            : 'destructive'
                    }
                    className={
                      milestone.status === 'Completed'
                        ? 'bg-[#63B7B7] hover:bg-[#1D8489]'
                        : ''
                    }
                  >
                    {milestone.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Milestone {milestone.order}
                  {milestoneCount ? ` of ${milestoneCount}` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="whitespace-nowrap rounded-xl border border-[#63B7B7]/20 bg-[#63B7B7]/10 px-3 py-1">
                <span className="text-sm font-medium text-[#63B7B7]">
                  {formatCurrency(milestone.price)}
                  {valuePercentage > 0 && (
                    <span className="ml-1 text-xs">({valuePercentage}%)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation and Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col"
        >
          <div className="sticky top-[73px] z-10 border-b border-gray-200 bg-white">
            <TabsList className="grid w-full grid-cols-4 lg:flex lg:w-auto lg:grid-cols-none">
              <TabsTrigger
                value="details"
                className="flex items-center gap-1.5"
              >
                <FileText className="h-4 w-4" />
                <span>Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="submission"
                className="flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-4 w-4" />
                <span>Submission</span>
                {isPendingReview && (
                  <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    !
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex items-center gap-1.5"
              >
                <History className="h-4 w-4" />
                <span>History</span>
                {submissionHistory.length > 0 && (
                  <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                    {submissionHistory.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <TabsContent value="details" className="mt-0">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Description
                  </h3>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="prose prose-sm max-w-none text-sm text-gray-600">
                      {milestone.description || (
                        <span className="italic text-gray-400">
                          No description provided.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Key Information */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Key Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#63B7B7]" />
                      <div>
                        <span className="block text-xs text-gray-500">
                          Estimated Duration
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {milestone.timeline || 'Not specified'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#63B7B7]" />
                      <div>
                        <span className="block text-xs text-gray-500">
                          Milestone Order
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {milestone.order}
                          {milestoneCount ? ` of ${milestoneCount}` : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#63B7B7]" />
                      <div>
                        <span className="block text-xs text-gray-500">
                          Status
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {milestone.status}
                          {isPendingReview && (
                            <span className="ml-2 text-xs text-blue-600">
                              (Awaiting Review)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Financial Information
                  </h3>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <span className="block text-xs text-gray-500">
                          Milestone Value
                        </span>
                        <span className="text-lg font-semibold text-gray-800">
                          {formatCurrency(milestone.price)}
                        </span>
                      </div>
                      {projectTotalValue > 0 && (
                        <div>
                          <span className="block text-xs text-gray-500">
                            Percentage of Project
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-800">
                              {valuePercentage}%
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full bg-[#63B7B7]"
                                style={{ width: `${valuePercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="submission" className="mt-0">
              {lastSubmission ? (
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">
                        Latest Submission
                      </h3>
                      <Badge
                        variant={
                          lastSubmission.status === 'Approved'
                            ? 'default'
                            : lastSubmission.status === 'Rejected'
                              ? 'destructive'
                              : lastSubmission.status === 'ChangesRequested'
                                ? 'secondary'
                                : 'outline'
                        }
                        className={
                          lastSubmission.status === 'Approved'
                            ? 'bg-[#63B7B7] hover:bg-[#1D8489]'
                            : ''
                        }
                      >
                        {lastSubmission.status}
                      </Badge>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-4">
                        <h4 className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                          Description
                        </h4>
                        <p className="prose prose-sm max-w-none text-sm text-gray-600">
                          {lastSubmission.description || (
                            <span className="italic text-gray-400">
                              No submission notes provided.
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Submitted:</span>{' '}
                          <time
                            dateTime={new Date(
                              lastSubmission.createdAt,
                            ).toISOString()}
                          >
                            {formatDate(lastSubmission.createdAt)}
                          </time>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Last Updated:</span>{' '}
                          <time
                            dateTime={new Date(
                              lastSubmission.updatedAt,
                            ).toISOString()}
                          >
                            {formatDate(lastSubmission.updatedAt)}
                          </time>
                        </div>
                      </div>

                      {lastSubmission.media &&
                        lastSubmission.media.length > 0 && (
                          <div className="mb-4">
                            <h4 className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                              Attachments ({lastSubmission.media.length})
                            </h4>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                              {lastSubmission.media.map((mediaUrl, idx) => (
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
                                      (e.currentTarget.src = '/placeholder.svg')
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
                              ))}
                            </div>
                          </div>
                        )}

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
                            onChange={(e) => setReviewComment(e.target.value)}
                            aria-label="Review comment"
                          />
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            {!reviewComment.trim() &&
                              !canSubmitReview('Approved') && (
                                <p className="mr-auto text-xs text-red-600">
                                  Comment required for requesting changes or
                                  rejecting.
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
                              onClick={() => submitReview('ChangesRequested')}
                              disabled={!canSubmitReview('ChangesRequested')}
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

                      {lastSubmission.comment && !isPendingReview && (
                        <div className="mt-6 border-t border-gray-100 pt-4">
                          <h5 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <MessageSquare className="h-4 w-4 text-[#63B7B7]" />
                            Feedback Provided
                          </h5>
                          <div className="rounded-lg bg-gray-50/80 p-3">
                            <p className="prose prose-sm max-w-none text-sm text-gray-700">
                              {lastSubmission.comment}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No submissions yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No submission has been made for this milestone yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              {submissionHistory.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-sm font-medium text-gray-700">
                    Submission History
                  </h3>
                  <div className="relative">
                    <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200" />

                    {submissionHistory.map((submission, index) => (
                      <div key={submission.id} className="relative mb-6 pl-12">
                        {/* Status Indicator */}
                        <div
                          className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            submission.status === 'Approved'
                              ? 'border-green-100 bg-green-500 text-white'
                              : submission.status === 'Rejected'
                                ? 'border-red-100 bg-red-500 text-white'
                                : submission.status === 'ChangesRequested'
                                  ? 'border-amber-100 bg-amber-500 text-white'
                                  : 'border-blue-100 bg-blue-500 text-white'
                          }`}
                        >
                          {submission.status === 'Approved' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : submission.status === 'Rejected' ? (
                            <XCircle className="h-4 w-4" />
                          ) : submission.status === 'ChangesRequested' ? (
                            <RefreshCw className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>

                        {/* Submission Card */}
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">
                              Submission {submissionHistory.length - index}
                            </h4>
                            <Badge
                              variant={
                                submission.status === 'Approved'
                                  ? 'default'
                                  : submission.status === 'Rejected'
                                    ? 'destructive'
                                    : submission.status === 'ChangesRequested'
                                      ? 'secondary'
                                      : 'outline'
                              }
                              className={
                                submission.status === 'Approved'
                                  ? 'bg-[#63B7B7] hover:bg-[#1D8489]'
                                  : ''
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>

                          <div className="mb-3 text-xs text-gray-500">
                            <div className="flex justify-between">
                              <span>
                                <span className="font-medium">Submitted:</span>{' '}
                                {formatDate(submission.createdAt)}
                              </span>
                              <span>
                                <span className="font-medium">Updated:</span>{' '}
                                {formatDate(submission.updatedAt)}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-600">
                              {submission.description || (
                                <span className="italic text-gray-400">
                                  No description provided.
                                </span>
                              )}
                            </p>
                          </div>

                          {submission.media && submission.media.length > 0 && (
                            <div className="mb-3">
                              <h5 className="mb-1 text-xs text-gray-500">
                                Attachments ({submission.media.length})
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {submission.media.map((mediaUrl, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() =>
                                      window.open(
                                        mediaUrl,
                                        '_blank',
                                        'noopener noreferrer',
                                      )
                                    }
                                  >
                                    <Eye className="mr-1 h-3 w-3" />
                                    View {idx + 1}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {submission.comment && (
                            <div className="mt-3 border-t border-gray-100 pt-3">
                              <h5 className="mb-1 text-xs text-gray-500">
                                Feedback
                              </h5>
                              <p className="text-sm text-gray-600">
                                {submission.comment}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <History className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No history available
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    There is no submission history for this milestone yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer with actions */}
        <div className="sticky bottom-0 z-10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {isPendingReview && (
                <>
                  <Button
                    className="!bg-green-600 text-white shadow-sm hover:!bg-green-700 disabled:opacity-50"
                    onClick={() => submitReview('Approved')}
                    disabled={!canSubmitReview('Approved')}
                  >
                    <CheckCircle className="mr-1.5 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    className="!bg-amber-500 text-white shadow-sm hover:!bg-amber-600 disabled:opacity-50"
                    onClick={() => submitReview('ChangesRequested')}
                    disabled={!canSubmitReview('ChangesRequested')}
                  >
                    <RefreshCw className="mr-1.5 h-4 w-4" />
                    Request Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
