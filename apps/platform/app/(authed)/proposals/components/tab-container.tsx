'use client'

import { memo, useMemo } from 'react'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'
import { AnimatedTabs } from '@dalla/design-system'

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
      [proposals],
    )

    const tabItems = useMemo(
      () => [
        { id: 'Pending', label: 'Pending', count: getTabCount('Pending') },
        { id: 'Accepted', label: 'Accepted', count: getTabCount('Accepted') },
        { id: 'Rejected', label: 'Rejected', count: getTabCount('Rejected') },
      ],
      [getTabCount],
    )

    return (
      <AnimatedTabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    )
  },
)

TabContainer.displayName = 'TabContainer'

export default TabContainer
