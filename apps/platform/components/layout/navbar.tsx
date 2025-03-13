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

  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6">
      <div className="origin-left scale-75">
        <LogoHorizontal className="[&_path]:fill-slate-blue-100 [&_path]:h-24 [&_path]:w-24" />
      </div>

      <div className="hidden items-center gap-1.5 rounded-full p-1 md:flex">
        {navItems.map((item) => {
          const isActive = activeItem === item.href
          const Icon = item.icon
          return (
            <Link href={item.href} key={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'flex items-center gap-1.5 !rounded-full px-3 py-1.5 text-xs transition-all duration-200',
                  isActive
                    ? '!bg-[#63B7B7] text-white shadow-sm hover:!bg-[#63B7B7]/90'
                    : '!bg-[#BEDDF1]/10 text-gray-700 hover:!bg-[#BEDDF1]/25',
                )}
                onClick={() => setActiveItem(item.href)}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="font-normal">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      <div className="relative flex items-center gap-2">
        <div
          className={cn(
            'flex items-center overflow-hidden transition-all duration-300 ease-in-out',
            isSearchActive
              ? 'w-48 opacity-100 sm:w-64'
              : 'w-0 opacity-0 sm:w-auto sm:opacity-100',
          )}
        >
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  'h-8 rounded-full border-gray-200 py-1 pl-8 pr-3 text-xs',
                  'focus:border-[#63B7B7]/30 focus:bg-white focus-visible:ring-[#63B7B7]/20',
                  isSearchActive ? 'bg-white shadow-sm' : 'bg-white/90',
                )}
              />
              {isSearchActive && searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3 text-gray-400" />
                </Button>
              )}
            </div>
          </form>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full transition-colors duration-200 hover:bg-[#BEDDF1]/25 sm:hidden"
          onClick={toggleSearch}
        >
          {isSearchActive ? (
            <X className="h-3.5 w-3.5 text-gray-600" />
          ) : (
            <Search className="h-3.5 w-3.5 text-gray-600" />
          )}
        </Button>

        <div className="relative" ref={notificationsRef}>
          <Button
            variant="ghost"
            size="icon"
            className="notifications-button relative h-8 w-8 rounded-full transition-colors duration-200 hover:bg-[#BEDDF1]/25"
            onClick={toggleNotifications}
          >
            <Bell className="h-3.5 w-3.5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#63B7B7] text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <NotificationsPopup
                unreadCount={unreadCount}
                notifications={notifications}
                markAllAsRead={markAllAsRead}
                dismissNotification={dismissNotification}
                getNotificationIcon={getNotificationIcon}
              />
            )}
          </AnimatePresence>
        </div>

        <Link href="/settings/account/personal">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 rounded-full transition-colors duration-200',
              pathname === '/dashboard/settings'
                ? 'bg-[#63B7B7] text-white'
                : 'text-gray-600 hover:bg-[#BEDDF1]/25',
            )}
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </Link>

        <div className="relative hidden md:block" ref={profileMenuRef}>
          <div
            className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-[#BEDDF1]/20 shadow-sm ring-2 ring-[#BEDDF1]/30 transition-transform duration-200 hover:scale-105"
            onClick={toggleProfileMenu}
          >
            <Image
              src={userProfile?.avatar || '/avatar.png'}
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <ProfilePopup name={userProfile.name} email={userProfile.email} />
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg border border-[#63B7B7]/30 bg-[#BEDDF1]/10 transition-colors duration-200 hover:bg-[#BEDDF1]/20 md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-4 w-4 text-[#63B7B7]" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={toggleMobileMenu}
            isOpen={isMobileMenuOpen}
            activeItem={activeItem}
            navItems={navItems}
            accountItems={accountItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            userProfile={userProfile}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
