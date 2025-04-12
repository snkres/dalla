import {
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { Input } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@dalla/design-system'
import { useState } from 'react'
import { cn } from '@dalla/utils'
import { motion } from 'motion/react'
import { SearchFilterProps } from '@lib/types/proposals'

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const getSortFieldDisplay = (field: string): string => {
    switch (field) {
      case 'date':
        return 'Date'
      case 'amount':
        return 'Amount'
      case 'title':
        return 'Title'
      default:
        return field.charAt(0).toUpperCase() + field.slice(1)
    }
  }

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div className="relative w-full sm:max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 w-full rounded-lg border-gray-200 bg-white pl-10 text-sm focus-visible:border-[#63B7B7] focus-visible:ring-[#63B7B7]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-10 items-center gap-1.5 rounded-lg border-gray-200 bg-white text-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 text-[#63B7B7]" />
                  <span>
                    <span className="mr-1 text-gray-600">Sort:</span>
                    <span className="font-medium text-gray-900">
                      {getSortFieldDisplay(sortBy)}
                    </span>
                  </span>
                  <span className="text-[#63B7B7]">
                    {sortOrder === 'desc' ? (
                      <ArrowDown className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUp className="h-3.5 w-3.5" />
                    )}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-lg border border-gray-100 bg-white p-1.5 shadow-lg"
              >
                <div className="px-3 py-2 text-xs font-medium uppercase text-gray-500">
                  Sort by
                </div>
                <DropdownMenuItem
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm',
                    sortBy === 'date'
                      ? 'bg-[#63B7B7]/10 font-medium text-[#63B7B7]'
                      : 'hover:bg-gray-50',
                  )}
                  onClick={() => onSort('date')}
                >
                  <span>Date</span>
                  {sortBy === 'date' && (
                    <span className="text-[#63B7B7]">
                      {sortOrder === 'desc' ? (
                        <ArrowDown className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUp className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm',
                    sortBy === 'amount'
                      ? 'bg-[#63B7B7]/10 font-medium text-[#63B7B7]'
                      : 'hover:bg-gray-50',
                  )}
                  onClick={() => onSort('amount')}
                >
                  <span>Amount</span>
                  {sortBy === 'amount' && (
                    <span className="text-[#63B7B7]">
                      {sortOrder === 'desc' ? (
                        <ArrowDown className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUp className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm',
                    sortBy === 'title'
                      ? 'bg-[#63B7B7]/10 font-medium text-[#63B7B7]'
                      : 'hover:bg-gray-50',
                  )}
                  onClick={() => onSort('title')}
                >
                  <span>Title</span>
                  {sortBy === 'title' && (
                    <span className="text-[#63B7B7]">
                      {sortOrder === 'desc' ? (
                        <ArrowDown className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUp className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 bg-gray-100" />
                <div className="px-3 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center justify-center gap-1.5 text-sm"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#63B7B7]" />
                    Advanced filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-gray-200 bg-white transition-colors hover:border-gray-300 hover:bg-gray-50"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-gray-100 bg-white px-6 py-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-[#63B7B7]/20 bg-[#63B7B7]/10 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/20"
                >
                  In review
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  Interviewing
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  Viewed
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Project Duration
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  &lt; 1 month
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-[#63B7B7]/20 bg-[#63B7B7]/10 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/20"
                >
                  1-3 months
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  &gt; 3 months
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">
                Client Location
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  United States
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  Europe
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                >
                  Asia
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              variant="ghost"
              className="mr-2 h-8 text-xs text-gray-600"
            >
              Reset filters
            </Button>
            <Button
              size="sm"
              className="h-8 bg-[#63B7B7] text-xs text-white hover:bg-[#63B7B7]/90"
            >
              Apply filters
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default SearchFilter
