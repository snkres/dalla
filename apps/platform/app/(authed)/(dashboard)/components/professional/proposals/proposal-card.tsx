import { motion } from 'motion/react'
import { cn } from '@dallah/utils'
import { Badge } from '@dallah/design-system'
import {
  Star,
  DollarSign,
  Calendar,
  Globe,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { ProposalCardProps } from '@lib/types/proposals'
import StatusBadge from './status-badge'

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  isSelected,
  onClick,
}) => {
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
        <div className="flex items-center gap-2">
          {proposal.hasBoosted && (
            <Badge className="border-[#63B7B7]/20 bg-[#63B7B7]/10 text-xs text-[#63B7B7]">
              <Star className="mr-1 h-3 w-3 fill-[#63B7B7]" />
              Boosted
            </Badge>
          )}
        </div>
      </div>
      <h3 className="mb-2 line-clamp-1 text-base font-semibold text-gray-800 transition-colors group-hover:text-[#63B7B7]">
        {proposal.title}
      </h3>
      <div className="mb-3 flex flex-wrap gap-y-3">
        <div className="mr-4 flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-sm font-medium text-gray-700">
            {proposal.amount}
          </span>
        </div>
        <div className="mr-4 flex items-center">
          <Calendar className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-sm text-gray-700">
            {proposal.projectDuration}
          </span>
        </div>
        <div className="flex items-center">
          <Globe className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-sm text-gray-700">
            {proposal.clientLocation}
          </span>
        </div>
      </div>
      <div className="mb-4 flex items-center text-xs text-gray-500">
        <Clock className="mr-1.5 h-3.5 w-3.5" />
        <span>
          {proposal.status === 'Submitted' || proposal.status === 'Viewed'
            ? 'Initiated'
            : 'Received'}{' '}
          {proposal.timeAgo}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-2 h-6 w-6">
            <AvatarFallback className="bg-[#63B7B7]/10 text-xs text-[#63B7B7]">
              {proposal.clientName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700">{proposal.clientName}</span>
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
