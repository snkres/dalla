import { formatDistanceToNow } from 'date-fns'

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const createdFromNow = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true })
}
