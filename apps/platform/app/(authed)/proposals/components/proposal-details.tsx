'use client'

import type React from 'react'
import ProposalDetailsEmpty from './proposal-details-empty'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@dallah/utils'
import { Button } from '@dallah/design-system'
import {
  ChevronLeft,
  MoreHorizontal,
  ExternalLink,
  DollarSign,
  Calendar,
  Globe,
} from 'lucide-react'
import StatusBadge from './status-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dallah/design-system'
import ClientSection from './client-section'
import CoverLetterSection from './cover-letter-section'
import InsightsSection from './inisghts-section'
import { getProposalById, deleteProposal } from '@lib/api/pro/proposals'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'

const ProposalDetails: React.FC<{
  proposalId: string
  projectId: string
  isMobile: boolean
  onClose: () => void
}> = ({ proposalId, projectId, isMobile, onClose }) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)

  const { data } = useQuery({
    queryKey: ['proposals', 'professional', proposalId],
    queryFn: () => getProposalById(proposalId, projectId),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteProposal(proposalId, projectId),
    onMutate: () => {
      setIsDeleting(true)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals', 'professional'] })

      toast({
        title: 'Proposal withdrawn',
        description: 'Your proposal has been successfully withdrawn.',
        variant: 'default',
      })

      onClose()
    },
    onError: (error) => {
      toast({
        title: 'Error withdrawing proposal',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
      setIsDeleting(false)
    },
    onSettled: () => {
      setIsDeleting(false)
    },
  })

  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const toggleSection = (section: string) =>
    setExpandedSection(expandedSection === section ? null : section)

  const handleWithdrawProposal = () => {
    setShowWithdrawDialog(true)
  }

  const confirmWithdrawal = () => {
    deleteMutation.mutate()
    setShowWithdrawDialog(false)
  }

  if (!data) return <ProposalDetailsEmpty />

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.data.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-xl bg-white',
          isMobile ? 'shadow-lg' : 'shadow-sm',
        )}
      >
        {isMobile && onClose && (
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={onClose}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Proposal Details</h2>
            <div className="w-8" />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <StatusBadge status={data.data.status} />
                <span className="text-sm text-gray-500">
                  {new Date(data.data.createdAt).toLocaleDateString('en-UK', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h1 className="mb-1 text-xl font-semibold text-gray-800">
                {data.data.project.title}
              </h1>
              <div className="flex flex-wrap gap-y-2">
                <div className="mr-4 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {data.data.project.meta.budget}
                  </span>
                </div>
                <div className="mr-4 flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {data.data.project.meta.duration}
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {/* TODO: get from API */}
                    Cairo, Egypt
                  </span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={isDeleting}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact client</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>View project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={handleWithdrawProposal}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Withdrawing...' : 'Withdraw proposal'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-6">
            <ClientSection
              data={{
                // TODO: get client from API
                clientName: 'Dallah',
                clientLocation: 'Egypt',
                clientRating: 4.5,
                clientSpend: 1000,
                clientHires: 10,
              }}
              isExpanded={expandedSection === 'client'}
              onToggle={() => toggleSection('client')}
            />
            <CoverLetterSection
              data={{
                coverLetter: data.data.description,
              }}
              isExpanded={expandedSection === 'coverLetter'}
              onToggle={() => toggleSection('coverLetter')}
            />
            {/* <SkillsSection
              data={{
                skills: data.data.professiona,
              }}
              isExpanded={expandedSection === 'skills'}
              onToggle={() => toggleSection('skills')}
            /> */}
            <InsightsSection
              data={{
                // TODO: get from API
                proposalViews: 10,
                competingProposals: 10,
                interviewRate: 10,
              }}
              isExpanded={expandedSection === 'insights'}
              onToggle={() => toggleSection('insights')}
            />
          </div>
        </div>
      </motion.div>
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Proposal</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw this proposal? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowWithdrawDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmWithdrawal}
              disabled={isDeleting}
            >
              {isDeleting ? 'Withdrawing...' : 'Withdraw Proposal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  )
}

export default ProposalDetails
