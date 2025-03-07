'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { getCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'

type ProfileItem = {
  icon: React.ElementType
  label: string
  href: string
}

type ProfilePopupProps = {
  name: string
  email: string
}

const ProfilePopup = ({ name, email }: ProfilePopupProps) => {
  const mode = getCookie('mode')
  const [profile] = useAtom(proProfileAtom)
  console.log(profile)
  const profileItems: ProfileItem[] = [
    {
      icon: User,
      label: 'View Profile',
      href: `/${mode === 'user' ? 'professionals' : 'companies'}/${profile?.id}`,
    },
    { icon: CreditCard, label: 'Billing & Plans', href: '/billing' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>

      <div className="py-1">
        {profileItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-700 transition-colors duration-200 hover:bg-[#63B7B7]/5">
              <div className="flex items-center gap-2">
                <item.icon className="h-3.5 w-3.5 text-[#63B7B7]" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="h-3 w-3 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-100 py-1">
        <Link href="/auth/logout">
          <div className="flex items-center px-4 py-2 text-xs text-gray-700 transition-colors duration-200 hover:bg-[#63B7B7]/5">
            <LogOut className="mr-2 h-3.5 w-3.5 text-[#63B7B7]" />
            <span>Sign Out</span>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

export default ProfilePopup
