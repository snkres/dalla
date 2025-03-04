'use client'

import React, { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface DatePickerProps {
  label: string
  selectedMonth: string
  selectedYear: string
  onMonthChange: (month: string) => void
  onYearChange: (year: string) => void
  disabled?: boolean
  required?: boolean
  isRangeMode?: boolean
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  onStartMonthChange?: (month: string) => void
  onStartYearChange?: (year: string) => void
  onEndMonthChange?: (month: string) => void
  onEndYearChange?: (year: string) => void
  rangeLabel?: string
  limitToCurrentYear?: boolean
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const currentYear = new Date().getFullYear()

// Modified to create two different year arrays
const pastYears = Array.from({ length: 50 }, (_, i) =>
  (currentYear - 49 + i).toString(),
).filter((year) => parseInt(year) <= currentYear)

const allYears = Array.from({ length: 50 }, (_, i) =>
  (currentYear - 25 + i).toString(),
)

export function DatePicker({
  label,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  disabled = false,
  required = false,
  isRangeMode = false,
  startMonth = '',
  startYear = '',
  endMonth = '',
  endYear = '',
  onStartMonthChange,
  onStartYearChange,
  onEndMonthChange,
  onEndYearChange,
  rangeLabel = 'to',
  limitToCurrentYear = false,
}: DatePickerProps) {
  const [isMonthOpen, setIsMonthOpen] = React.useState(false)
  const [isYearOpen, setIsYearOpen] = React.useState(false)
  const [isStartMonthOpen, setIsStartMonthOpen] = React.useState(false)
  const [isStartYearOpen, setIsStartYearOpen] = React.useState(false)
  const [isEndMonthOpen, setIsEndMonthOpen] = React.useState(false)
  const [isEndYearOpen, setIsEndYearOpen] = React.useState(false)

  const monthRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const startMonthRef = useRef<HTMLDivElement>(null)
  const startYearRef = useRef<HTMLDivElement>(null)
  const endMonthRef = useRef<HTMLDivElement>(null)
  const endYearRef = useRef<HTMLDivElement>(null)

  // Choose which years array to use based on the limitToCurrentYear prop
  const yearsToShow = limitToCurrentYear ? pastYears : allYears

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        monthRef.current &&
        !monthRef.current.contains(event.target as Node)
      ) {
        setIsMonthOpen(false)
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false)
      }
      if (
        startMonthRef.current &&
        !startMonthRef.current.contains(event.target as Node)
      ) {
        setIsStartMonthOpen(false)
      }
      if (
        startYearRef.current &&
        !startYearRef.current.contains(event.target as Node)
      ) {
        setIsStartYearOpen(false)
      }
      if (
        endMonthRef.current &&
        !endMonthRef.current.contains(event.target as Node)
      ) {
        setIsEndMonthOpen(false)
      }
      if (
        endYearRef.current &&
        !endYearRef.current.contains(event.target as Node)
      ) {
        setIsEndYearOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isRangeMode) {
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative" ref={monthRef}>
            <button
              type="button"
              onClick={() => !disabled && setIsMonthOpen(!isMonthOpen)}
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {selectedMonth || 'Month'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isMonthOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isMonthOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => {
                      onMonthChange(month)
                      setIsMonthOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      selectedMonth === month ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={yearRef}>
            <button
              type="button"
              onClick={() => !disabled && setIsYearOpen(!isYearOpen)}
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {selectedYear || 'Year'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isYearOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isYearOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {yearsToShow.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      onYearChange(year)
                      setIsYearOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      selectedYear === year ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Range mode UI
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
        {/* Start date */}
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="relative" ref={startMonthRef}>
            <button
              type="button"
              onClick={() =>
                !disabled && setIsStartMonthOpen(!isStartMonthOpen)
              }
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {startMonth || 'Month'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isStartMonthOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isStartMonthOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => {
                      onStartMonthChange && onStartMonthChange(month)
                      setIsStartMonthOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      startMonth === month ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={startYearRef}>
            <button
              type="button"
              onClick={() => !disabled && setIsStartYearOpen(!isStartYearOpen)}
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {startYear || 'Year'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isStartYearOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isStartYearOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {/* Always use pastYears for start date in range mode */}
                {pastYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      onStartYearChange && onStartYearChange(year)
                      setIsStartYearOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      startYear === year ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Range separator */}
        <div className="flex justify-center">
          <span className="text-gray-500">{rangeLabel}</span>
        </div>

        {/* End date */}
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="relative" ref={endMonthRef}>
            <button
              type="button"
              onClick={() => !disabled && setIsEndMonthOpen(!isEndMonthOpen)}
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {endMonth || 'Month'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isEndMonthOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isEndMonthOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => {
                      onEndMonthChange && onEndMonthChange(month)
                      setIsEndMonthOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      endMonth === month ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={endYearRef}>
            <button
              type="button"
              onClick={() => !disabled && setIsEndYearOpen(!isEndYearOpen)}
              className={`flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 ${
                disabled
                  ? 'cursor-not-allowed bg-gray-50'
                  : 'hover:border-gray-400'
              }`}
              disabled={disabled}
            >
              <span className={disabled ? 'text-gray-400' : ''}>
                {endYear || 'Year'}
              </span>
              <ChevronDown
                size={20}
                className={`${disabled ? 'text-gray-300' : 'text-gray-400'} ${
                  isEndYearOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            {isEndYearOpen && (
              <div className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {allYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      onEndYearChange && onEndYearChange(year)
                      setIsEndYearOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      endYear === year ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
