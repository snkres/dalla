'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bell, Search, Settings, Menu, X } from 'lucide-react'
import { Button, LogoHorizontal } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { AnimatePresence } from 'motion/react'
import NotificationsPopup from './notifications-popup'
import ProfilePopup from './profile-popup'
import MobileMenu from './mobile-menu'
import { useNavbar } from '@lib/hooks/use-navbar'

export function Navbar() {
  const {
    navItems,
    accountItems,
    activeItem,
    isProfileMenuOpen,
    isMobileMenuOpen,
    isSearchActive,
    searchQuery,
    setSearchQuery,
    notifications,
    setActiveItem,
    toggleProfileMenu,
    toggleMobileMenu,
    toggleSearch,
    toggleNotifications,
    handleSearch,
    handleKeyDown,
    dismissNotification,
    markAllAsRead,
    getNotificationIcon,
    pathname,
    searchInputRef,
    notificationsRef,
    profileMenuRef,
    unreadCount,
    userProfile,
    isNotificationsOpen,
  } = useNavbar()

  // Early return if profile data isn't loaded yet to prevent UI glitches
  if (!userProfile.email) {
    return (
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6">
        <div className="origin-left scale-75">
          <LogoHorizontal className="[&_path]:fill-slate-blue-100 [&_path]:h-24 [&_path]:w-24" />
        </div>
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6">
      <div className="origin-left scale-75">
        <LogoHorizontal className="[&_path]:fill-slate-blue-100 [&_path]:h-24 [&_path]:w-24" />
      </div>

      <div className="hidden items-center gap-1.5 rounded-full p-1 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
              activeItem === item.href
                ? 'bg-slate-blue-100 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
            onClick={() => setActiveItem(item.href)}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <button
            onClick={toggleSearch}
            className={cn(
              'flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-500 transition-all',
              isSearchActive ? 'w-64' : 'w-40',
            )}
          >
            {!isSearchActive && (
              <>
                <Search className="h-4 w-4" />
                <span>Search...</span>
              </>
            )}
          </button>
          {isSearchActive && (
            <div className="absolute inset-0 flex items-center rounded-full border border-gray-200 bg-white">
              <Search className="ml-3 h-4 w-4 text-gray-500" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-full w-full border-none bg-transparent pl-2 pr-8 text-sm focus:outline-none focus:ring-0"
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="absolute right-3 text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <NotificationsPopup
                ref={notificationsRef}
                notifications={notifications}
                dismissNotification={dismissNotification}
                markAllAsRead={markAllAsRead}
                getNotificationIcon={getNotificationIcon}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-2 transition-colors hover:bg-gray-50"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={userProfile?.avatar}
                alt="Profile"
                fill
                className="object-cover"
                sizes="24px"
                // onError={(e) => {
                //   // Fallback to default avatar if image fails to load
                //   const target = e.target as HTMLImageElement
                //   target.src = '/avatar.png'
                // }}
              />
            </div>
            <span className="hidden text-sm font-medium text-gray-700 md:block">
              {userProfile.name || 'User'}
            </span>
          </button>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <ProfilePopup
                ref={profileMenuRef}
                accountItems={accountItems}
                userProfile={userProfile}
              />
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              navItems={navItems}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              toggleMobileMenu={toggleMobileMenu}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
