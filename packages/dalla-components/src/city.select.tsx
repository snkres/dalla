'use client'
import React, {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useRef,
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

import { ChevronDown, CheckIcon, Map } from 'lucide-react'

// Common global cities that should be available regardless of country
const commonCities = ['Remote', 'Hybrid', 'Multiple Locations']

const citiesByCountry: Record<string, string[]> = {
  US: [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Francisco',
    'Florida',
  ],
  GB: [
    'London',
    'Birmingham',
    'Manchester',
    'Glasgow',
    'Liverpool',
    'Leeds',
    'Sheffield',
    'Edinburgh',
    'Bristol',
    'Cardiff',
  ],
  CA: [
    'Toronto',
    'Montreal',
    'Vancouver',
    'Calgary',
    'Edmonton',
    'Ottawa',
    'Quebec City',
    'Winnipeg',
    'Hamilton',
    'Victoria',
  ],
  AU: [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Canberra',
    'Newcastle',
    'Wollongong',
    'Hobart',
  ],
  IN: [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
  ],
  SA: [
    'Riyadh',
    'Jeddah',
    'Mecca',
    'Medina',
    'Dammam',
    'Khobar',
    'Tabuk',
    'Abha',
    'Al-Qatif',
    'Taif',
  ],
  AE: [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Al Ain',
    'Umm Al Quwain',
  ],
  QA: [
    'Doha',
    'Al Wakrah',
    'Al Khor',
    'Dukhan',
    'Mesaieed',
    'Lusail',
    'Al Rayyan',
  ],
  KW: [
    'Kuwait City',
    'Hawalli',
    'Salmiya',
    'Al Ahmadi',
    'Farwaniya',
    'Jahra',
    'Sabah Al Salem',
  ],
  BH: [
    'Manama',
    'Riffa',
    'Muharraq',
    'Hamad Town',
    'Isa Town',
    'Sitra',
    'Budaiya',
  ],
  OM: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Seeb', 'Bawshar'],
  JO: ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Madaba', 'Jerash', 'Salt'],
  LB: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Baalbek', 'Jounieh', 'Byblos'],
  IQ: [
    'Baghdad',
    'Basra',
    'Mosul',
    'Erbil',
    'Najaf',
    'Karbala',
    'Sulaymaniyah',
  ],
  EG: [
    'Cairo',
    'Alexandria',
    'Giza',
    'Luxor',
    'Aswan',
    'Sharm El Sheikh',
    'Hurghada',
    'Port Said',
  ],
  YE: ["Sana'a", 'Aden', 'Taiz', 'Hodeidah', 'Mukalla', 'Ibb', 'Dhamar'],
  SY: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama', 'Deir ez-Zor', 'Raqqa'],
  PS: ['Ramallah', 'Gaza', 'Nablus', 'Hebron', 'Bethlehem', 'Jenin', 'Jericho'],
  IR: ['Tehran', 'Isfahan', 'Shiraz', 'Mashhad', 'Tabriz', 'Qom', 'Kerman'],
  TR: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana', 'Gaziantep'],
}

// Default list of cities if country not found
const defaultCities = [...commonCities, 'Other']

// Dropdown props
interface CityDropdownProps {
  countryCode?: string
  onChange?: (city: string) => void
  value?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

const CityDropdownComponent = (
  {
    countryCode,
    onChange,
    value,
    disabled = false,
    placeholder = 'Select a city',
    className,
    ...props
  }: CityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | undefined>(value)
  const [inputValue, setInputValue] = useState('')
  const isInternalChange = useRef(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current && !isInternalChange.current) {
      setSelectedCity(value)
      prevValueRef.current = value
    }

    isInternalChange.current = false
  }, [value])

  // Get cities for the selected country
  const getAvailableCities = useCallback(() => {
    let availableCities = countryCode
      ? [...(citiesByCountry[countryCode] || []), ...commonCities]
      : defaultCities

    // Remove duplicates
    availableCities = Array.from(new Set(availableCities)).sort()

    // Always ensure "Remote" is at the top
    if (availableCities.includes('Remote')) {
      availableCities = [
        'Remote',
        ...availableCities.filter((city) => city !== 'Remote'),
      ]
    }

    return availableCities
  }, [countryCode])

  const cities = getAvailableCities()

  const handleSelect = useCallback(
    (city: string) => {
      setSelectedCity(city)
      setInputValue('')
      isInternalChange.current = true
      prevValueRef.current = city
      onChange?.(city)
      setOpen(false)
    },
    [onChange],
  )

  // Handle custom input submission
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && !cities.includes(inputValue)) {
      e.preventDefault()
      handleSelect(inputValue)
    }
  }

  // Filter cities based on input
  const filteredCities = inputValue
    ? cities.filter((city) =>
        city.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : cities

  // Get the displayed cities (filtered + possibly custom input)
  const displayedCities = () => {
    if (!inputValue) return filteredCities

    // If input value doesn't match any city exactly, add it as a custom option
    const exactMatch = filteredCities.some(
      (city) => city.toLowerCase() === inputValue.toLowerCase(),
    )

    return exactMatch ? filteredCities : [inputValue, ...filteredCities]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={cn(
          'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring focus:border-ring hover:border-ring flex h-10 w-full items-center justify-between whitespace-nowrap rounded-3xl border bg-transparent px-3 py-2 !text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {selectedCity ? (
          <div className="flex w-0 flex-grow items-center justify-between gap-2 overflow-hidden">
            <Map size={16} className="text-muted-foreground shrink-0" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium">
              {selectedCity}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Map size={16} className="text-muted-foreground opacity-70" />
            <span className="!text-xs">{placeholder}</span>
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
                placeholder="Search or type a city..."
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleInputKeyDown}
                className="rounded-lg border-gray-200"
              />
            </div>
            <CommandEmpty className="py-2 text-center text-sm">
              {inputValue ? (
                <div>
                  <p>No matching cities found.</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Press Enter to add "{inputValue}"
                  </p>
                </div>
              ) : (
                <p>No cities available for this country.</p>
              )}
            </CommandEmpty>
            <CommandGroup className="py-1">
              {displayedCities().map((city, key: number) => (
                <CommandItem
                  className="mx-0.5 my-0.5 flex w-full items-center gap-2 rounded-md transition-colors duration-150 hover:!bg-[#3997A0] hover:!text-white"
                  key={key}
                  onSelect={() => handleSelect(city)}
                >
                  <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden py-0.5">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                      {city}
                    </span>
                  </div>
                  {city === inputValue && !cities.includes(city) && (
                    <span className="text-muted-foreground ml-auto text-xs">
                      Custom
                    </span>
                  )}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4 shrink-0',
                      city === selectedCity ? 'opacity-100' : 'opacity-0',
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

CityDropdownComponent.displayName = 'CityDropdownComponent'

export const CityDropdown = forwardRef(CityDropdownComponent)

export interface LocationValue {
  country?: {
    code: string
    name: string
  }
  city?: string
}

export function formatLocation(location: LocationValue): string {
  if (!location.country && !location.city) return ''
  if (!location.city) return location.country?.name || ''
  if (!location.country) return location.city
  return `${location.city}, ${location.country.name}`
}
