import { motion } from 'motion/react'
import { cn } from '@dallah/utils'
import { Badge } from '@dallah/design-system'
import { Star, Calendar, Globe, Clock, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback } from '@dallah/design-system'
import { Button } from '@dallah/design-system'

import StatusBadge from './status-badge'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'
import { formatCurrency } from '@lib/utils/format-currency'

const ProposalCard: React.FC<{
  proposal: GetAllProposalsRes['data']['0'][number]
  isSelected: boolean
  onClick: () => void
}> = ({ proposal, isSelected, onClick }) => {
  function getTimeAgo(arg0: Date) {
    const now = new Date()
    const diffMs = now.getTime() - arg0.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7)
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`
    } else {
      const diffMonths = Math.floor(diffDays / 30)
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
    }
  }

  // Safely access nested properties
  const project = proposal.project || {}
  const meta = project.meta || {}
  const company = project.company || {}
  const companyName = company.name || 'Unknown Client'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'mb-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md',
        isSelected ? 'border-l-4 border-l-[#63B7B7] bg-[#BEDDF1]/5' : '',
      )}
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between">
        <StatusBadge status={proposal.status} />
      </div>
      <h3 className="mb-2 line-clamp-1 text-base font-semibold text-gray-800 transition-colors group-hover:text-[#63B7B7]">
        {project.title || 'Untitled Project'}
      </h3>
      <div className="mb-3 flex flex-wrap gap-y-3">
        <div className="mr-4 flex items-center">
          <span className="text-sm font-medium text-gray-700">
            {formatCurrency(meta.budget || 0)}
          </span>
        </div>
        <div className="mr-4 flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-sm text-gray-700">
            {meta.duration || 'Not specified'}
          </span>
        </div>
      </div>
      <div className="mb-4 flex items-center text-xs text-gray-500">
        <Clock className="mr-1.5 h-3.5 w-3.5" />
        <span>
          {proposal.status === 'Pending' || proposal.status === 'Accepted'
            ? 'Initiated'
            : 'Sent'}{' '}
          {getTimeAgo(new Date(proposal.createdAt))}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-2 h-6 w-6">
            <AvatarFallback className="bg-[#63B7B7]/10 text-xs text-[#63B7B7]">
              {companyName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700">{companyName}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 rounded-lg text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10 hover:text-[#63B7B7]"
        >
          View details
          <ChevronRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}

export default ProposalCard
