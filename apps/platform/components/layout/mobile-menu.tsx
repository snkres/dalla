'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { X, LogOut } from 'lucide-react'
import { cn } from '@dallah/utils'
import { NavItem } from '@lib/types/navbar'
import { useRouter } from 'next/navigation'
import { logout } from '@lib/api/auth/logout'
import { useQueryClient } from '@tanstack/react-query'

export interface MobileMenuProps {
  navItems: NavItem[]
  activeItem: string
  setActiveItem: (item: string) => void
  toggleMobileMenu: () => void
}

const MobileMenu = ({
  navItems,
  activeItem,
  setActiveItem,
  toggleMobileMenu,
}: MobileMenuProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleSignOut = async () => {
    try {
      await logout(queryClient).then(() => {
        toggleMobileMenu()
        router.push('/login')
      })
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[2px]"
        onClick={toggleMobileMenu}
      />

      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="text-lg font-medium text-gray-800">Menu</h2>
          <button
            onClick={toggleMobileMenu}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.href)
                  toggleMobileMenu()
                }}
              >
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                    activeItem === item.href
                      ? 'bg-slate-blue-100 text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-100 p-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default MobileMenu
