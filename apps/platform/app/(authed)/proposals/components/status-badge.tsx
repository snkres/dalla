import { Badge } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { GetAllProposalsRes, ProposalStatus } from '@lib/api/pro/proposals'

// Function to map API statuses to user-friendly display text
const getStatusDisplayText = (status: string): string => {
  switch (status) {
    case 'Accepted':
      return 'Accepted'
    case 'Rejected':
      return 'Rejected'
    case 'Pending':
      return 'Pending'
    default:
      return status
  }
}

const StatusBadge: React.FC<{
  status: GetAllProposalsRes['data']['0'][number]['status']
}> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '!bg-green-50 !text-green-600 !border-[#64B7B7]'
      case 'Rejected':
        return '!bg-red-50 !text-red-600 !border-red-200'
      case 'Pending':
      default:
        return '!bg-amber-50 !text-amber-600 !border-amber-200'
    }
  }

  return (
    <Badge
      className={cn(
        'px-2.5 py-0.5 text-xs font-medium',
        getStatusColor(status),
      )}
    >
      {getStatusDisplayText(status)}
    </Badge>
  )
}

export default StatusBadge
