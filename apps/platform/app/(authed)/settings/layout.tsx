'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { ReactNode } from 'react'
import { User, CreditCard, HelpCircle, ChevronRight, Cog } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@dallah/design-system'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { getOwnProProfile } from '@lib/api/pro/profile'
import { getOwnCompanyProfile } from '@lib/api/company/profile'

interface SettingsPageProps {
  children: ReactNode
}

export default function SettingsLayoutPage({ children }: SettingsPageProps) {
  const [global] = useAtom(globalAtom)
  useQuery({
    queryKey: ['own-pro-profile', global.username],
    queryFn: () => getOwnProProfile(),
    enabled: global.mode === 'user',
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  })
  useQuery({
    queryKey: ['own-company-profile', global.id],
    queryFn: () => getOwnCompanyProfile(),
    enabled: global.mode === 'company',
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  })
  const router = useTransitionRouter()
  const pathname = usePathname()
  const currentPath = pathname.split('/')
  const activeSetting = currentPath[currentPath.length - 1] || 'profile'
  const [expanded, setExpanded] = useState<string | null>('profile')

  const settingCategories = [
    {
      key: 'account',
      label: 'Account',
      icon: <User className="h-4 w-4" />,
      description: 'Manage your account information and preferences',

      subroutes: [
        { key: 'personal-info', label: 'Personal Info' },
        { key: 'avatar', label: 'Profile Photo' },
      ],
    },
    // {
    //   key: 'notifications',
    //   label: 'Notifications',
    //   icon: <Bell className="h-4 w-4" />,
    //   description: 'Configure how and when you get notified',
    //   subroutes: [
    //     { key: 'email', label: 'Email Notifications' },
    //     { key: 'push', label: 'Push Notifications' },
    //     { key: 'in-app', label: 'In-App Alerts' },
    //   ],
    // },
    // {
    //   key: 'security',
    //   label: 'Security',
    //   icon: <Shield className="h-4 w-4" />,
    //   description: 'Manage your account security and privacy',
    //   subroutes: [
    //     { key: 'password', label: 'Password' },
    //     { key: '2fa', label: 'Two-Factor Authentication' },
    //     { key: 'sessions', label: 'Active Sessions' },
    //   ],
    // },
    {
      key: 'billing',
      label: global.mode === 'user' ? 'Get Paid' : 'Billing',
      icon: <CreditCard className="h-4 w-4" />,
      description: 'Manage your subscription and payment methods',
    },
    {
      key: 'help',
      label: 'Help & Support',
      icon: <HelpCircle className="h-4 w-4" />,
      description: 'Get help and contact support',
    },
  ]

  const activeCategory =
    settingCategories.find((cat) => cat.key === activeSetting) ||
    settingCategories[0]

  const toggleExpanded = (key: string) => {
    setExpanded(expanded === key ? null : key)
  }

  const navigateTo = (key: string, subkey?: string) => {
    if (subkey) {
      router.push(`/settings/${key}/${subkey}`)
    } else {
      router.push(`/settings/${key}`)
    }
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <Breadcrumb className="mb-6 flex items-center gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="text-xs text-gray-500 hover:text-[#63B7B7]"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/settings"
            className="text-xs text-gray-500 hover:text-[#63B7B7]"
          >
            Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span className="text-xs font-medium text-gray-800">
            {activeCategory.label}
          </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-1"
        >
          <div className="sticky top-6">
            <div className="w-[300px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#BEDDF1]/20 p-2">
                    <Cog className="h-4 w-4 text-[#63B7B7]" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Settings
                    </h2>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </div>
              </div>

              <nav className="p-3">
                {settingCategories.map((category) => (
                  <div key={category.key} className="mb-1.5">
                    <div
                      className={`flex cursor-pointer items-center justify-between rounded-lg p-2.5 transition-colors ${
                        activeSetting === category.key
                          ? 'bg-[#BEDDF1]/20 text-[#63B7B7]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        if (category.subroutes) {
                          toggleExpanded(category.key)
                        } else {
                          navigateTo(category.key)
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-3 rounded-md p-1.5 ${
                            activeSetting === category.key
                              ? 'bg-[#BEDDF1]/30 text-[#63B7B7]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {category.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {category.label}
                        </span>
                      </div>
                      {category.subroutes && (
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${expanded === category.key ? 'rotate-90 transform' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExpanded(category.key)
                          }}
                        />
                      )}
                    </div>

                    {category.subroutes && expanded === category.key && (
                      <div className="mb-2 ml-9 mt-1 space-y-1">
                        {category.subroutes.map((subroute) => (
                          <div
                            key={subroute.key}
                            className={`cursor-pointer rounded-lg p-2.5 text-xs transition-colors ${
                              currentPath.includes(subroute.key)
                                ? 'bg-[#BEDDF1]/10 font-medium text-[#63B7B7]'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() =>
                              navigateTo(category.key, subroute.key)
                            }
                          >
                            {subroute.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>

        <motion.div
          key={activeSetting}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-3"
        >
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="rounded-full bg-[#BEDDF1]/20 p-2.5 text-[#63B7B7]">
                    {activeCategory.icon}
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-semibold text-gray-900">
                    {activeCategory.label}
                  </h1>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {activeCategory.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
