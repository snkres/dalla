'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@dalla/design-system'
import { Check, Bell, X, MessageSquare, Briefcase, Info } from 'lucide-react'
import { cn } from '@dalla/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useAtom } from 'jotai'
import {
  notificationsAtom,
  markAllNotificationsAsReadAtom,
  dismissNotificationAtom,
  unreadNotificationCountAtom,
  markNotificationAsReadAtom,
} from '@lib/atoms/shared/notifications'
import { getRelativeTime } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

const NotificationsPopup = forwardRef<HTMLDivElement>((_, ref) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const [notifications] = useAtom(notificationsAtom)
  const [unreadCount] = useAtom(unreadNotificationCountAtom)
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Bell className="h-4 w-4 text-[#63B7B7]" />
          {t.notificationsPopup.title}
          {unreadCount > 0 && (
            <span className="rounded bg-[#63B7B7]/10 px-1.5 py-0.5 text-xs text-[#63B7B7]">
              {unreadCount}
            </span>
          )}
        </h3>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-7 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
          >
            <Check className="mr-1.5 h-3.5 w-3.5" />
            {t.notificationsPopup.markAllRead}
          </Button>
        )}
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        <AnimatePresence>
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'group relative flex cursor-pointer gap-3 p-4 transition-colors duration-200 hover:bg-[#BEDDF1]/10',
                      notification.read ? 'bg-white' : 'bg-[#F8FCFF]',
                    )}
                    onClick={() =>
                      !notification.read && markAsRead(notification.id)
                    }
                  >
                    {!notification.read && (
                      <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#63B7B7]" />
                    )}

                    <div className="relative mt-0.5 flex-shrink-0">
                      {notification.avatar ? (
                        <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-[#BEDDF1]/30">
                          <Image
                            src={notification.avatar}
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full',
                            notification.type === 'project'
                              ? 'bg-[#63B7B7]/10 text-[#63B7B7]'
                              : notification.type === 'message'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-purple-100 text-purple-600',
                          )}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}

                      {!notification.read && (
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#63B7B7] ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex flex-grow flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            'pr-2 text-sm',
                            notification.read
                              ? 'font-normal text-gray-600'
                              : 'font-medium text-gray-800',
                          )}
                        >
                          {notification.title}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="-mr-1 h-5 w-5 rounded-full text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-red-500 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="line-clamp-2 text-xs text-gray-500">
                        {notification.description}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-gray-400">
                        {getRelativeTime(notification.time)}
                      </p>
                    </div>
                  </motion.div>
                  {index < notifications.length - 1 && (
                    <div className="mx-4 h-[1px] bg-gray-100" />
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BEDDF1]/20 text-[#BEDDF1]">
                  <Bell className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {t.notificationsPopup.emptyState.title}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {t.notificationsPopup.emptyState.description}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-gray-100 p-3">
        <Link href="/notifications" className="block">
          <Button
            variant="outline"
            className="w-full justify-center border-[#63B7B7]/20 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
          >
            {t.notificationsPopup.viewAll}
          </Button>
        </Link>
      </div>
    </motion.div>
  )
})

NotificationsPopup.displayName = 'NotificationsPopup'

export default NotificationsPopup
