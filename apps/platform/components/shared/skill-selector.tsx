'use client'

import * as React from 'react'
import { X, Check, Plus } from 'lucide-react'
import { Badge } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
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

// Sample predefined skills - in a real app, this might come from an API
const predefinedSkills = [
  { id: '1', name: 'React' },
  { id: '2', name: 'TypeScript' },
  { id: '3', name: 'JavaScript' },
  { id: '4', name: 'HTML' },
  { id: '5', name: 'CSS' },
  { id: '6', name: 'Node.js' },
  { id: '7', name: 'Next.js' },
  { id: '8', name: 'Tailwind CSS' },
  { id: '9', name: 'GraphQL' },
  { id: '10', name: 'REST API' },
  { id: '11', name: 'MongoDB' },
  { id: '12', name: 'PostgreSQL' },
  { id: '13', name: 'Redux' },
  { id: '14', name: 'React Query' },
  { id: '15', name: 'Docker' },
]

type Skill = {
  id: string
  name: string
}

interface SkillSelectorProps {
  onSkillsChange?: (skills: Skill[]) => void
  maxSkills?: number
  className?: string
  skills: string[]
  handleSkills?: (skills: string[]) => void
}

export function SkillSelector({
  skills = [],
  handleSkills = () => {},
  onSkillsChange,
  maxSkills = 10,
  className,
}: SkillSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>(
    skills
      ? skills.map((name) => {
          const existing = predefinedSkills.find((skill) => skill.name === name)
          return existing || { id: `custom-${name}`, name }
        })
      : [],
  )
  const [searchValue, setSearchValue] = React.useState('')
  const [customSkillInput, setCustomSkillInput] = React.useState('')

  // Filter skills based on search and exclude already selected ones
  const filteredSkills = React.useMemo(() => {
    return predefinedSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        !selectedSkills.some((s) => s.id === skill.id),
    )
  }, [searchValue, selectedSkills])

  // Check if the search term doesn't match any predefined skills and isn't empty
  const isCustomSkill =
    searchValue.trim() !== '' &&
    !predefinedSkills.some(
      (skill) => skill.name.toLowerCase() === searchValue.toLowerCase(),
    ) &&
    !selectedSkills.some(
      (skill) => skill.name.toLowerCase() === searchValue.toLowerCase(),
    )

  // Handle selecting a skill
  const handleSelectSkill = (skill: Skill) => {
    if (selectedSkills.length >= maxSkills) return

    const updatedSkills = [...selectedSkills, skill]
    setSelectedSkills(updatedSkills)

    if (typeof handleSkills === 'function') {
      handleSkills(updatedSkills.map((skill) => skill.name))
    }

    if (typeof onSkillsChange === 'function') {
      onSkillsChange(updatedSkills)
    }

    setSearchValue('')
  }

  // Handle adding a custom skill
  const handleAddCustomSkill = () => {
    if (searchValue.trim() === '' || selectedSkills.length >= maxSkills) return

    // Create a new skill with a unique ID
    const newSkill = {
      id: `custom-${Date.now()}`,
      name: searchValue.trim(),
    }

    const updatedSkills = [...selectedSkills, newSkill]
    setSelectedSkills(updatedSkills)

    if (typeof handleSkills === 'function') {
      handleSkills(updatedSkills.map((skill) => skill.name))
    }

    if (typeof onSkillsChange === 'function') {
      onSkillsChange(updatedSkills)
    }

    setSearchValue('')
  }

  // Handle removing a skill
  const handleRemoveSkill = (skillId: string) => {
    const updatedSkills = selectedSkills.filter((skill) => skill.id !== skillId)
    setSelectedSkills(updatedSkills)

    if (typeof handleSkills === 'function') {
      handleSkills(updatedSkills.map((skill) => skill.name))
    }

    if (typeof onSkillsChange === 'function') {
      onSkillsChange(updatedSkills)
    }
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="flex w-full flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <Badge
            key={skill.id}
            variant="secondary"
            className="px-3 py-1 text-sm"
          >
            {skill.name}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill.id)}
              className="ring-offset-background focus:ring-ring ml-2 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill.name}</span>
            </button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="!h-11 w-full justify-between rounded-xl hover:bg-transparent"
            disabled={selectedSkills.length >= maxSkills}
          >
            {selectedSkills.length >= maxSkills
              ? `Maximum of ${maxSkills} skills reached`
              : 'Select or add skills...'}
            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search skills..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                {isCustomSkill ? (
                  <div className="px-2 py-3">
                    <p className="text-muted-foreground mb-2 text-sm">
                      No matching skills found. Add as a custom skill?
                    </p>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={handleAddCustomSkill}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add "{searchValue}"
                    </Button>
                  </div>
                ) : (
                  'No skills found.'
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredSkills.map((skill) => (
                  <CommandItem
                    key={skill.id}
                    value={skill.name}
                    onSelect={() => {
                      handleSelectSkill(skill)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedSkills.some((s) => s.id === skill.id)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {skill.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <p className="text-muted-foreground text-xs">
        {selectedSkills.length} of {maxSkills} skills selected
      </p>
    </div>
  )
}
