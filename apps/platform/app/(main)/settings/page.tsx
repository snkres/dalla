'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Cog,
} from 'lucide-react'
import Link from 'next/link'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'

const SettingsOverview = () => {
  const [global] = useAtom(globalAtom)

  const settingCategories = [
    {
      key: 'account',
      label: 'Account',
      icon: <User className="h-5 w-5" />,
      description:
        'Manage your personal information, profile photo and social links',
      links: [
        { key: 'personal-info', label: 'Personal Info' },
        { key: 'avatar', label: 'Profile Photo' },
        { key: 'password', label: 'Password' },
      ],
    },
    // {
    //   key: 'notifications',
    //   label: 'Notifications',
    //   icon: <Bell className="h-5 w-5" />,
    //   description: 'Configure how and when you receive notifications',
    //   links: [
    //     { key: 'email', label: 'Email Notifications' },
    //     { key: 'push', label: 'Push Notifications' },
    //     { key: 'in-app', label: 'In-App Alerts' },
    //   ],
    // },
    // {
    //   key: 'security',
    //   label: 'Security',
    //   icon: <Shield className="h-5 w-5" />,
    //   description: 'Manage your account security and privacy settings',
    //   links: [
    //     { key: 'password', label: 'Password' },
    //     { key: '2fa', label: 'Two-Factor Authentication' },
    //     { key: 'sessions', label: 'Active Sessions' },
    //   ],
    // },
    {
      key: 'billing',
      label: global.mode === 'user' ? 'Get Paid' : 'Billing',
      icon: <CreditCard className="h-5 w-5" />,
      description:
        global.mode === 'user'
          ? 'Manage your payment methods and get paid'
          : 'Manage your subscription plans and payment methods',
    },
    {
      key: 'help',
      label: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5" />,
      description: 'Get help with your account and contact support',
      links: [
        { key: '/?faq', label: 'FAQ' },
        { key: '/?contact', label: 'Contact Support' },
        { key: '/?guides', label: 'User Guides' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-medium text-gray-800">
          Settings Overview
        </h2>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {settingCategories.map((category) => (
          <motion.div
            key={category.key}
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:border-[#BEDDF1]"
          >
            <div className="p-5">
              <div className="mb-3 flex items-center gap-4">
                <div className="rounded-full bg-[#BEDDF1]/20 p-2.5 text-[#63B7B7]">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-800">
                    {category.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="-mx-5 mt-3 border-t border-gray-100 px-5 pt-3">
                <ul className="space-y-2">
                  {category.links?.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={`/settings/${category.key}/${link.key}`}
                        className="group flex items-center justify-between text-sm text-gray-600 transition-colors duration-200 hover:text-[#63B7B7]"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-4 w-4 transform text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#63B7B7]" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href={`/settings/${category.key}`}
                    className="inline-flex items-center text-xs font-medium text-[#63B7B7] transition-colors duration-200 hover:text-[#63B7B7]/80"
                  >
                    View all {category.label.toLowerCase()} settings
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[#BEDDF1]/30 bg-[#BEDDF1]/10 p-5">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 rounded-full bg-[#BEDDF1]/20 p-2.5 text-[#63B7B7]">
            <Cog className="h-5 w-5" />
          </div>
          <div>
            <h3 className="mb-1 text-base font-medium text-gray-800">
              Need help with your settings?
            </h3>
            <p className="mb-3 text-sm text-gray-600">
              If you need assistance with configuring your account or have any
              questions, our support team is here to help.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center rounded-lg bg-[#63B7B7] px-4 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#63B7B7]/90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsOverview
