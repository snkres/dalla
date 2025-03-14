import { Badge } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'
import { StatusBadgeProps } from '@lib/types/proposals'

const StatusBadge: React.FC<{
  status: GetAllProposalsRes['data']['0'][number]['status']
}> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interviewing':
        return '!bg-green-50 !text-green-600 !border-green-200'
      case 'In review':
        return '!bg-amber-50 !text-amber-600 !border-amber-200'
      case 'Viewed':
        return '!bg-blue-50 !text-blue-600 !border-blue-200'
      default:
        return '!bg-gray-100 !text-gray-600 !border-gray-200'
    }
  }
  return (
    <Badge
      className={cn(
        'px-2.5 py-0.5 text-xs font-medium',
        getStatusColor(status),
      )}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
