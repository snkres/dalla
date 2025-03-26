'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  CountryDropdown,
  type Country,
  COUNTRY_CODE_MAPPING,
} from './country.select'
import { CityDropdown, type LocationValue } from './city.select'

interface LocationSelectorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: {
    country?: string
    city?: string
  }
  disabled?: boolean
  required?: boolean
}

const CODE_TO_COUNTRY_NAME: Record<string, string> = Object.entries(
  COUNTRY_CODE_MAPPING,
).reduce(
  (acc, [name, code]) => {
    acc[code as string] = name
    return acc
  },
  {} as Record<string, string>,
)

export function LocationSelector({
  value = '',
  onChange,
  placeholder = {
    country: 'Select country',
    city: 'Select city',
  },
  disabled = false,
  required = false,
}: LocationSelectorProps) {
  const isInternalChange = useRef(false)

  const parseInitialValue = (): LocationValue => {
    if (!value) return {}

    const parts = value.split(',').map((part) => part.trim())

    if (parts.length === 2) {
      const cityName = parts[0]
      const countryName = parts[1]

      const countryCode = COUNTRY_CODE_MAPPING[countryName] || ''

      return {
        city: cityName,
        country: {
          name: countryName,
          code: countryCode,
        },
      }
    } else if (parts.length === 1 && parts[0]) {
      const singleValue = parts[0]

      if (COUNTRY_CODE_MAPPING[singleValue]) {
        return {
          country: {
            name: singleValue,
            code: COUNTRY_CODE_MAPPING[singleValue],
          },
        }
      }

      return { city: singleValue }
    }

    return {}
  }

  const initialValue = parseInitialValue()

  const [location, setLocation] = useState<LocationValue>({
    country: initialValue.country,
    city: initialValue.city,
  })

  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current && !isInternalChange.current) {
      prevValueRef.current = value
      setLocation(parseInitialValue())
    }

    isInternalChange.current = false
  }, [value])

  const formatLocationValue = (location: LocationValue): string => {
    if (!location.country && !location.city) return ''

    if (!location.city) return location.country?.name || ''

    if (!location.country?.name) return location.city

    return `${location.city}, ${location.country.name}`
  }

  useEffect(() => {
    const formattedLocation = formatLocationValue(location)

    if (formattedLocation !== value && (location.country || location.city)) {
      isInternalChange.current = true
      prevValueRef.current = formattedLocation
      onChange?.(formattedLocation)
    }
  }, [location, onChange, value])

  const handleCountryChange = (country: Country) => {
    setLocation((prev) => {
      const countryName = CODE_TO_COUNTRY_NAME[country.alpha2] || country.name

      return {
        ...prev,
        country: {
          name: countryName,
          code: country.alpha2,
        },

        city: undefined,
      }
    })
  }

  const handleCityChange = (city: string) => {
    setLocation((prev) => ({
      ...prev,
      city,
    }))
  }

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
      <div className="w-full sm:w-1/2">
        <CountryDropdown
          onChange={handleCountryChange}
          placeholder={placeholder.country}
          disabled={disabled}
          value={location.country?.name}
        />
      </div>
      <div className="w-full sm:w-1/2">
        <CityDropdown
          countryCode={location.country?.code}
          onChange={handleCityChange}
          value={location.city}
          placeholder={placeholder.city}
          disabled={disabled || !location.country}
        />
      </div>
    </div>
  )
}
