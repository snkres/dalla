'use client'

import { TabContainerProps } from '@lib/types/proposals'
import { motion, AnimatePresence } from 'motion/react'
import { Tabs, TabsList, TabsTrigger } from '@dallah/design-system'
import { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { BudgetRange } from '@lib/types/project'
import { FilterPanel } from '../dashboard/filter-panel'

const TabContainer: React.FC<TabContainerProps> = memo(
  ({
    activeTab,
    onTabChange,
    activeProposals,
    submittedProposals,
    searchQuery,
    onSearchChange,
  }) => {
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [selectedBudgetRange, setSelectedBudgetRange] = useState<
      [number, number]
    >([0, 100000])
    const [selectedDurations, setSelectedDurations] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])

    const filterPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          filterPanelRef.current &&
          !filterPanelRef.current.contains(event.target as Node) &&
          showFilterPanel
        ) {
          setShowFilterPanel(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [showFilterPanel])

    const handleResetFilters = () => {
      setSelectedBudgetRange([0, 100000])
      setSelectedDurations([])
      setSelectedLocations([])
      setSelectedSkills([])
    }

    const getTabCount = useMemo(
      () =>
        (tab: string): number => {
          switch (tab) {
            case 'active':
              return activeProposals.length
            case 'submitted':
              return submittedProposals.length
            default:
              return 0
          }
        },
      [activeProposals.length, submittedProposals.length],
    )

    const tabItems = useMemo(
      () => [
        { id: 'active', label: 'Active' },
        { id: 'submitted', label: 'Submitted' },
        { id: 'invitations', label: 'Invitations' },
        { id: 'offers', label: 'Offers' },
      ],
      [],
    )

    const budgetRanges = [
      { label: '$0-$1,000', value: [0, 1000] },
      { label: '$1,000-$5,000', value: [1000, 5000] },
      { label: '$5,000-$10,000', value: [5000, 10000] },
      { label: '$10,000-$50,000', value: [10000, 50000] },
      { label: '$50,000+', value: [50000, 100000] },
    ]

    const durationOptions = [
      { label: 'Less than 1 month', value: 'less_than_1_month' },
      { label: '1-3 months', value: '1_3_months' },
      { label: '3-6 months', value: '3_6_months' },
      { label: 'More than 6 months', value: 'more_than_6_months' },
    ]

    const locationOptions = [
      { label: 'Remote', value: 'remote' },
      { label: 'On-site', value: 'on_site' },
      { label: 'Hybrid', value: 'hybrid' },
    ]

    const allSkills = [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'JavaScript',
      'CSS',
      'HTML',
      'UI/UX',
      'Figma',
      'Tailwind CSS',
      'GraphQL',
      'REST API',
      'MongoDB',
      'SQL',
      'Redux',
    ]

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
            <TabsList className="grid h-auto w-full grid-cols-4 gap-1.5 rounded-lg bg-[#e6f3f3] p-1.5 shadow-sm">
              {tabItems.map(({ id, label }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="duration-250 group relative rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:text-[#4a8a8a] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]/20 focus-visible:ring-offset-2 data-[state=inactive]:text-[#63B7B7]"
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
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="relative rounded-lg border border-gray-200 bg-white p-2.5 transition-colors duration-200 hover:bg-[#f5fafa] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]/20"
            >
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
              <AnimatePresence>
                {(selectedDurations.length > 0 ||
                  selectedLocations.length > 0 ||
                  selectedSkills.length > 0) && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#63B7B7] text-[10px] font-medium text-white"
                  >
                    {selectedDurations.length +
                      selectedLocations.length +
                      selectedSkills.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {showFilterPanel && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-full z-10"
                >
                  <FilterPanel
                    filterPanelRef={
                      filterPanelRef as React.RefObject<HTMLDivElement>
                    }
                    setShowFilterPanel={setShowFilterPanel}
                    handleResetFilters={handleResetFilters}
                    selectedBudgetRange={selectedBudgetRange}
                    setSelectedBudgetRange={setSelectedBudgetRange}
                    budgetRanges={budgetRanges as BudgetRange[]}
                    selectedDurations={selectedDurations}
                    setSelectedDurations={setSelectedDurations}
                    durationOptions={durationOptions}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    locationOptions={locationOptions}
                    selectedSkills={selectedSkills}
                    setSelectedSkills={setSelectedSkills}
                    allSkills={allSkills}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </motion.div>
    )
  },
)

TabContainer.displayName = 'TabContainer'

export default TabContainer
