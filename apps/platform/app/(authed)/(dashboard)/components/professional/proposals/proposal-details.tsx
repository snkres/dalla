import ProposalDetailsEmpty from './proposal-details-empty'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@dallah/utils'
import { Button } from '@dallah/design-system'
import {
  ChevronLeft,
  MoreHorizontal,
  ExternalLink,
  Mail,
  DollarSign,
  Calendar,
  Globe,
  Clock,
} from 'lucide-react'
import StatusBadge from './status-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@dallah/design-system'
import ClientSection from './client-section'
import CoverLetterSection from './cover-letter-section'
import SkillsSection from './skills-section'
import InsightsSection from './inisghts-section'
import { ProposalDetailsProps } from '@lib/types/proposals'

const ProposalDetails: React.FC<ProposalDetailsProps> = ({
  proposal,
  isMobile,
  onClose,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const toggleSection = (section: string) =>
    setExpandedSection(expandedSection === section ? null : section)

  if (!proposal) return <ProposalDetailsEmpty />

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={proposal.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden rounded-xl bg-white',
          isMobile ? 'fixed inset-0 z-50' : '',
        )}
      >
        {isMobile && (
          <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white p-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex items-center text-[#63B7B7] transition-colors hover:bg-[#63B7B7]/10 hover:text-[#63B7B7]/80"
            >
              <ChevronLeft className="mr-1 h-5 w-5" />
              <span className="font-medium">Back to proposals</span>
            </Button>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <div className="border-b border-gray-100 bg-gradient-to-r from-[#BEDDF1]/10 to-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <StatusBadge status={proposal.status} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#63B7B7]/10"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-lg border border-gray-100 bg-white p-1 shadow-lg"
                >
                  <DropdownMenuItem className="cursor-pointer rounded-md py-2 text-sm hover:bg-[#BEDDF1]/10">
                    <ExternalLink className="mr-2 h-4 w-4 text-[#63B7B7]" />
                    View original project
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-md py-2 text-sm hover:bg-[#BEDDF1]/10">
                    <Mail className="mr-2 h-4 w-4 text-[#63B7B7]" />
                    Message client
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem className="cursor-pointer rounded-md py-2 text-sm text-red-500 hover:bg-red-50">
                    Withdraw proposal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {proposal.title}
            </h2>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center rounded-lg bg-[#BEDDF1]/10 p-3">
                <DollarSign className="mr-2 h-5 w-5 text-[#63B7B7]" />
                <div>
                  <p className="text-xs text-gray-500">Bid amount</p>
                  <p className="text-base font-semibold text-gray-800">
                    {proposal.amount}
                  </p>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-[#BEDDF1]/10 p-3">
                <Calendar className="mr-2 h-5 w-5 text-[#63B7B7]" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-base font-semibold text-gray-800">
                    {proposal.projectDuration}
                  </p>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-[#BEDDF1]/10 p-3">
                <Globe className="mr-2 h-5 w-5 text-[#63B7B7]" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-base font-semibold text-gray-800">
                    {proposal.clientLocation}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-[#63B7B7]/5 p-4">
              <div className="mb-2 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                <h3 className="text-sm font-medium text-gray-800">
                  Recent Activity
                </h3>
              </div>
              <p className="text-sm text-gray-700">{proposal.lastActivity}</p>
            </div>
          </div>
          <div className="p-6">
            <ClientSection
              proposal={proposal}
              isExpanded={expandedSection === 'client'}
              onToggle={() => toggleSection('client')}
            />
            <CoverLetterSection
              proposal={proposal}
              isExpanded={expandedSection === 'coverLetter'}
              onToggle={() => toggleSection('coverLetter')}
            />
            <SkillsSection
              proposal={proposal}
              isExpanded={expandedSection === 'skills'}
              onToggle={() => toggleSection('skills')}
            />
            <InsightsSection
              proposal={proposal}
              isExpanded={expandedSection === 'insights'}
              onToggle={() => toggleSection('insights')}
            />
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-between border-t border-gray-100 bg-white p-4">
          <Button
            variant="outline"
            size="sm"
            className="border-[#63B7B7]/30 px-4 py-2 text-[#63B7B7] hover:bg-[#63B7B7]/5"
          >
            <Mail className="mr-2 h-4 w-4" />
            Message Client
          </Button>
          <Button
            size="sm"
            className="bg-[#63B7B7] px-4 py-2 text-white hover:bg-[#63B7B7]/90"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Project
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProposalDetails
