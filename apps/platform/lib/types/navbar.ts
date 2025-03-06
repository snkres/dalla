export interface Notification {
  id: string
  type: 'message' | 'project' | 'system'
  title: string
  description: string
  time: string
  read: boolean
  avatar?: string
}

export type NavItem = {
  icon: React.ElementType
  label: string
  href: string
}

export type MobileMenuProps = {
  onClose: () => void
  isOpen: boolean
  activeItem: string
  navItems: NavItem[]
  accountItems: NavItem[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
  userProfile: {
    name: string
    email: string
    avatar: string
  }
}
