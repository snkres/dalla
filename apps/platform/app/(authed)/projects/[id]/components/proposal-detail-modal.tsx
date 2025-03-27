import { Modal, Button, Badge } from '@dallah/design-system'
import { useState } from 'react'
import {
  Star,
  MapPin,
  Briefcase,
  FileText,
  User,
  CheckCircle,
  DollarSign,
  MessageSquare,
  ThumbsDown,
} from 'lucide-react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { GetProjectRes } from '@lib/api/company/projects'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { updateProposalStatus } from '@lib/api/company/proposals'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dallah/design-system'

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

  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [showHireDialog, setShowHireDialog] = useState(false)
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Proposal Details"
      width="lg"
    >
      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        <div className="flex-1 overflow-y-auto">
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
                  <div className="flex items-center">
                    <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-700">
                      {proposal.professional.UserProfile?.meta?.rating || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>
                      {proposal.professional.UserProfile?.meta?.location ||
                        'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
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

            <div className="mb-1 flex flex-wrap gap-1.5">
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
              <p className="text-sm leading-relaxed text-gray-600">
                {proposal.description || 'No cover letter provided.'}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <User className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                Consultant Information
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Experience
                    </span>
                  </div>
                  <p className="ml-5 text-sm font-medium text-gray-900">
                    {proposal.professional.UserProfile?.meta
                      ?.yearsOfExperience || 'N/A'}{' '}
                    years
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Projects Completed
                    </span>
                  </div>
                  <p className="ml-5 text-sm font-medium text-gray-900">
                    {proposal.professional.UserProfile?.meta
                      ?.projectsCompleted || '0'}{' '}
                    projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-y-auto rounded-r-3xl border-r border-t border-gray-100 bg-gray-50 md:w-64 md:border-l md:border-t-0 lg:w-72">
          <div className="space-y-3">
            <div className="border-b border-gray-200">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <DollarSign className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Proposal Details
                </h3>
              </div>
              <div className="space-y-3 p-6 px-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-800">
                    $ {proposal.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Time</span>
                  <span className="font-normal text-gray-800">
                    {proposal.timeline || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submitted</span>
                  <span className="font-normal text-gray-800">
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
                          ? '!border-green-200 !bg-green-50 !text-green-700'
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
                    View Profile
                  </Link>
                </Button>
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
          </div>
        </div>
      </div>

      <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Hiring</DialogTitle>
            <DialogDescription>
              Are you sure you want to hire {proposal.professional.name}? This
              will accept their proposal and notify them to begin the project.
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
              Are you sure you want to decline this proposal from{' '}
              {proposal.professional.name}? This action cannot be undone.
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
  )
}

export default ProposalDetailModal
