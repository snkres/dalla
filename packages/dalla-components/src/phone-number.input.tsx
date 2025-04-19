// Dependencies: pnpm install react-phone-number-input lucide-react

'use client'

import { Input } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { ChevronDown, Phone } from 'lucide-react'
import React, { forwardRef, useState } from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

export default function PhoneInputWithCountry({
  defaultValue,
  onChange,
  dir,
}: {
  defaultValue: string
  onChange: (value: string) => void
  dir: 'ltr' | 'rtl'
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="space-y-2" dir={dir}>
      <RPNInput.default
        dir={dir}
        className="flex h-11 !rounded-xl"
        international
        flagComponent={FlagComponent}
        countrySelectComponent={createCountrySelect(dir)}
        inputComponent={PhoneInput}
        id="input-46"
        placeholder={dir === 'ltr' ? 'Enter phone number' : 'أدخل رقم الهاتف'}
        value={value}
        onChange={(newValue) => {
          setValue(newValue ?? '')
          onChange(newValue ?? '')
        }}
      />
    </div>
  )
}

const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          '-ms-px h-11 rounded-e-xl rounded-s-none shadow-none focus-visible:z-10',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

PhoneInput.displayName = 'PhoneInput'

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: { label: string; value: RPNInput.Country | undefined }[]
  dir?: 'ltr' | 'rtl'
}

const createCountrySelect = (dir: 'ltr' | 'rtl') => {
  return function CountrySelectComponent({
    disabled,
    value,
    onChange,
    options,
  }: Omit<CountrySelectProps, 'dir'>) {
    return (
      <div
        className={cn(
          'text-muted-foreground focus-within:border-ring focus-within:ring-ring/20 hover:bg-accent hover:text-foreground relative inline-flex items-center self-stretch rounded-s-lg border border-e-0 border-[#D0D5DD] px-3 py-2 transition-shadow focus-within:z-10 focus-within:outline-none focus-within:ring-[3px] has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50',
        )}
      >
        <div
          className={cn(
            'inline-flex items-center gap-1',
            dir === 'ltr' ? 'flex-row' : 'flex-row-reverse',
          )}
          aria-hidden="true"
        >
          <FlagComponent
            country={value}
            countryName={value}
            aria-hidden="true"
          />
          <span className="text-slate-blue-100">
            <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
        <select
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value as RPNInput.Country)}
          className={cn(
            'absolute inset-0 text-sm opacity-0',
            dir === 'ltr' ? 'left-0' : 'right-0',
          )}
          aria-label="Select country"
        >
          <option key="default" value="">
            Select a country
          </option>
          {options
            .filter((x) => x.value)
            .map((option, i) => (
              <option key={option.value ?? `empty-${i}`} value={option.value}>
                {option.label}{' '}
                {option.value &&
                  `+${RPNInput.getCountryCallingCode(option.value)}`}
              </option>
            ))}
        </select>
      </div>
    )
  }
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <Phone size={16} aria-hidden="true" />
      )}
    </span>
  )
}
