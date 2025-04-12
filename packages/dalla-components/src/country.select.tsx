'use client'
import React, {
  useCallback,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@dalla/design-system'
import { Popover, PopoverContent, PopoverTrigger } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { ChevronDown, CheckIcon, Globe } from 'lucide-react'
import { CircleFlag } from 'react-circle-flags'
import { countries } from 'country-data-list'

export interface Country {
  alpha2: string
  alpha3: string
  countryCallingCodes: string[]
  currencies: string[]
  emoji?: string
  ioc: string
  languages: string[]
  name: string
  status: string
}

interface CountryDropdownProps {
  options?: Country[]
  onChange?: (country: Country) => void
  defaultValue?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  slim?: boolean
  className?: string
}

export const MENA_COUNTRIES = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Jordan',
  'Lebanon',
  'Iraq',
  'Egypt',
  'Yemen',
  'Syria',
  'Palestine',
  'Iran',
  'Turkey',
]

export const COUNTRY_CODE_MAPPING: Record<string, string> = {
  'Saudi Arabia': 'SA',
  'United Arab Emirates': 'AE',
  Qatar: 'QA',
  Kuwait: 'KW',
  Bahrain: 'BH',
  Oman: 'OM',
  Jordan: 'JO',
  Lebanon: 'LB',
  Iraq: 'IQ',
  Egypt: 'EG',
  Yemen: 'YE',
  Syria: 'SY',
  Palestine: 'PS',
  Iran: 'IR',
  Turkey: 'TR',
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== 'deleted' && country.ioc !== 'PRK',
    ),
    onChange,
    defaultValue,
    value,
    disabled = false,
    placeholder = 'Select a country',
    slim = false,
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  // Prioritize Saudi Arabia first, then other MENA countries
  const sortedOptions = [...options].sort((a, b) => {
    // Saudi Arabia gets top priority
    if (a.name === 'Saudi Arabia') return -1
    if (b.name === 'Saudi Arabia') return 1

    // Then other MENA countries
    const aIsMENA = MENA_COUNTRIES.includes(a.name)
    const bIsMENA = MENA_COUNTRIES.includes(b.name)

    if (aIsMENA && !bIsMENA) return -1
    if (!aIsMENA && bIsMENA) return 1
    return a.name.localeCompare(b.name)
  })

  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  )
  const isInternalChange = useRef(false)

  useEffect(() => {
    if (!value || isInternalChange.current) {
      isInternalChange.current = false
      return
    }

    let country = options.find(
      (c) => c.name.toLowerCase() === value.toLowerCase(),
    )

    if (!country) {
      const parts = value.split(',')
      if (parts.length > 1) {
        const countryName = parts[parts.length - 1].trim()
        country = options.find(
          (c) => c.name.toLowerCase() === countryName.toLowerCase(),
        )

        if (!country) {
          const countryCode = COUNTRY_CODE_MAPPING[countryName]
          if (countryCode) {
            country = options.find((c) => c.alpha2 === countryCode)
          }
        }
      }
    }

    if (!country) {
      country = options.find((c) =>
        value.toLowerCase().includes(c.name.toLowerCase()),
      )
    }

    if (
      country &&
      (!selectedCountry || country.name !== selectedCountry.name)
    ) {
      setSelectedCountry(country)
    }
  }, [value, options, selectedCountry])

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country)
      isInternalChange.current = true
      onChange?.(country)
      setOpen(false)
    },
    [onChange],
  )

  const triggerClasses = cn(
    'flex h-10 w-full items-center justify-between whitespace-nowrap rounded-3xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring hover:border-ring transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    slim ? 'w-20' : '',
    className,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex w-full items-center gap-2 overflow-hidden text-ellipsis">
            <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase()}
                height={20}
              />
            </div>
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap !text-xs font-medium">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-muted-foreground opacity-70" />
            {slim === false && <span className="!text-xs">{placeholder}</span>}
          </div>
        )}
        <ChevronDown
          size={16}
          className="text-muted-foreground ml-auto shrink-0"
        />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] rounded-xl border border-gray-200 bg-white p-0 shadow-md"
      >
        <Command className="max-h-[250px] w-full bg-white sm:max-h-[300px]">
          <CommandList>
            <div className="bg-popover sticky top-0 z-10 bg-white p-1.5">
              <CommandInput
                placeholder="Search country..."
                className="rounded-lg border-gray-200"
              />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="py-1">
              {sortedOptions
                .filter((x) => x.name !== 'Israel')
                .map((option, key: number) => (
                  <CommandItem
                    className="mx-0.5 my-0.5 flex w-full items-center gap-2 rounded-md transition-colors duration-150 hover:!bg-[#3997A0] hover:!text-white"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex w-0 flex-grow space-x-2 overflow-hidden py-0.5">
                      <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={option.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4 shrink-0',
                        option.name === selectedCountry?.name
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

CountryDropdownComponent.displayName = 'CountryDropdownComponent'

export const CountryDropdown = forwardRef(CountryDropdownComponent)
