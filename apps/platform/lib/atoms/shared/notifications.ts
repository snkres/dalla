import { atom } from 'jotai'
import { Notification } from '@lib/types/navbar'
import { v4 as uuidv4 } from 'uuid'
import { atomWithLocalForage } from '../atom-with-localforge'
import { formatTime } from '@dalla/utils'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

export const notificationsAtom = atomWithLocalForage<Notification[]>(
  'dalla:notifications',
  [],
)

// Atom to track unread notification count for the navbar indicator
export const unreadNotificationCountAtom = atom((get) => {
  const notifications = get(notificationsAtom)
  return notifications.filter((n) => !n.read).length
})

export const mapApiNotificationToLocal = (
  apiNotification: any,
): Notification => {
  return {
    id: apiNotification.id,
    type:
      apiNotification.metadata?.type === 'PROFILE_VIEW'
        ? 'system'
        : apiNotification.type?.toLowerCase() || 'system',
    title: apiNotification.title,
    description: apiNotification.content,
    time: apiNotification.createdAt,
    read: apiNotification.isRead,

    ...(apiNotification.avatar && { avatar: apiNotification.avatar }),
  }
}
