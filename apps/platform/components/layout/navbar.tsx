'use client'

import Image from 'next/image'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { Bell, Search, Menu, X } from 'lucide-react'
import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { AnimatePresence } from 'motion/react'
import NotificationsPopup from './notifications-popup'
import ProfilePopup from './profile-popup'
import MobileMenu from './mobile-menu'
import { useNavbar } from '@lib/hooks/use-navbar'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { companyMetaAtom } from '@lib/atoms/company/meta'
import { proMetaAtom } from '@lib/atoms/pro/meta'
import { unreadNotificationCountAtom } from '@lib/atoms/shared/notifications'

export function Navbar() {
  const router = useTransitionRouter()
  const [global] = useAtom(globalAtom)
  const [proMeta] = useAtom(proMetaAtom)
  const [companyMeta] = useAtom(companyMetaAtom)
  const [unreadNotificationCount] = useAtom(unreadNotificationCountAtom)
  console.log(global)

  const {
    navItems,
    accountItems,
    activeItem,
    isProfileMenuOpen,
    isMobileMenuOpen,
    isSearchActive,
    searchQuery,
    setSearchQuery,
    setActiveItem,
    toggleProfileMenu,
    toggleMobileMenu,
    toggleSearch,
    toggleNotifications,
    handleKeyDown,
    pathname,
    searchInputRef,
    notificationsRef,
    profileMenuRef,
    unreadCount,

    isNotificationsOpen,
  } = useNavbar()

  const hasUnreadNotifications = unreadNotificationCount > 0 || unreadCount > 0

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      toggleSearch()
    }
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
              pathname === item.href
                ? 'bg-slate-blue-100 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
            onClick={() => setActiveItem(item.href)}
            prefetch
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
            <form onSubmit={onSearchSubmit} className="absolute inset-0">
              <div className="flex h-full items-center rounded-full border border-gray-200 bg-white">
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
                  type="button"
                  onClick={toggleSearch}
                  className="absolute right-3 text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="notifications-button relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnreadNotifications && (
              <>
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />

                {(unreadNotificationCount > 0 || unreadCount > 0) && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {unreadNotificationCount || unreadCount}
                  </span>
                )}
              </>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <NotificationsPopup ref={notificationsRef} />
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-2 transition-colors hover:bg-gray-50"
            aria-label="Profile menu"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={
                  global?.mode === 'user'
                    ? proMeta?.data?.UserProfile?.avatar || '/avatar.png'
                    : companyMeta?.data?.CompanyProfile?.logo || '/avatar.png'
                }
                alt="Profile"
                fill
                className="object-cover"
                sizes="24px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/avatar.png'
                }}
              />
            </div>
            <span className="hidden text-sm font-medium text-gray-700 md:block">
              {global.name}
            </span>
          </button>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <ProfilePopup ref={profileMenuRef} accountItems={accountItems} />
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 md:hidden"
          aria-label="Mobile menu"
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
