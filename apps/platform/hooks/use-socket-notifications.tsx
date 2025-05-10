import { useEffect, useCallback, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  initializeSocket,
  getSocket,
  disconnectSocket,
} from '@lib/services/socket'
import { useAtom } from 'jotai'
import {
  notificationsAtom,
  mapApiNotificationToLocal,
} from '@lib/atoms/shared/notifications'
import type {
  Notification,
  GetAllNotificationResponse,
} from '@lib/api/shared/notifications'
export function useSocketNotifications() {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useAtom(notificationsAtom)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null)

  const setupSocket = useCallback(() => {
    try {
      console.log('Setting up socket connection...')
      const socket = initializeSocket()

      if (!socket) {
        console.error('Failed to initialize socket - null socket returned')
        scheduleReconnect()
        return null
      }

      return socket
    } catch (error) {
      console.error('Error setting up socket:', error)
      scheduleReconnect()
      return null
    }
  }, [])

  const scheduleReconnect = useCallback(() => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached, giving up')
      return
    }

    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current)
    }

    reconnectAttempts.current += 1

    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttempts.current - 1),
      16000,
    )

    console.log(
      `Scheduling reconnect attempt ${reconnectAttempts.current}/${maxReconnectAttempts} in ${delay}ms`,
    )

    reconnectTimer.current = setTimeout(() => {
      console.log('Attempting socket reconnection...')
      setupSocket()
    }, delay)
  }, [setupSocket])

  const handleNewNotification = useCallback(
    (notification: Notification) => {
      try {
        reconnectAttempts.current = 0

        const mappedNotification = mapApiNotificationToLocal(notification)

        const updatedNotifications = [...notifications]

        const exists = updatedNotifications.some(
          (n) => n.id === mappedNotification.id,
        )
        if (!exists) {
          updatedNotifications.unshift(mappedNotification)
          setNotifications(updatedNotifications)
        }

        queryClient.setQueryData(
          ['notifications'],
          (old: GetAllNotificationResponse) => {
            if (!old) {
              return {
                success: true,
                data: {
                  items: [notification],
                  meta: {
                    totalCount: 1,
                    currentPage: 1,
                    isFirstPage: true,
                    isLastPage: true,
                    pageCount: 1,
                  },
                },
              }
            }

            const exists = old.data.items.some(
              (n: Notification) => n.id === notification.id,
            )
            if (exists) return old

            return {
              ...old,
              data: {
                ...old.data,
                items: [notification, ...old.data.items],
                meta: {
                  ...old.data.meta,
                  totalCount: old.data.meta.totalCount + 1,
                },
              },
            }
          },
        )
      } catch (error) {
        console.error('Error processing notification:', error)
      }
    },
    [queryClient, setNotifications, notifications],
  )

  useEffect(() => {
    console.log('Initializing socket event listeners')

    const currentSocket = getSocket()
    if (currentSocket) {
      currentSocket.off('notification')
      currentSocket.off('connect_error')
      currentSocket.off('disconnect')
    }

    const socket = setupSocket()
    if (!socket) return

    socket.on('connect', () => {
      reconnectAttempts.current = 0
      console.log('Socket connection established')
    })

    socket.on('notification', handleNewNotification)

    socket.on('connect_error', (error) => {
      console.error('Socket connect error:', error.message)
      scheduleReconnect()
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
      if (
        reason === 'io server disconnect' ||
        reason === 'io client disconnect'
      ) {
      } else {
        scheduleReconnect()
      }
    })

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current)
      }

      const currentSocket = getSocket()
      if (currentSocket) {
        currentSocket.off('notification', handleNewNotification)
        currentSocket.off('connect_error')
        currentSocket.off('disconnect')
      }
    }
  }, [
    handleNewNotification,
    queryClient,
    setNotifications,
    notifications,
    setupSocket,
    scheduleReconnect,
  ])

  return {
    disconnectSocket,
  }
}
