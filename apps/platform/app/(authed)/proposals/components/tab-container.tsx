'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Tabs, TabsList, TabsTrigger } from '@dallah/design-system'
import { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'

interface TabContainerProps {
  activeTab: string
  onTabChange: (tab: string) => void
  proposals: GetAllProposalsRes['data'][0][number][]
  isMobile: boolean
  isDetailOpen: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: 'date' | 'amount' | 'title'
  sortOrder: 'asc' | 'desc'
  onSort: (field: 'date' | 'amount' | 'title') => void
  viewType: 'professional' | 'company'
}
const TabContainer: React.FC<TabContainerProps> = memo(
  ({ activeTab, onTabChange, proposals, searchQuery, onSearchChange }) => {
    const getTabCount = useMemo(
      () =>
        (tab: string): number => {
          switch (tab) {
            case 'Pending':
              return proposals.filter(
                (proposal) => proposal.status === 'Pending',
              ).length
            case 'Accepted':
              return proposals.filter(
                (proposal) => proposal.status === 'Accepted',
              ).length
            case 'Rejected':
              return proposals.filter(
                (proposal) => proposal.status === 'Rejected',
              ).length
            default:
              return 0
          }
        },
      [proposals.length],
    )

    const tabItems = useMemo(
      () => [
        { id: 'Pending', label: 'Pending' },
        { id: 'Accepted', label: 'Accepted' },
        { id: 'Rejected', label: 'Rejected' },
      ],
      [],
    )

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col"
      >
        <Tabs
          defaultValue={activeTab}
          className="flex h-full w-full flex-col"
          onValueChange={onTabChange}
        >
          <div className="py-4">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1.5 !rounded-lg bg-[#e6f3f3] p-1.5 shadow-sm">
              {tabItems.map(({ id, label }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="duration-250 group relative !rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:text-[#4a8a8a] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]/20 focus-visible:ring-offset-2 data-[state=inactive]:text-[#63B7B7]"
                >
                  {activeTab === id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-md bg-[#63B7B7] shadow-sm"
                      transition={{ type: 'spring', duration: 0.5 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-center space-x-1.5">
                    <span
                      className={`transition-transform duration-200 ${activeTab === id ? 'text-white' : ''}`}
                    >
                      {label}
                    </span>
                    <AnimatePresence mode="wait">
                      {getTabCount(id) > 0 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${activeTab === id ? 'bg-white text-[#63B7B7]' : 'bg-[#63B7B7]/10 text-[#63B7B7]'} transition-colors duration-200`}
                        >
                          {getTabCount(id)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="relative flex items-center space-x-3 pb-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#63B7B7] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]/20"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </Tabs>
      </motion.div>
    )
  },
)

TabContainer.displayName = 'TabContainer'

export default TabContainer
