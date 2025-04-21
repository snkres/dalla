import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Filter, Info } from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import { FilterPanel } from '../../../../../components/shared/filter-panel'
import { cn } from '@dalla/utils'
import { SearchBarProps } from '@lib/types/search'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

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
  const t = useTranslation()
  const { locale } = useLocale()
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
    <div className="relative mb-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="relative mb-4">
        <div
          className={cn(
            'flex overflow-hidden rounded-xl border border-gray-200 bg-white',
            locale === 'ar' ? 'pl-2' : 'pr-2',
          )}
        >
          <div className="relative flex flex-grow items-center">
            <Search
              className={cn(
                'absolute top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400',
                locale === 'ar' ? 'right-3' : 'left-3',
              )}
            />
            <Input
              type="text"
              placeholder={t.dashboard.searchBar.placeholder}
              className={cn(
                'h-12 w-full border-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0',
                locale === 'ar' ? 'pl-4 pr-10' : 'pl-10 pr-4',
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'my-1.5 h-9 rounded-lg px-4 text-sm font-medium',
              locale === 'ar' ? 'mr-2' : 'ml-2',
              showFilterPanel
                ? 'border-[#63B7B7]/30 bg-[#BEDDF1]/20 text-[#63B7B7]'
                : 'border-gray-200 bg-gray-50',
            )}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter
              className={cn('h-4 w-4', locale === 'ar' ? 'ml-2' : 'mr-2')}
            />
            {t.dashboard.shared.filters}
            {totalFiltersApplied > 0 && (
              <Badge
                className={cn(
                  'bg-[#63B7B7] text-white',
                  locale === 'ar' ? 'mr-2' : 'ml-2',
                )}
              >
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
              selectedSkills={selectedSkills || []}
              setSelectedSkills={setSelectedSkills}
              allSkills={allSkills}
            />
          )}
        </AnimatePresence>

        {showSearchHelp && (
          <motion.div
            {...HELP_ANIMATION}
            className={cn(
              'mt-2 flex items-start rounded-lg bg-[#BEDDF1]/20 p-4 text-sm text-[#234d64]',
              locale === 'ar' ? 'text-right' : 'text-left',
            )}
          >
            <Info
              className={cn(
                'mt-0.5 h-5 w-5 flex-shrink-0 text-[#234d64]',
                locale === 'ar' ? 'ml-2' : 'mr-2',
              )}
            />
            <div>
              <p className="mb-1 font-medium">
                {t.dashboard.searchBar.searchTipsTitle}
              </p>
              <ul
                className={cn(
                  'list-disc space-y-1',
                  locale === 'ar' ? 'pr-5' : 'pl-5',
                )}
              >
                <li>{t.dashboard.searchBar.searchTip1}</li>
                <li>{t.dashboard.searchBar.searchTip2}</li>
                <li>{t.dashboard.searchBar.searchTip3}</li>
              </ul>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'text-[#63B7B7] hover:bg-[#BEDDF1]/30',
                locale === 'ar' ? 'mr-auto' : 'ml-auto',
              )}
              onClick={() => setShowSearchHelp(false)}
            >
              {t.dashboard.shared.close}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
