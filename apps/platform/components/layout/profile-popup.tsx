'use client'

import React, { forwardRef } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Globe,
  Check,
} from 'lucide-react'
import { useAtom } from 'jotai'
import { GlobalAtom, globalAtom } from '@lib/atoms/global'
import { useLocale } from '@hooks/use-locale'

import { logout } from '@lib/api/auth/logout'
import { ProMeta, proMetaAtom } from '@lib/atoms/pro/meta'
import { CompanyMeta, companyMetaAtom } from '@lib/atoms/company/meta'
import { useQueryClient } from '@tanstack/react-query'

type ProfileItem = {
  icon: React.ElementType
  label: string
  href: string
}

export type ProfilePopupProps = {
  accountItems?: ProfileItem[]
}

const ProfilePopup = forwardRef<HTMLDivElement, ProfilePopupProps>(
  ({ accountItems }, ref) => {
    const queryClient = useQueryClient()
    const [global, setGlobal] = useAtom(globalAtom)
    const [proMeta, setProMeta] = useAtom(proMetaAtom)
    const [companyMeta, setCompanyMeta] = useAtom(companyMetaAtom)
    const { locale, setLocale } = useLocale()

    const profileItems: ProfileItem[] = accountItems || [
      {
        icon: User,
        label: 'View Profile',
        href: `/${global.mode === 'user' ? 'professionals' : 'companies'}/${
          global.mode === 'user' ? global.username : global.id
        }`,
      },
      { icon: CreditCard, label: 'Billing & Plans', href: '/billing' },
      { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    ]

    const handleSignOut = async () => {
      try {
        await logout(queryClient)
        window.location.href = '/login'
      } catch (error) {
        console.error('Error during sign out:', error)
      }
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
      >
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-medium text-gray-800">{global.name}</p>
          <p className="text-xs text-gray-500">{global.email}</p>
        </div>

        <div className="p-2">
          {profileItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                <item.icon className="h-4 w-4 text-gray-500" />
                <span>{item.label}</span>
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-100 p-2">
          <p className="px-2 py-1 text-xs font-medium uppercase text-gray-400">
            Language
          </p>
          <button
            onClick={() => setLocale('en')}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            aria-current={locale === 'en' ? 'true' : 'false'}
          >
            <Globe className="h-4 w-4 text-gray-500" />
            <span>English</span>
            {locale === 'en' && (
              <Check className="text-slate-blue-100 ml-auto h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setLocale('ar')}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            aria-current={locale === 'ar' ? 'true' : 'false'}
          >
            <Globe className="h-4 w-4 text-gray-500" />
            <span>العربية</span>
            {locale === 'ar' && (
              <Check className="text-slate-blue-100 ml-auto h-4 w-4" />
            )}
          </button>
        </div>

        <div className="border-t border-gray-100 p-2">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    )
  },
)

ProfilePopup.displayName = 'ProfilePopup'

export default ProfilePopup
