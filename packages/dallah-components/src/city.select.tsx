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
} from '@dallah/design-system'
import { Popover, PopoverContent, PopoverTrigger } from '@dallah/design-system'

import { cn } from '@dallah/utils'

import { ChevronDown, CheckIcon, Map } from 'lucide-react'

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
const defaultCities = ['Remote', 'Other']

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
  const isInternalChange = useRef(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current && !isInternalChange.current) {
      setSelectedCity(value)
      prevValueRef.current = value
    }

    isInternalChange.current = false
  }, [value])

  const cities = countryCode
    ? citiesByCountry[countryCode] || defaultCities
    : defaultCities

  const handleSelect = useCallback(
    (city: string) => {
      setSelectedCity(city)
      isInternalChange.current = true
      prevValueRef.current = city
      onChange?.(city)
      setOpen(false)
    },
    [onChange],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={cn(
          'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between whitespace-nowrap rounded-3xl border bg-transparent px-3 py-2 !text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {selectedCity ? (
          <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
              {selectedCity}
            </span>
          </div>
        ) : (
          <span className="!text-xs">{placeholder}</span>
        )}
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] bg-white p-0"
      >
        <Command className="max-h-[200px] w-full bg-white sm:max-h-[270px]">
          <CommandList>
            <div className="bg-popover sticky top-0 z-10 bg-white">
              <CommandInput placeholder="Search city..." />
            </div>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city, key: number) => (
                <CommandItem
                  className="flex w-full items-center gap-2 hover:!bg-[#3997A0] hover:!text-[#fff]"
                  key={key}
                  onSelect={() => handleSelect(city)}
                >
                  <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                      {city}
                    </span>
                  </div>
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
