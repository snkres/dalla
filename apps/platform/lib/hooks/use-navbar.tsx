import {
  Home,
  PencilLine,
  Settings,
  Briefcase,
  MessageCircle,
  User,
  CreditCard,
  HelpCircle,
  Bell,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { companyProfileAtom } from '@lib/atoms/company/profile'
import type { Notification as NotificationType } from '@lib/types/navbar'

import { globalAtom } from '@lib/atoms/global'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: PencilLine, label: 'Proposals', href: '/proposals' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Briefcase, label: 'Projects', href: '/projects' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
]

const accountItems = [
  { icon: User, label: 'View Profile', href: '/user/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: CreditCard, label: 'Billing & Plans', href: '/billing' },
  { icon: HelpCircle, label: 'Help & Support', href: '/support' },
]

export const useNavbar = () => {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('/')
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [global] = useAtom(globalAtom)
  const [proProfile] = useAtom(proProfileAtom)
  const [companyProfile] = useAtom(companyProfileAtom)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const currentNavItems = useMemo(() => {
    return navItems.filter((item) => {
      if (global.mode === 'company' && item.label === 'Proposals') {
        return false
      }
      return true
    })
  }, [global.mode])

  const currentAccountItems = useMemo(() => {
    const items = [...accountItems]

    const profileItemIndex = items.findIndex(
      (item) => item.label === 'View Profile',
    )
    if (profileItemIndex !== -1) {
      items[profileItemIndex] = {
        ...items[profileItemIndex],
        href:
          global.mode === 'company'
            ? `/companies/${global.name}`
            : `/professionals/${global.username}`,
      }
    }

    return items
  }, [global.mode])

  const userProfile = useMemo(() => {
    return {
      name: global?.name || '',
      email: global?.email || '',
      avatar:
        global?.mode === 'user'
          ? proProfile?.UserProfile?.avatar || '/avatar.png'
          : companyProfile?.CompanyProfile?.logo || '/avatar.png',
    }
  }, [global, proProfile, companyProfile])

  useEffect(() => {
    const matchingItem = currentNavItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    if (matchingItem) {
      setActiveItem(matchingItem.href)
    }
  }, [pathname, currentNavItems])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false)
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.notifications-button')
      ) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchActive])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
    if (!isSearchActive) {
      setSearchQuery('')
    }
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchActive(false)
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-3.5 w-3.5 text-[#63B7B7]" />
      case 'project':
        return <Briefcase className="h-3.5 w-3.5 text-[#63B7B7]" />
      case 'system':
        return <Bell className="h-3.5 w-3.5 text-[#63B7B7]" />
      default:
        return <Bell className="h-3.5 w-3.5 text-[#63B7B7]" />
    }
  }

  return {
    navItems: currentNavItems,
    accountItems: currentAccountItems,
    activeItem,
    isProfileMenuOpen,
    isMobileMenuOpen,
    isSearchActive,
    searchQuery,
    notifications,
    unreadCount: 0,
    userProfile,
    getNotificationIcon,
    toggleProfileMenu,
    toggleMobileMenu,
    toggleSearch,
    toggleNotifications,
    handleSearch,
    handleKeyDown,
    dismissNotification,
    markAllAsRead,
    setActiveItem,
    setSearchQuery,
    setIsNotificationsOpen,
    setIsProfileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchActive,
    setNotifications,
    isNotificationsOpen,
    profileMenuRef,
    notificationsRef,
    searchInputRef,
    pathname,
  }
}
