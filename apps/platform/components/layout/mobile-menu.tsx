'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { X, Search, LogOut, ArrowRight } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { MobileMenuProps } from '@lib/types/navbar'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'

const MobileMenu = ({
  onClose,
  isOpen,
  activeItem,
  navItems,
  accountItems,
  searchQuery,
  setSearchQuery,
  handleSearch,
  userProfile,
}: MobileMenuProps) => {
  const itemVariants = {
    closed: { opacity: 0, x: 15 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.25,
      },
    }),
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[2px] md:hidden"
          onClick={onClose}
        />
      )}

      <motion.div
        {...SLIDE_ANIMATION}
        className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col overflow-hidden bg-white shadow-lg md:hidden"
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#BEDDF1]/20 shadow-sm ring-1 ring-[#63B7B7]/30">
              <Image
                src={userProfile.avatar}
                alt="Profile"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {userProfile.name}
              </p>
              <p className="text-xs text-gray-500">{userProfile.email}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-lg border border-[#63B7B7]/30 bg-[#BEDDF1]/10 transition-colors duration-200 hover:bg-[#BEDDF1]/20 md:hidden"
          >
            <X className="h-4 w-4 text-[#63B7B7]" />
          </Button>
        </div>

        <div className="border-b border-gray-100 p-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-lg border-[#63B7B7]/10 bg-white py-1 pl-8 pr-3 text-sm focus:border-[#63B7B7]/30 focus-visible:ring-[#63B7B7]/20"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="h-9 bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
              >
                <Search className="h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            <div className="mb-2 flex items-center justify-between px-4">
              <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Navigation
              </h3>
              <div className="mx-3 h-px flex-grow bg-gray-100"></div>
            </div>

            {navItems.map((item, i) => {
              const isActive = activeItem === item.href
              const Icon = item.icon

              return (
                <motion.div key={item.href} custom={i} variants={itemVariants}>
                  <Link href={item.href} onClick={onClose}>
                    <div
                      className={cn(
                        'mx-2 my-1 flex items-center justify-between rounded-r-lg px-4 py-3 text-sm transition-all duration-200',
                        isActive
                          ? 'border-l-2 border-[#63B7B7] bg-[#63B7B7]/10 text-[#63B7B7]'
                          : 'border-l-2 border-transparent text-gray-700 hover:bg-[#BEDDF1]/10',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[#63B7B7]" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <ArrowRight className="h-3.5 w-3.5 text-[#63B7B7]" />
                      )}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="py-4">
            <div className="mb-2 flex items-center justify-between px-4">
              <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Account
              </h3>
              <div className="mx-3 h-px flex-grow bg-gray-100"></div>
            </div>

            {accountItems.map((item, i) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={i}
                  custom={i + navItems.length}
                  variants={itemVariants}
                >
                  <Link href={item.href} onClick={onClose}>
                    <div className="mx-2 my-1 flex items-center justify-between rounded-r-lg px-4 py-3 text-sm text-gray-700 transition-all duration-200 hover:bg-[#BEDDF1]/10">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[#63B7B7]" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 p-4">
          <Link href="/auth/logout" onClick={onClose}>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 border-[#63B7B7]/20 bg-white text-sm text-[#63B7B7] hover:border-[#63B7B7]/30 hover:bg-[#63B7B7]/5"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </>
  )
}

export default MobileMenu
