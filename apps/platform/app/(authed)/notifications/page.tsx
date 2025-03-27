'use client'

import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import {
  notificationsAtom,
  markAllNotificationsAsReadAtom,
  dismissNotificationAtom,
  markNotificationAsReadAtom,
} from '@lib/atoms/shared/notifications'
import { getRelativeTime } from '@dallah/utils'
import { Notification } from '@lib/types/navbar'
import { Button } from '@dallah/design-system'
import {
  Bell,
  Check,
  X,
  MessageSquare,
  Briefcase,
  Info,
  CheckCircle,
  Filter,
  Trash2,
} from 'lucide-react'
import { cn } from '@dallah/utils'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { motion, AnimatePresence } from 'motion/react'

export default function NotificationsPage() {
  const [notifications] = useAtom(notificationsAtom)
  const [, markAllAsRead] = useAtom(markAllNotificationsAsReadAtom)
  const [, dismissNotification] = useAtom(dismissNotificationAtom)
  const [, markAsRead] = useAtom(markNotificationAsReadAtom)

  const [, setForceUpdate] = useState({})
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate({})
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const [activeTab, setActiveTab] = useState('all')
  const [filter, setFilter] = useState('all')

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'unread' && notification.read) return false
    if (filter !== 'all' && notification.type !== filter) return false
    return true
  })

  const counts = {
    all: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    project: notifications.filter((n) => n.type === 'project').length,
    message: notifications.filter((n) => n.type === 'message').length,
    system: notifications.filter((n) => n.type === 'system').length,
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5" />
      case 'project':
        return <Briefcase className="h-5 w-5" />
      case 'system':
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return {
          bg: 'bg-[#63B7B7]/10',
          text: 'text-[#63B7B7]',
          border: 'border-[#63B7B7]',
        }
      case 'message':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-300',
        }
      case 'system':
      default:
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-300',
        }
    }
  }

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>

        <div className="flex items-center gap-3">
          {counts.unread > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center gap-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
            >
              <CheckCircle className="h-4 w-4" />
              Mark all as read
            </Button>
          )}

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px] border-gray-200">
              <div className="mr-1 flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="project">Projects</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <TabsList className="grid h-auto w-full max-w-md grid-cols-2 gap-1.5 !rounded-lg bg-[#e6f3f3] p-1.5 shadow-sm">
              <TabsTrigger value="all" className="!rounded-md px-4 py-2">
                All
                {counts.all > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-gray-300 bg-white px-2 py-0 text-xs text-gray-700"
                  >
                    {counts.all}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="!rounded-md px-4 py-2">
                Unread
                {counts.unread > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-[#63B7B7] bg-[#63B7B7]/10 px-2 py-0 text-xs text-[#63B7B7]"
                  >
                    {counts.unread}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="hidden items-center gap-4 text-sm text-gray-500 md:flex">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#63B7B7]" />
                <span>Projects: {counts.project}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Messages: {counts.message}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>System: {counts.system}</span>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <NotificationList
              notifications={filteredNotifications}
              dismissNotification={dismissNotification}
              markAsRead={markAsRead}
              getNotificationIcon={getNotificationIcon}
              getTypeColor={getTypeColor}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <NotificationList
              notifications={filteredNotifications}
              dismissNotification={dismissNotification}
              markAsRead={markAsRead}
              getNotificationIcon={getNotificationIcon}
              getTypeColor={getTypeColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface NotificationListProps {
  notifications: Notification[]
  dismissNotification: (id: string) => void
  markAsRead: (id: string) => void
  getNotificationIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => { bg: string; text: string; border: string }
}

function NotificationList({
  notifications,
  dismissNotification,
  markAsRead,
  getNotificationIcon,
  getTypeColor,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-1 text-lg font-medium text-gray-700">
          No notifications
        </h3>
        <p className="text-sm text-gray-500">You're all caught up!</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      <AnimatePresence>
        {notifications.map((notification) => {
          const typeColor = getTypeColor(notification.type)

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'group relative flex items-start gap-4 p-6 transition-colors hover:bg-gray-50',
                notification.read ? 'bg-white' : 'bg-[#F8FCFF]',
              )}
            >
              {!notification.read && (
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#63B7B7]" />
              )}

              <div className="relative flex-shrink-0 pt-1">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    typeColor.bg,
                    typeColor.text,
                  )}
                >
                  {notification.avatar ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={notification.avatar}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    getNotificationIcon(notification.type)
                  )}
                </div>

                {!notification.read && (
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#63B7B7] ring-2 ring-white" />
                )}
              </div>

              <div className="flex flex-grow flex-col">
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <h3
                      className={cn(
                        'text-base',
                        notification.read
                          ? 'font-normal text-gray-700'
                          : 'font-medium text-gray-800',
                      )}
                    >
                      {notification.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
                          typeColor.bg,
                          typeColor.text,
                        )}
                      >
                        {getNotificationIcon(notification.type)}
                        <span>
                          {notification.type.charAt(0).toUpperCase() +
                            notification.type.slice(1)}
                        </span>
                      </span>

                      <span className="text-xs text-gray-500">
                        {getRelativeTime(notification.time)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-[#63B7B7]"
                      >
                        <Check className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">Mark read</span>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dismissNotification(notification.id)}
                      className="h-8 w-8 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {notification.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
