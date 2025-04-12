'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { ChevronsUpDown, Check } from 'lucide-react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@dalla/design-system'
import { cn } from '@dalla/utils'

interface ExpertiseSelectProps {
  value: { name: string; description: string }[]
  onChange: (value: { name: string; description: string }[]) => void
  expertiseOptions: string[]
}

const ExpertiseSelect = ({
  value,
  onChange,
  expertiseOptions,
}: ExpertiseSelectProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-full w-full justify-between rounded-xl border-2 !py-0 px-4 transition-colors hover:border-[#234d64] hover:bg-transparent"
        >
          <div className="flex max-w-[90%] flex-wrap gap-1">
            {value.length > 0 ? (
              value.map((item) => (
                <span
                  key={item.name}
                  className="rounded-md bg-[#234d64]/10 px-2 py-0.5 text-sm text-[#234d64]"
                >
                  {item.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500">Select Target Industries...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-full w-full p-0">
        <Command className="rounded-lg">
          <CommandInput
            placeholder="Search expertise..."
            className="h-12 border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
          <CommandList className="h-full p-2">
            <CommandEmpty>No expertise found.</CommandEmpty>
            <CommandGroup>
              {expertiseOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    const newValue = value.find((item) => item.name === option)
                      ? value.filter((item) => item.name !== option)
                      : [...value, { name: option, description: 'Lorem Ipsum' }]
                    onChange(newValue)
                  }}
                  className="rounded-md hover:bg-[#234d64]/10 aria-selected:bg-[#234d64]/20"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.find((item) => item.name === option)
                        ? 'text-[#234d64] opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ExpertiseSelect
