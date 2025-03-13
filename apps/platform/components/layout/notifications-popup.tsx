'use client'

import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@dallah/design-system'
import { Check, Bell, X } from 'lucide-react'
import { cn } from '@dallah/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Notification } from '@lib/types/navbar'

export type NotificationsPopupProps = {
  notifications: Notification[]
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  getNotificationIcon: (type: string) => React.ReactNode
}

const NotificationsPopup = forwardRef<HTMLDivElement, NotificationsPopupProps>(
  ({ notifications, markAllAsRead, dismissNotification, getNotificationIcon }, ref) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Bell className="h-4 w-4 text-[#63B7B7]" />
            Notifications
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
              Mark all read
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
                        'relative flex gap-3 px-4 py-2.5 transition-colors duration-200 hover:bg-[#BEDDF1]/10',
                        notification.read ? 'bg-white' : 'bg-white',
                      )}
                    >
                      {!notification.read && (
                        <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#63B7B7]" />
                      )}

                      <div className="mt-0.5 flex-shrink-0">
                        {notification.avatar ? (
                          <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-[#BEDDF1]/30">
                            <Image
                              src={notification.avatar}
                              alt="Avatar"
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BEDDF1]/20 text-[#63B7B7]">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <p
                            className={cn(
                              'text-xs',
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
                            className="-mr-1 h-5 w-5 rounded-full text-gray-400 hover:bg-transparent hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              dismissNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                          {notification.description}
                        </p>

                        <p className="mt-1.5 text-[10px] text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </motion.div>
                    {index < notifications.length - 1 && (
                      <div className="mx-4 bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BEDDF1]/20 text-[#BEDDF1]">
                    <Bell className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">No notifications</p>
                <p className="mt-1 text-xs text-gray-400">
                  You&apos;re all caught up!
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
              View all notifications
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }
)

NotificationsPopup.displayName = 'NotificationsPopup'

export default NotificationsPopup
