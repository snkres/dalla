export function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()

  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) {
    return 'just now'
  }

  if (diffSec < 3600) {
    const minutes = Math.floor(diffSec / 60)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  }

  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  }

  if (diffSec < 604800) {
    const days = Math.floor(diffSec / 86400)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  }

  return past.toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
