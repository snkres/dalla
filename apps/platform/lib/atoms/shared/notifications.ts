import { atom } from 'jotai'
import { Notification } from '@lib/types/navbar'
import { v4 as uuidv4 } from 'uuid'
import { atomWithLocalForage } from '../atom-with-localforge'
import { formatTime } from '@dalla/utils'

export const notificationsAtom = atomWithLocalForage<Notification[]>(
  'dalla:notifications',
  [],
)

export const addNotificationAtom = atom(
  null,
  (get, set, notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      time: formatTime(),
      read: false,
    }

    set(notificationsAtom, [newNotification, ...get(notificationsAtom)])
    return newNotification.id
  },
)

export const markNotificationAsReadAtom = atom(null, (get, set, id: string) => {
  const notifications = get(notificationsAtom)
  set(
    notificationsAtom,
    notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    ),
  )
})

export const markAllNotificationsAsReadAtom = atom(null, (get, set) => {
  const notifications = get(notificationsAtom)
  set(
    notificationsAtom,
    notifications.map((notification) => ({ ...notification, read: true })),
  )
})

export const dismissNotificationAtom = atom(null, (get, set, id: string) => {
  const notifications = get(notificationsAtom)
  set(
    notificationsAtom,
    notifications.filter((notification) => notification.id !== id),
  )
})

export const unreadNotificationCountAtom = atom((get) => {
  const notifications = get(notificationsAtom)
  return notifications.filter((notification) => !notification.read).length
})

export const createProjectNotification = (projectTitle: string) => ({
  type: 'project' as const,
  title: 'Project Created Successfully',
  description: `Your project "${projectTitle}" has been accepted and listed for receiving professionals' proposals.`,
})
