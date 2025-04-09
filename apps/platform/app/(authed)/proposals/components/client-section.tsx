import { User } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { Avatar, AvatarFallback, AvatarImage } from '@dallah/design-system'
import { Progress } from '@dallah/design-system'
import { Star, Globe } from 'lucide-react'

interface ClientSectionProps {
  data: {
    clientName: string
    clientLocation: string
    clientRating: number
    clientSpend: number
    clientHires: number
    clientLogo: string
  }
  isExpanded: boolean
  onToggle: () => void
}

const ClientSection: React.FC<ClientSectionProps> = ({
  data,
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
        <AvatarImage src={data.clientLogo} />
        <AvatarFallback className="bg-[#63B7B7]/10 font-medium text-[#63B7B7]">
          {data.clientName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-medium text-gray-800">{data.clientName}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Globe className="mr-1 h-3.5 w-3.5 text-[#63B7B7]" />
          <span>{data.clientLocation}</span>
        </div>
      </div>
    </div>
    {/* <div className="mb-2 grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-[#BEDDF1]/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">Client Rating</p>
          <div className="flex items-center">
            <Star className="mr-1 h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium text-gray-800">
              {data.clientRating}
            </span>
          </div>
        </div>
        <Progress
          value={data.clientRating * 20}
          className="h-1.5 rounded-full bg-gray-100"
          indicatorClassName="bg-amber-500"
        />
      </div>
      <div className="rounded-lg bg-[#BEDDF1]/10 p-4">
        <p className="mb-1 text-xs text-gray-500">Total Spent</p>
        <div className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-[#63B7B7]" />
          <span className="text-lg font-medium text-gray-800">
            {data.clientSpend}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {data.clientHires} total hires
        </p>
      </div>
    </div> */}
  </ExpandableSection>
)

export default ClientSection
