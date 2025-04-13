'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@dalla/design-system'
import { PlatformIcon } from '@components/shared/platform-icon'
import { cn } from '@dalla/utils'

// Common social media platforms
const COMMON_PLATFORMS = [
  'LinkedIn',
  'GitHub',
  'Twitter',
  'Facebook',
  'Instagram',
  'YouTube',
  'Medium',
  'Dribbble',
  'Behance',
  'Stack Overflow',
  'Personal Website',
  'Portfolio',
  'TikTok',
  'Pinterest',
  'Reddit',
  'Twitch',
  'Discord',
  'Slack',
]

interface PlatformAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function PlatformAutocomplete({
  value,
  onChange,
  onBlur,
  error,
  placeholder = 'Platform Name',
  className,
  autoFocus,
}: PlatformAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    // Handle clicks outside the component to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)

    if (inputValue.trim()) {
      const filtered = COMMON_PLATFORMS.filter((platform) =>
        platform.toLowerCase().includes(inputValue.toLowerCase()),
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setSuggestions([])
    inputRef.current?.blur()
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (value.trim()) {
      const filtered = COMMON_PLATFORMS.filter((platform) =>
        platform.toLowerCase().includes(value.toLowerCase()),
      )
      setSuggestions(filtered)
    }
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsFocused(false)
      if (onBlur) onBlur()
    }, 200)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            'h-9 w-full pl-9 !text-xs transition-all duration-200',
            isFocused ? 'ring-2 ring-[#63B7B7]/30' : '',
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'focus-visible:ring-[#63B7B7]',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `platform-error-${value}` : undefined}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <PlatformIcon platform={value} url="" size={16} />
        </div>
      </div>

      {error && (
        <p id={`platform-error-${value}`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

      {suggestions.length > 0 && isFocused && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <PlatformIcon platform={suggestion} url="" size={16} />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
