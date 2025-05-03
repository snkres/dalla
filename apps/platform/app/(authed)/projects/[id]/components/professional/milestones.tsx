import { Milestone } from '@lib/types/project'
import {
  Award,
  Calendar,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Clock,
  Send,
  PartyPopper,
  MessageCircle,
} from 'lucide-react'
import { Button, Progress, Badge } from '@dalla/design-system'
import { formatCurrency } from '@lib/utils/format-currency'
import { GetProjectRes } from '@lib/api/company/projects'
import { useTransitionRouter } from 'next-view-transitions'
import { useState } from 'react'
import Image from 'next/image'
import { Textarea } from '@dalla/design-system'
import { MilestoneSubmissionModal } from './milestone-submission-modal'

export function ProfessionalMilestones({
  isAssigned,
  milestones,
  project,
}: {
  isAssigned: boolean
  milestones: Milestone[]
  project: GetProjectRes['data']
}) {
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false)

  const currentMilestone = milestones.find((m) => m.status !== 'Completed')

  const totalMilestones = milestones?.length || 0
  const completedMilestones =
    isAssigned && milestones
      ? milestones.filter((m) => m.status === 'Completed').length
      : 0
  const milestoneProgress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  if (!isAssigned) {
    return null
  }

  const lastSubmission = currentMilestone?.submissions?.find(
    (s) =>
      s.updatedAt ===
      currentMilestone?.submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0].updatedAt,
  )

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/10">
              <Award className="h-4 w-4 text-[#63B7B7]" />
            </div>
            <h2 className="text-base font-medium text-gray-800">
              Project Milestones
            </h2>
          </div>
          <div className="flex items-center gap-2">
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
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">
                Milestone Progress
              </span>
              <span className="font-medium text-[#63B7B7]">
                {Math.round(milestoneProgress)}%
              </span>
            </div>
            <Progress
              value={milestoneProgress}
              className="h-2.5 bg-[#63B7B7]/10"
              indicatorClassName="!bg-[#63B7B7]"
            />
          </div>

          {currentMilestone && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Current Milestone: {currentMilestone.order} of {totalMilestones}
              </h3>
              <div className="overflow-hidden rounded-xl border border-[#63B7B7] bg-white shadow-md">
                <div className="flex items-center justify-between border-b border-gray-100 bg-[#BEDDF1]/5 p-3">
                  <span className="text-sm font-medium text-gray-700">
                    {currentMilestone.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#63B7B7]/10 px-2 py-1">
                      <span className="text-xs font-medium text-[#63B7B7]">
                        {formatCurrency(currentMilestone.price)}
                      </span>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 ${
                        currentMilestone.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : currentMilestone.status === 'Pending' &&
                              !currentMilestone.submissions
                            ? 'bg-amber-100 text-amber-700'
                            : currentMilestone.status === 'Pending' &&
                                currentMilestone.submissions
                              ? 'bg-blue-100 text-blue-700'
                              : currentMilestone.status === 'Changes'
                                ? 'bg-yellow-100 text-yellow-700'
                                : currentMilestone.status === 'Rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {currentMilestone.status === 'Pending' &&
                        lastSubmission?.status === 'Pending'
                          ? 'In Review'
                          : currentMilestone.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {currentMilestone.description}
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
                          {currentMilestone.timeline}
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
                          {currentMilestone.order} of {totalMilestones}
                        </span>
                      </div>
                    </div>
                  </div>

                  {lastSubmission && (
                    <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-[#63B7B7]" />
                        <span className="text-xs font-medium text-gray-700">
                          Submission
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {lastSubmission.description}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {lastSubmission.media?.map((media, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={media || '/placeholder.svg'}
                              alt={`Submission ${index + 1}`}
                              width={200}
                              height={150}
                              className="aspect-video rounded-md object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {lastSubmission.comment && (
                        <div className="mt-4 space-y-3">
                          <div
                            key={lastSubmission.id}
                            className="rounded-md border border-gray-200 bg-gray-50 p-3"
                          >
                            <p className="text-sm text-gray-700">
                              {lastSubmission.comment}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {currentMilestone.status === 'Pending' && !lastSubmission && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        size="sm"
                        className="h-8 !bg-[#63B7B7] text-xs text-white hover:!bg-[#63B7B7]/90"
                        onClick={() => setIsSubmissionModalOpen(true)}
                      >
                        Submit Work
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!currentMilestone && (
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 p-8 text-center">
              <PartyPopper className="mb-4 h-12 w-12 text-green-500" />
              <h3 className="mb-2 text-lg font-semibold text-green-800">
                Project Completed!
              </h3>
              <p className="text-sm text-green-700">
                All milestones for this project have been successfully
                completed.
              </p>
            </div>
          )}
        </div>
      </div>

      {currentMilestone && (
        <MilestoneSubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          projectId={project.id}
          milestone={currentMilestone}
        />
      )}
    </>
  )
}
