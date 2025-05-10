import {
  getAllNotifications,
  GetAllNotificationResponse,
} from '@lib/api/shared/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  markNotificationAsRead as apiMarkNotificationAsRead,
  markAllNotificationsAsRead as apiMarkAllNotificationsAsRead,
} from '@lib/api/shared/notifications'
import { Briefcase, Info } from 'lucide-react'
import { MessageSquare } from 'lucide-react'
import {
  notificationsAtom,
  mapApiNotificationToLocal,
} from '@lib/atoms/shared/notifications'
import { useAtom } from 'jotai'
import { Notification } from '@lib/types/navbar'

export function useNotifications() {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useAtom(notificationsAtom)

  // Track initial fetch status to avoid unnecessary refetches
  const [hasFetched, setHasFetched] = useState(false)

  const {
    data: apiNotifications,
    isFetched: isNotificationsFetched,
    isError: isNotificationsError,
    error: notificationsError,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getAllNotifications(1, 50),
    refetchOnMount: !hasFetched, // Only fetch on mount if we haven't fetched before
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    initialDataUpdatedAt: Date.now(),
  })

  // Update atom when API data changes
  useEffect(() => {
    if (
      apiNotifications?.data?.items &&
      apiNotifications.data.items.length > 0
    ) {
      const mappedNotifications = apiNotifications.data.items.map(
        mapApiNotificationToLocal,
      )
      setNotifications(mappedNotifications)
      setHasFetched(true)
    }
  }, [apiNotifications, setNotifications])

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    const newNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
    setNotifications(newNotifications)
  }

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    const newNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(newNotifications)
  }

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => apiMarkNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: () => apiMarkAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    markAsReadMutation.mutate(id)
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    markAllAsReadMutation.mutate()
  }

  const [, setForceUpdate] = useState({})
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate({})
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />
      case 'project':
        return <Briefcase className="h-4 w-4" />
      case 'system':
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return {
    notifications,
    isNotificationsFetched,
    isNotificationsError,
    notificationsError,
    refetchNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    getNotificationIcon,
    unreadCount: notifications.filter((n) => !n.read).length,
  }
}
