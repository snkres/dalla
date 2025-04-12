import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Filter, Info } from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import { FilterPanel } from '../../../../../components/shared/filter-panel'
import { cn } from '@dalla/utils'
import { SearchBarProps } from '@lib/types/search'
const HELP_ANIMATION = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  showFilterPanel,
  setShowFilterPanel,
  showSearchHelp,
  setShowSearchHelp,
  selectedBudgetRange,
  setSelectedBudgetRange,
  selectedDurations,
  setSelectedDurations,
  selectedLocations,
  setSelectedLocations,
  selectedSkills,
  setSelectedSkills,
  handleResetFilters,
  budgetRanges,
  durationOptions,
  locationOptions,
  allSkills,
}: SearchBarProps) {
  const filterPanelRef = useRef<HTMLDivElement>(null)
  const safeFilterPanelRef = filterPanelRef as React.RefObject<HTMLDivElement>

  const totalFiltersApplied =
    (selectedBudgetRange[0] !== 0 || selectedBudgetRange[1] !== 100000
      ? 1
      : 0) +
    selectedDurations.length +
    selectedLocations.length +
    (selectedSkills?.length || 0)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node)
      ) {
        setShowFilterPanel(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setShowFilterPanel])

  return (
    <div className="relative mb-8">
      <div className="relative mb-4">
        <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white pr-2">
          <div className="relative flex flex-grow items-center">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for projects, skills, or companies..."
              className="h-12 w-full border-0 py-3 pl-10 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'my-1.5 ml-2 h-9 rounded-lg px-4 text-sm font-medium',
              showFilterPanel
                ? 'border-[#63B7B7]/30 bg-[#BEDDF1]/20 text-[#63B7B7]'
                : 'border-gray-200 bg-gray-50',
            )}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {totalFiltersApplied > 0 && (
              <Badge className="ml-2 bg-[#63B7B7] text-white">
                {totalFiltersApplied}
              </Badge>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {showFilterPanel && (
            <FilterPanel
              filterPanelRef={safeFilterPanelRef}
              setShowFilterPanel={setShowFilterPanel}
              handleResetFilters={handleResetFilters}
              selectedBudgetRange={selectedBudgetRange}
              setSelectedBudgetRange={setSelectedBudgetRange}
              budgetRanges={budgetRanges}
              selectedDurations={selectedDurations}
              setSelectedDurations={setSelectedDurations}
              durationOptions={durationOptions}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              locationOptions={locationOptions}
              // selectedSkills={selectedSkills || []}
              // setSelectedSkills={setSelectedSkills}
              // allSkills={allSkills}
            />
          )}
        </AnimatePresence>

        {showSearchHelp && (
          <motion.div
            {...HELP_ANIMATION}
            className="mt-2 flex items-start rounded-lg bg-[#BEDDF1]/20 p-4 text-sm text-[#234d64]"
          >
            <Info className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-[#234d64]" />
            <div>
              <p className="mb-1 font-medium">Search Tips:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Try searching for skills like &apos;React&apos; or
                  &apos;Design&apos;
                </li>
                <li>
                  Search for job types like &apos;Remote&apos; or
                  &apos;Full-time&apos;
                </li>
                <li>Enter company names to see their projects</li>
              </ul>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-[#63B7B7] hover:bg-[#BEDDF1]/30"
              onClick={() => setShowSearchHelp(false)}
            >
              Close
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
