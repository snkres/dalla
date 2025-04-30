import { Modal, Button, Badge, Riyal } from '@dalla/design-system'
import { useState } from 'react'
import {
  Star,
  MapPin,
  Briefcase,
  FileText,
  User,
  CheckCircle,
  MessageSquare,
  ThumbsDown,
  Award,
  Clock,
  Calendar,
} from 'lucide-react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { GetProjectRes } from '@lib/api/company/projects'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { updateProposalStatus } from '@lib/api/company/proposals'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dalla/design-system'
import { detectLanguage } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'
import { formatCurrency } from '@lib/utils/format-currency'

interface ProposalDetailModalProps {
  proposal: GetProjectRes['data']['proposals'][number] | null
  isOpen: boolean
  onClose: () => void
}

const ProposalDetailModal: React.FC<ProposalDetailModalProps> = ({
  proposal,
  isOpen,
  onClose,
}) => {
  if (!proposal) return null

  const t = useTranslation()
  const { locale } = useLocale()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [showHireDialog, setShowHireDialog] = useState(false)
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)

  const hasMilestones = proposal?.milestones && proposal.milestones.length > 0

  // Calculate total from milestones
  const totalMilestonesAmount = hasMilestones
    ? proposal?.milestones.reduce((sum, milestone) => sum + milestone.price, 0)
    : proposal?.price || 0

  const hireProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal.id) {
        throw new Error('Missing proposal ID')
      }
      return updateProposalStatus(proposal.projectId, proposal.id, 'Accepted')
    },
    onSuccess: () => {
      toast({
        title: 'Proposal accepted',
        description: 'You have successfully hired this professional.',
        variant: 'default',
      })

      setTimeout(() => {
        onClose()
      }, 1500)
    },
    onError: (error) => {
      toast({
        title: 'Error accepting proposal',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['projects'],
        exact: false,
      })
    },
  })

  const declineProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal.id) {
        throw new Error('Missing proposal ID')
      }
      return updateProposalStatus(proposal.projectId, proposal.id, 'Rejected')
    },
    onSuccess: () => {
      toast({
        title: 'Proposal declined',
        description: 'You have declined this proposal.',
        variant: 'default',
      })

      setTimeout(() => {
        onClose()
      }, 1500)
    },
    onError: (error) => {
      toast({
        title: 'Error declining proposal',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['projects'],
        exact: false,
      })
    },
  })

  const handleHire = () => {
    setShowHireDialog(true)
  }

  const confirmHire = () => {
    hireProposalMutation.mutate()
    setShowHireDialog(false)
  }

  const handleDecline = () => {
    setShowDeclineDialog(true)
  }

  const confirmDecline = () => {
    declineProposalMutation.mutate()
    setShowDeclineDialog(false)
  }

  return (
    <TooltipProvider>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Proposal Details"
        width="xl"
      >
        <div
          className="flex h-full flex-col overflow-hidden md:flex-row"
          dir={'ltr'}
        >
          <div
            className="flex-1 overflow-y-auto"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="border-b border-gray-100 p-5">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white">
                    {proposal.professional.UserProfile?.avatar && (
                      <Image
                        src={
                          proposal.professional.UserProfile.avatar ||
                          '/placeholder.svg'
                        }
                        alt={proposal.professional.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <h1 className="text-lg font-medium text-gray-800">
                      {proposal.professional.name}
                    </h1>
                    <Badge className="!border-amber-200 !bg-amber-50 !text-amber-700">
                      {Math.floor(Math.random() * 100)}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {proposal.professional.UserProfile?.headline || 'N/A'}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-700">
                        {proposal.professional.UserProfile?.meta?.rating ||
                          'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      <span>
                        {proposal.professional.UserProfile?.meta?.location ||
                          'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="mr-1 h-3.5 w-3.5" />
                      <span>
                        {proposal.professional.UserProfile?.meta
                          ?.yearsOfExperience || 'N/A'}{' '}
                        yrs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mb-1 flex flex-wrap gap-1.5"
                dir={
                  detectLanguage(
                    proposal.professional.UserProfile?.meta?.skills?.[0] || '',
                  ) === 'arabic'
                    ? 'rtl'
                    : 'ltr'
                }
              >
                {proposal.professional.UserProfile?.meta?.skills?.map(
                  (skill, index) => (
                    <Badge
                      key={index}
                      className="!rounded-md !border-none !bg-[#63B7B7]/5 !px-2 !py-0.5 !text-xs !font-normal !text-[#63B7B7]"
                    >
                      {skill}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            {/* Milestone Section */}
            {hasMilestones && (
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-200 p-3">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                      <Award className="h-3.5 w-3.5 text-[#63B7B7]" />
                    </div>
                    <h2 className="text-sm font-medium text-gray-800">
                      Project Milestones
                    </h2>
                  </div>
                  <Badge className="!border-[#63B7B7]/20 !bg-[#63B7B7]/10 !text-[#63B7B7]">
                    {proposal.milestones.length} Milestones
                  </Badge>
                </div>
                <div className="p-5">
                  {/* Milestone Timeline Visualization */}
                  <div className="mb-6">
                    <div className="flex h-8 w-full overflow-hidden rounded-full">
                      {proposal.milestones.map((milestone, index) => {
                        const percentage =
                          (milestone.price / totalMilestonesAmount) * 100
                        return (
                          <div
                            key={index}
                            className="group relative flex items-center justify-center transition-all duration-300 hover:brightness-90"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: `hsl(180, 35%, ${60 - index * 5}%)`,
                            }}
                            onClick={() =>
                              setActiveMilestone(
                                activeMilestone === index ? null : index,
                              )
                            }
                          >
                            <span className="text-xs font-medium text-white">
                              {index + 1}
                            </span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="absolute inset-0 cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className="border-none bg-gray-800 text-white"
                              >
                                {milestone.title}:{' '}
                                {formatCurrency(milestone.price, locale)} (
                                {Math.round(percentage)}%)
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>Project Start</span>
                      <span>Project Completion</span>
                    </div>
                  </div>

                  {/* Milestone Details */}
                  <div className="relative mt-8 space-y-6">
                    {/* Visual timeline connector */}
                    <div className="absolute left-[22px] top-0 h-full w-0.5 bg-[#63B7B7]/20"></div>

                    {proposal.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`relative mb-6 last:mb-0 ${activeMilestone === index ? 'z-10' : ''}`}
                      >
                        {/* Timeline node */}
                        <div
                          className={`absolute left-0 top-0 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 ${
                            activeMilestone === index
                              ? 'border-[#63B7B7] bg-[#63B7B7] text-white'
                              : 'border-[#63B7B7] bg-white text-[#63B7B7]'
                          } text-sm font-medium`}
                          onClick={() =>
                            setActiveMilestone(
                              activeMilestone === index ? null : index,
                            )
                          }
                        >
                          {index + 1}
                        </div>

                        <div
                          className={`ml-16 overflow-hidden rounded-xl border transition-all duration-200 ${
                            activeMilestone === index
                              ? 'border-[#63B7B7] shadow-md'
                              : 'border-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between border-b border-gray-100 bg-[#BEDDF1]/5 p-3">
                            <span className="text-sm font-medium text-gray-700">
                              {milestone.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-[#63B7B7]/10 px-2 py-0.5">
                                <span className="text-xs font-medium text-[#63B7B7]">
                                  {formatCurrency(milestone.price, locale)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="mb-4">
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
                                    {milestone.order} of{' '}
                                    {proposal.milestones.length}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-b border-gray-100">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h2 className="text-sm font-medium text-gray-800">
                  Cover Letter
                </h2>
              </div>
              <div className="p-5">
                <p
                  className="text-sm leading-relaxed text-gray-600"
                  dir={
                    detectLanguage(
                      proposal.description || 'No cover letter provided.',
                    ) === 'arabic'
                      ? 'rtl'
                      : 'ltr'
                  }
                >
                  {proposal.description || 'No cover letter provided.'}
                </p>
              </div>
            </div>

            <div className="border-b border-gray-100">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <User className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h2 className="text-sm font-medium text-gray-800">Timeline</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-700" dir={'ltr'}>
                  {proposal.timeline}
                </p>
              </div>
            </div>

            <div className="border-b border-gray-100">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <Riyal className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-sm font-medium text-gray-800">Rate</h2>
              </div>
              <div className="p-5">
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(proposal.price || 0, locale)}
                </span>
              </div>
            </div>

            <div className="">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h2 className="text-sm font-medium text-gray-800">
                  Attachments
                </h2>
              </div>
              <div className="p-5">
                {proposal.media?.length && proposal.media?.length > 0 ? (
                  <div className="space-y-2">
                    {proposal.media?.map((file, index) => (
                      <a
                        key={index}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-md bg-gray-50 p-2 transition-colors hover:bg-gray-100"
                      >
                        <span className="text-sm text-gray-700">
                          Attachment {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          Download
                        </Button>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No attachments provided
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className="w-full overflow-y-auto rounded-r-3xl border-r border-t border-gray-100 bg-gray-50 md:w-64 md:border-l md:border-t-0 lg:w-72"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="space-y-3">
              <div className="border-b border-gray-200">
                <div className="flex items-center border-b border-gray-200 p-3">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <Riyal className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">Actions</h3>
                </div>
                <div className="space-y-3 p-6 px-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rate</span>
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(proposal.price || 0, locale)}
                    </span>
                  </div>

                  {/* Display milestone information in sidebar if available */}
                  {hasMilestones && (
                    <div className="rounded-lg border border-[#63B7B7]/20 bg-[#63B7B7]/5 p-3">
                      <h4 className="mb-2 text-xs font-medium text-[#63B7B7]">
                        Milestone-Based Payment
                      </h4>
                      <div className="space-y-2">
                        {proposal.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-600">
                              {milestone.title}
                            </span>
                            <span className="font-medium text-gray-800">
                              {formatCurrency(milestone.price, locale)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Timeline</span>
                    <span
                      className="font-normal text-gray-800"
                      dir={
                        detectLanguage(proposal.timeline || 'N/A') === 'arabic'
                          ? 'rtl'
                          : 'ltr'
                      }
                    >
                      {proposal.timeline || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Submitted</span>
                    <span className="font-normal text-gray-800" dir="ltr">
                      {proposal.createdAt
                        ? new Date(proposal.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="my-2 !h-0.5 !w-full !bg-gray-200" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <Badge
                      className={
                        proposal.status === 'Rejected'
                          ? '!border-red-200 !bg-red-50 !text-red-700'
                          : proposal.status === 'Accepted'
                            ? '!border-[#64B7B7] !bg-green-50 !text-green-700'
                            : '!border-amber-200 !bg-amber-50 !text-amber-700'
                      }
                    >
                      {proposal.status === 'Rejected'
                        ? 'Rejected'
                        : proposal.status === 'Accepted'
                          ? 'Accepted'
                          : proposal.status === 'Pending'
                            ? 'Pending Review'
                            : proposal.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 p-4">
                <Button
                  className="mb-2 h-9 w-full !bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90"
                  onClick={handleHire}
                  disabled={
                    hireProposalMutation.isPending ||
                    declineProposalMutation.isPending ||
                    proposal.status === 'Rejected' ||
                    proposal.status === 'Accepted'
                  }
                >
                  {hireProposalMutation.isPending ? 'Processing...' : 'Hire'}
                </Button>

                <Button
                  variant="outline"
                  className="mb-2 h-9 w-full border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/5"
                >
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                  Message
                </Button>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="ghost"
                    className="h-9 flex-1 text-gray-700 hover:bg-gray-100"
                    onClick={handleDecline}
                    disabled={
                      hireProposalMutation.isPending ||
                      declineProposalMutation.isPending ||
                      proposal.status === 'Rejected' ||
                      proposal.status === 'Accepted'
                    }
                  >
                    <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                    {declineProposalMutation.isPending
                      ? 'Processing...'
                      : 'Decline'}
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="rounded-lg border border-gray-200 bg-white p-3">
                  <h4 className="mb-2 text-xs font-medium text-gray-800">
                    View Full Profile
                  </h4>
                  <p className="mb-3 text-xs text-gray-600">
                    See this consultant&apos;s complete work history, portfolio,
                    and reviews.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-full text-xs"
                    asChild
                  >
                    <Link
                      href={`/professionals/${proposal.professional.username}`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Hiring</DialogTitle>
              <DialogDescription>
                {`Are you sure you want to hire this professional for ${formatCurrency(proposal.price || 0, locale)}?`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowHireDialog(false)}
                disabled={hireProposalMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmHire}
                disabled={hireProposalMutation.isPending}
                className="!bg-[#63B7B7] hover:!bg-[#63B7B7]/90"
              >
                {hireProposalMutation.isPending
                  ? 'Processing...'
                  : 'Confirm Hire'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Decline</DialogTitle>
              <DialogDescription>
                Are you sure you want to decline this proposal? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeclineDialog(false)}
                disabled={declineProposalMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDecline}
                disabled={declineProposalMutation.isPending}
              >
                {declineProposalMutation.isPending
                  ? 'Processing...'
                  : 'Confirm Decline'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Modal>
    </TooltipProvider>
  )
}

export default ProposalDetailModal
