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
import { GetAllProposalsRes, getProposalById } from '@lib/api/pro/proposals'
import { useQuery } from '@tanstack/react-query'

const ProposalDetails: React.FC<{
  proposalId: string
  projectId: string
  isMobile: boolean
  onClose?: () => void
}> = ({ proposalId, projectId, isMobile, onClose }) => {
  const { data } = useQuery({
    queryKey: ['proposals', 'professional', proposalId],
    queryFn: () => getProposalById(proposalId, projectId),
  })
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const toggleSection = (section: string) =>
    setExpandedSection(expandedSection === section ? null : section)

  if (!data) return <ProposalDetailsEmpty />

  // Safely access nested properties from the API proposal
  const project = data.project || {}
  const meta = project.meta || {}
  const company = project.company || {}
  const companyProfile = company.CompanyProfile || {}
  const companyMeta = companyProfile.meta || {}

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.id}
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
                <StatusBadge status={data.status} />
                <span className="text-sm text-gray-500">
                  {data.lastActivity}
                </span>
              </div>
              <h1 className="mb-1 text-xl font-semibold text-gray-800">
                {data.title}
              </h1>
              <div className="flex flex-wrap gap-y-2">
                <div className="mr-4 flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{data.amount}</span>
                </div>
                <div className="mr-4 flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {data.projectDuration}
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {data.clientLocation}
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
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact client</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>View project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  Withdraw proposal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-6">
            <ClientSection
              proposal={data}
              isExpanded={expandedSection === 'client'}
              onToggle={() => toggleSection('client')}
            />
            <CoverLetterSection
              proposal={data}
              isExpanded={expandedSection === 'coverLetter'}
              onToggle={() => toggleSection('coverLetter')}
            />
            <SkillsSection
              proposal={data}
              isExpanded={expandedSection === 'skills'}
              onToggle={() => toggleSection('skills')}
            />
            <InsightsSection
              proposal={data}
              isExpanded={expandedSection === 'insights'}
              onToggle={() => toggleSection('insights')}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProposalDetails
