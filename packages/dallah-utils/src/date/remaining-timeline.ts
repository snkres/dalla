/**
 * Calculates and formats the remaining time for a project
 * @param timeline Timeline string (e.g., "1 week", "2 days")
 * @param startDate Project start date
 * @returns Formatted string showing remaining time
 */
export function getRemainingTime(timeline: string, startDate: Date): string {
  // Parse the timeline string
  const timelineMatch = timeline.match(/^(\d+)\s+(\w+)$/)
  if (!timelineMatch) {
    return 'Timeline format unknown'
  }

  const [_, amount, unit] = timelineMatch
  const numericAmount = parseInt(amount, 10)

  // Convert timeline to days
  let daysTotal = 0

  switch (unit.toLowerCase()) {
    case 'day':
    case 'days':
      daysTotal = numericAmount
      break
    case 'week':
    case 'weeks':
      daysTotal = numericAmount * 7
      break
    case 'month':
    case 'months':
      daysTotal = numericAmount * 30 // Approximation
      break
    default:
      return 'Unknown time unit'
  }

  // Calculate elapsed time
  const now = new Date()
  const elapsedDays = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  // Calculate remaining days
  const remainingDays = Math.max(0, daysTotal - elapsedDays)

  // Format the output
  if (remainingDays === 0) {
    return 'Due today'
  } else if (remainingDays === 1) {
    return '1 day left'
  } else if (remainingDays < 7) {
    return `${remainingDays} days left`
  } else if (remainingDays < 14) {
    return '1 week left'
  } else if (remainingDays < 30) {
    return `${Math.floor(remainingDays / 7)} weeks left`
  } else if (remainingDays < 60) {
    return '1 month left'
  } else {
    return `${Math.floor(remainingDays / 30)} months left`
  }
}
