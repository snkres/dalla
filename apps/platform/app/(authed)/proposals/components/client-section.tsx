import { User } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { Avatar, AvatarFallback } from '@dallah/design-system'
import { Progress } from '@dallah/design-system'
import { Star, DollarSign, Globe } from 'lucide-react'
import { ClientSectionProps } from '@lib/types/proposals'

const ClientSection: React.FC<ClientSectionProps> = ({
  proposal,
  isExpanded,
  onToggle,
}) => (
  <ExpandableSection
    title="Client Information"
    icon={<User className="mr-2 h-4 w-4 text-[#63B7B7]" />}
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="mb-4 flex items-center">
      <Avatar className="mr-4 h-12 w-12 border-2 border-[#BEDDF1]">
        <AvatarFallback className="bg-[#63B7B7]/10 font-medium text-[#63B7B7]">
          {proposal.clientName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-medium text-gray-800">
          {proposal.clientName}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <Globe className="mr-1 h-3.5 w-3.5 text-[#63B7B7]" />
          <span>{proposal.clientLocation}</span>
        </div>
      </div>
    </div>
    <div className="mb-2 grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-[#BEDDF1]/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">Client Rating</p>
          <div className="flex items-center">
            <Star className="mr-1 h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium text-gray-800">
              {proposal.clientRating}
            </span>
          </div>
        </div>
        <Progress
          value={proposal.clientRating * 20}
          className="h-1.5 rounded-full bg-gray-100"
          indicatorClassName="bg-amber-500"
        />
      </div>
      <div className="rounded-lg bg-[#BEDDF1]/10 p-4">
        <p className="mb-1 text-xs text-gray-500">Total Spent</p>
        <div className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-lg font-medium text-gray-800">
            {proposal.clientSpend}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {proposal.clientHires} total hires
        </p>
      </div>
    </div>
  </ExpandableSection>
)

export default ClientSection
