'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'

export const COMPANY_SIZE_RANGES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1001-5000', label: '1001-5000 employees' },
  { value: '5001-10000', label: '5001-10000 employees' },
  { value: '10000+', label: 'More than 10,000 employees' },
]

export function getSizeRangeFromValue(value: string | number): string {
  if (!value) return ''

  const numValue = typeof value === 'string' ? parseInt(value, 10) : value

  if (isNaN(numValue)) {
    const isValidRange = COMPANY_SIZE_RANGES.some(
      (range) => range.value === value,
    )
    return isValidRange ? (value as string) : ''
  }

  if (numValue <= 10) return '1-10'
  if (numValue <= 50) return '11-50'
  if (numValue <= 200) return '51-200'
  if (numValue <= 500) return '201-500'
  if (numValue <= 1000) return '501-1000'
  if (numValue <= 5000) return '1001-5000'
  if (numValue <= 10000) return '5001-10000'
  return '10000+'
}

interface CompanySizeSelectorProps {
  value?: string | number
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function CompanySizeSelector({
  value = '',
  onChange,
  disabled = false,
  placeholder = 'Select company size',
  className = '',
}: CompanySizeSelectorProps) {
  const isInternalChange = useRef(false)
  const [selectedSize, setSelectedSize] = useState<string>('')

  useEffect(() => {
    if (!isInternalChange.current) {
      const range = getSizeRangeFromValue(value)
      setSelectedSize(range)
    }
    isInternalChange.current = false
  }, [value])

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    isInternalChange.current = true
    onChange?.(size)
  }

  return (
    <Select
      value={selectedSize}
      onValueChange={handleSizeChange}
      disabled={disabled}
    >
      <SelectTrigger className={`h-10 w-full rounded-3xl ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {COMPANY_SIZE_RANGES.map((range) => (
          <SelectItem key={range.value} value={range.value}>
            {range.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
