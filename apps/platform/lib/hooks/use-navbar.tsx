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
import { useState, useRef, useEffect } from 'react'
import type { Notification as NotificationType } from '@lib/types/navbar'

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
  const [activeItem, setActiveItem] = useState('/dashboard')
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: '1',
      type: 'message',
      title: 'New message from Sarah',
      description: 'Hi there! I just reviewed the project proposal...',
      time: '10 min ago',
      read: false,
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      id: '2',
      type: 'project',
      title: 'Project deadline approaching',
      description: 'The "Website Redesign" project is due in 2 days',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'system',
      title: 'System maintenance',
      description: 'Scheduled maintenance will occur tonight at 2 AM',
      time: 'Yesterday',
      read: true,
    },
  ])

  const profileMenuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length
  const userProfile = {
    name: 'Amr Tamer',
    email: 'amr.tamer@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/122938074?v=4',
  }

  useEffect(() => {
    const matchingItem = navItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    if (matchingItem) {
      setActiveItem(matchingItem.href)
    }
  }, [pathname])

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
    navItems,
    accountItems,
    activeItem,
    isProfileMenuOpen,
    isMobileMenuOpen,
    isSearchActive,
    searchQuery,
    notifications,
    unreadCount,
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
