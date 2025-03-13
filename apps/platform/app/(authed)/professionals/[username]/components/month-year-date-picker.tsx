import { cn } from '@dallah/utils'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function MonthYearPicker({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
          setSelectedYear(date.getFullYear())
          setSelectedMonth(date.getMonth())
        }
      } catch (e) {}
    }
  }, [value])

  const formattedDate = selectedYear
    ? new Date(
        selectedYear,
        selectedMonth !== null ? selectedMonth : 0,
        1,
      ).toLocaleDateString('en-UK', {
        month: selectedMonth !== null ? 'short' : undefined,
        year: 'numeric',
      })
    : ''

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)

    const month = selectedMonth !== null ? selectedMonth : 0

    const date = new Date(year, month, 1)
    onChange(date.toISOString())
  }

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month)

    if (selectedYear) {
      const date = new Date(selectedYear, month, 1)
      onChange(date.toISOString())
    }
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={pickerRef}>
      <div
        className="flex h-7 w-full cursor-pointer items-center gap-1 rounded-none border-0 border-b border-gray-200 px-0 text-xs focus-within:border-[#63B7B7]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={formattedDate}
          placeholder={placeholder}
          readOnly
          className="h-full w-full cursor-pointer border-none bg-transparent px-0 py-1 outline-none focus:ring-0"
        />
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 max-h-56 divide-y divide-gray-100 overflow-hidden rounded-md border border-gray-200 bg-white text-xs shadow-lg">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="scrollbar-thin scrollbar-thumb-gray-200 max-h-56 overflow-y-auto p-1">
              {years.map((year) => (
                <div
                  key={year}
                  className={cn(
                    'cursor-pointer rounded px-2 py-1 hover:bg-gray-100',
                    selectedYear === year
                      ? 'bg-[#63B7B7]/10 font-medium text-[#63B7B7]'
                      : '',
                  )}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>

            <div className="scrollbar-thin scrollbar-thumb-gray-200 max-h-56 overflow-y-auto p-1">
              {months.map((month, index) => (
                <div
                  key={month}
                  className={cn(
                    'cursor-pointer rounded px-2 py-1 hover:bg-gray-100',
                    selectedMonth === index
                      ? 'bg-[#63B7B7]/10 font-medium text-[#63B7B7]'
                      : '',
                  )}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
