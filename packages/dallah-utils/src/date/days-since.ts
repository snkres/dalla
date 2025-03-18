import { formatDistanceToNow } from 'date-fns'

export const calculateDaysSince = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}
