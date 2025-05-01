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
import { EnhancedMilestone } from '.'
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
import { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'

export function CompanyProjectMilestones({
  milestones,

  activeMilestone,
  setActiveMilestone,
  handleMilestoneAction,
  handleSubmitComment,
  commentText,
  setCommentText,
}: {
  milestones: GetAllCompanyProjectsRes['data'][0][number]['proposals'][0]['milestones']

  activeMilestone: number
  setActiveMilestone: (milestone: number) => void
  handleMilestoneAction: (
    milestoneOrder: number,
    action: 'approve' | 'request_changes' | 'reject',
  ) => void
  handleSubmitComment: (milestoneOrder: number) => void
  commentText: string
  setCommentText: (text: string) => void
}) {
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
        {/* Milestone Timeline Visualization */}
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
                        className={`group relative flex items-center justify-center transition-all duration-300 hover:brightness-90 ${
                          activeMilestone === milestone.order
                            ? 'ring-2 ring-white'
                            : ''
                        }`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: `hsl(180, 35%, ${60 - index * 5}%)`,
                          opacity: milestone.status === 'Completed' ? 1 : 0.8,
                        }}
                        onClick={() => setActiveMilestone(milestone.order)}
                      >
                        <span className="text-xs font-medium text-white">
                          {index + 1}
                        </span>
                        {milestone.status === 'Completed' && (
                          <CheckCircle className="absolute -right-1 -top-1 z-20 h-4 w-4 text-white" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="z-50 bg-gray-800 text-white"
                    >
                      <div className="px-2 py-1 text-xs">
                        <p className="font-medium">{milestone.title}</p>
                        <p>
                          {formatCurrency(milestone.price)} (
                          {Math.round(percentage)}%)
                        </p>
                      </div>
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

        {/* Current Active Milestone */}
        {activeMilestone && (
          <div className="mt-5">
            {milestones
              .filter((milestone) => milestone.order === activeMilestone)
              .map((milestone) => {
                return (
                  <div
                    key={milestone.order}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="border-b border-gray-100 bg-[#BEDDF1]/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/10">
                            <Pin className="h-4 w-4 text-[#63B7B7]" />
                          </div>
                          <h3 className="text-base font-medium text-gray-800">
                            {milestone.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              milestone.status === 'Completed'
                                ? '!border-green-200 !bg-green-50 !text-green-700'
                                : milestone.status === 'Pending'
                                  ? '!border-blue-200 !bg-blue-50 !text-blue-700'
                                  : '!border-amber-200 !bg-amber-50 !text-amber-700'
                            }
                          >
                            {milestone.status}
                          </Badge>
                          <div className="rounded-full bg-[#63B7B7]/10 px-2 py-0.5">
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
                        <p className="text-sm text-gray-600">
                          {milestone.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                          <Clock className="h-4 w-4 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Duration
                            </span>
                            <span className="text-sm font-medium">
                              {milestone.timeline}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                          <Calendar className="h-4 w-4 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Order
                            </span>
                            <span className="text-sm font-medium">
                              {milestone.order} of {milestones.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Milestone Submission Section */}
                      {milestone.submission && (
                        <div className="mt-6">
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">
                              Submission:
                            </h4>
                            <Badge
                              className={
                                milestone.submission.status === 'approved'
                                  ? '!border-green-200 !bg-green-50 !text-green-700'
                                  : milestone.submission.status === 'rejected'
                                    ? '!border-red-200 !bg-red-50 !text-red-700'
                                    : milestone.submission.status ===
                                        'changes_requested'
                                      ? '!border-amber-200 !bg-amber-50 !text-amber-700'
                                      : '!border-blue-200 !bg-blue-50 !text-blue-700'
                              }
                            >
                              {milestone.submission.status === 'approved'
                                ? 'Approved'
                                : milestone.submission.status === 'rejected'
                                  ? 'Rejected'
                                  : milestone.submission.status ===
                                      'changes_requested'
                                    ? 'Changes Requested'
                                    : 'Pending Review'}
                            </Badge>
                          </div>

                          <div className="rounded-lg border border-gray-200 p-4">
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">
                                {milestone.submission.description}
                              </p>
                            </div>

                            {/* Submission Media */}
                            {milestone.submission.media &&
                              milestone.submission.media.length > 0 && (
                                <div className="mb-4">
                                  <h5 className="mb-2 text-xs font-medium text-gray-700">
                                    Attachments:
                                  </h5>
                                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                    {milestone.submission.media.map(
                                      (media: string, idx: number) => (
                                        <div
                                          key={idx}
                                          className="relative aspect-video overflow-hidden rounded-md border border-gray-200"
                                        >
                                          <Image
                                            src={
                                              media ||
                                              '/placeholder.svg' ||
                                              '/placeholder.svg'
                                            }
                                            alt={`Submission attachment ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                          />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-white/80 p-0 shadow-sm hover:bg-white"
                                            onClick={() =>
                                              window.open(media, '_blank')
                                            }
                                          >
                                            <Eye className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            {/* Submission Date */}
                            <div className="mb-4 text-xs text-gray-500">
                              Submitted:{' '}
                              {new Date(
                                milestone.submission.createdAt,
                              ).toLocaleString()}
                            </div>

                            {/* Action Buttons - Only show if status is pending */}
                            {milestone.status === 'Pending' && (
                              <div className="mb-4 flex flex-wrap gap-2">
                                <Button
                                  className="bg-green-600 text-white hover:bg-green-700"
                                  size="sm"
                                  onClick={() =>
                                    handleMilestoneAction(
                                      milestone.order,
                                      'approve',
                                    )
                                  }
                                >
                                  <CheckCircle className="mr-1.5 h-4 w-4" />
                                  Approve Milestone
                                </Button>
                                <Button
                                  className="bg-amber-500 text-white hover:bg-amber-600"
                                  size="sm"
                                  onClick={() =>
                                    handleMilestoneAction(
                                      milestone.order,
                                      'request_changes',
                                    )
                                  }
                                >
                                  <RefreshCw className="mr-1.5 h-4 w-4" />
                                  Request Changes
                                </Button>
                                <Button
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  size="sm"
                                  onClick={() =>
                                    handleMilestoneAction(
                                      milestone.order,
                                      'reject',
                                    )
                                  }
                                >
                                  <XCircle className="mr-1.5 h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            )}

                            {/* Comments Section */}
                            <div className="mt-6">
                              <h5 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                                <MessageSquare className="h-4 w-4 text-[#63B7B7]" />
                                Comments
                              </h5>

                              <div className="mb-4 space-y-3">
                                <div
                                  key={milestone.submission.id}
                                  className={`rounded-lg p-3 ${'ml-6 bg-[#63B7B7]/10'}`}
                                >
                                  <p className="text-sm text-gray-600">
                                    {milestone.submission.comment}
                                  </p>
                                </div>
                              </div>

                              {/* Add Comment */}
                              <div className="mt-3">
                                <Textarea
                                  placeholder="Add a comment..."
                                  className="mb-2 min-h-[80px] resize-none border-gray-200"
                                  value={commentText}
                                  onChange={(e) =>
                                    setCommentText(e.target.value)
                                  }
                                />
                                <div className="flex justify-end">
                                  <Button
                                    className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
                                    size="sm"
                                    onClick={() =>
                                      handleSubmitComment(milestone.order)
                                    }
                                    disabled={!commentText.trim()}
                                  >
                                    <Send className="mr-1.5 h-4 w-4" />
                                    Send Comment
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
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
