import { Badge } from '@dalla/design-system'

export function ProficiencyBadge({ proficiency }: { proficiency: string }) {
  const getColor = () => {
    switch (proficiency) {
      case 'Native':
        return '!bg-[#63B7B7]/25 !text-[#63B7B7]'
      case 'Fluent':
        return '!bg-[#63B7B7]/20 !text-[#63B7B7]/90'
      case 'Conversational':
        return '!bg-[#BEDDF1]/30 !text-[#63B7B7]/80'
      case 'Intermediate':
        return '!bg-[#BEDDF1]/20 !text-[#63B7B7]/70'
      case 'Beginner':
        return '!bg-[#BEDDF1]/10 !text-[#63B7B7]/60'
      default:
        return '!bg-gray-100 !text-gray-600'
    }
  }

  return <Badge className={`${getColor()} border-0`}>{proficiency}</Badge>
}
