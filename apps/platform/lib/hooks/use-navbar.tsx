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
import type { Notification as NotificationType } from '@lib/types/navbar'
import { globalAtom } from '@lib/atoms/global'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Briefcase, label: 'Projects', href: '/projects' },
  { icon: PencilLine, label: 'Proposals', href: '/proposals' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: Settings, label: 'Settings', href: '/settings' },
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

  const profileMenuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // // Set active item based on current pathname when component mounts
  // useEffect(() => {
  //   // Find the nav item that matches the current path
  //   // For exact matches
  //   const exactMatch = currentNavItems.find((item) => item.href === pathname)
  //   if (exactMatch) {
  //     setActiveItem(exactMatch.href)
  //     return
  //   }

  //   // For partial matches (e.g., /professionals/username should match nothing)
  //   // Reset to no active item if we're on a page that doesn't match any nav item
  //   setActiveItem('')

  //   // Alternatively, if you want specific path patterns to match certain nav items:
  //   if (pathname.startsWith('/proposals')) {
  //     setActiveItem('/proposals')
  //   } else if (pathname.startsWith('/settings')) {
  //     setActiveItem('/settings')
  //   } else if (pathname.startsWith('/projects')) {
  //     setActiveItem('/projects')
  //   } else if (pathname.startsWith('/messages')) {
  //     setActiveItem('/messages')
  //   } else if (pathname === '/') {
  //     setActiveItem('/')
  //   }
  // }, [pathname])

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
            ? `/companies/${global.id}`
            : `/professionals/${global.username}`,
      }
    }

    return items
  }, [global.mode])

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
