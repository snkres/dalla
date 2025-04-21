import React from 'react'
import { HelpCircle } from 'lucide-react'
import { Button } from '@dalla/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { FilterCategory } from '@lib/types/project'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface FilterChipsProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
  showSearchHelp: boolean
  setShowSearchHelp: (show: boolean) => void
  filterCategories: FilterCategory[]
}

export default function FilterChips({
  activeFilter,
  setActiveFilter,
  showSearchHelp,
  setShowSearchHelp,
  filterCategories,
}: FilterChipsProps) {
  const t = useTranslation()
  const { locale } = useLocale()

  return (
    <div
      className="mb-2 flex flex-wrap gap-2"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {filterCategories.map((category) => {
        const Icon = category.icon
        return (
          <TooltipProvider key={category.key}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-all duration-200',
                    activeFilter === category.key
                      ? '!bg-[#1D8489]/90 text-white shadow-sm'
                      : '!bg-[#BEDDF1]/10 text-gray-700 hover:!bg-[#1D8489]/25',
                  )}
                  onClick={() => setActiveFilter(category.key)}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="font-medium">{category.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-gray-800 px-2.5 py-1.5 text-xs"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <p>{category.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        className="h-7 rounded-full px-3 text-xs text-[#1D8489] transition-colors duration-200 hover:bg-[#BEDDF1]/15"
        onClick={() => setShowSearchHelp(!showSearchHelp)}
      >
        <HelpCircle
          className={cn('h-3.5 w-3.5', locale === 'ar' ? 'ml-1.5' : 'mr-1.5')}
        />
        {t.dashboard.searchBar.searchHelpButton}
      </Button>
    </div>
  )
}
