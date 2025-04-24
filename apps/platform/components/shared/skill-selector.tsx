'use client'

import * as React from 'react'
import {
  X,
  Check,
  Plus,
  ChevronsUpDown,
  Search,
  AlertCircle,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Badge } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@dalla/design-system'
import { Popover, PopoverContent, PopoverTrigger } from '@dalla/design-system'
import { cn } from '@dalla/utils'

// Industry-grouped skills
const industries = [
  {
    id: 'tech',
    name: 'Technology',
    skills: [
      { id: 'tech-1', name: 'React' },
      { id: 'tech-2', name: 'TypeScript' },
      { id: 'tech-3', name: 'JavaScript' },
      { id: 'tech-4', name: 'HTML' },
      { id: 'tech-5', name: 'CSS' },
      { id: 'tech-6', name: 'Node.js' },
      { id: 'tech-7', name: 'Next.js' },
      { id: 'tech-8', name: 'Tailwind CSS' },
      { id: 'tech-9', name: 'GraphQL' },
      { id: 'tech-10', name: 'REST API' },
      { id: 'tech-11', name: 'MongoDB' },
      { id: 'tech-12', name: 'PostgreSQL' },
      { id: 'tech-13', name: 'Redux' },
      { id: 'tech-14', name: 'React Query' },
      { id: 'tech-15', name: 'Docker' },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    skills: [
      { id: 'design-1', name: 'UI Design' },
      { id: 'design-2', name: 'UX Design' },
      { id: 'design-3', name: 'Figma' },
      { id: 'design-4', name: 'Adobe XD' },
      { id: 'design-5', name: 'Sketch' },
      { id: 'design-6', name: 'Photoshop' },
      { id: 'design-7', name: 'Illustrator' },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    skills: [
      { id: 'business-1', name: 'Project Management' },
      { id: 'business-2', name: 'Agile' },
      { id: 'business-3', name: 'Scrum' },
      { id: 'business-4', name: 'Product Management' },
      { id: 'business-5', name: 'Marketing' },
      { id: 'business-6', name: 'Sales' },
      { id: 'business-7', name: 'Business Analysis' },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    skills: [
      { id: 'data-1', name: 'Data Analysis' },
      { id: 'data-2', name: 'SQL' },
      { id: 'data-3', name: 'Python' },
      { id: 'data-4', name: 'Data Visualization' },
      { id: 'data-5', name: 'Machine Learning' },
      { id: 'data-6', name: 'R' },
      { id: 'data-7', name: 'Tableau' },
    ],
  },
]

// Flatten the skills for searching
const allSkills = industries.flatMap((industry) =>
  industry.skills.map((skill) => ({
    ...skill,
    industryId: industry.id,
    industryName: industry.name,
  })),
)

type Skill = {
  id: string
  name: string
  industryId?: string
  industryName?: string
}

interface SkillSelectorProps {
  onSkillsChange?: (skills: Skill[]) => void
  maxSkills?: number
  className?: string
  skills: string[]
  handleSkills?: (skills: string[]) => void
  isArabic?: boolean
}

export function SkillSelector({
  skills = [],
  handleSkills = () => {},
  onSkillsChange,
  maxSkills = 10,
  className,
  isArabic = false,
}: SkillSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>(
    skills
      ? skills.map((name) => {
          const existing = allSkills.find((skill) => skill.name === name)
          return existing || { id: `custom-${name}`, name }
        })
      : [],
  )
  const [searchValue, setSearchValue] = React.useState('')
  const [expandedIndustries, setExpandedIndustries] = React.useState<string[]>([
    'tech',
  ]) // Default open the first industry

  const isMaxSkillsReached = selectedSkills.length >= maxSkills

  // Toggle industry accordion
  const toggleIndustry = (industryId: string) => {
    setExpandedIndustries((prev) =>
      prev.includes(industryId)
        ? prev.filter((id) => id !== industryId)
        : [...prev, industryId],
    )
  }

  // Filter skills based on search and exclude already selected ones
  const filteredSkills = React.useMemo(() => {
    if (!searchValue.trim()) return []

    return allSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        !selectedSkills.some((s) => s.id === skill.id),
    )
  }, [searchValue, selectedSkills])

  // Group filtered skills by industry for display
  const groupedFilteredSkills = React.useMemo(() => {
    const grouped: Record<string, { industry: string; skills: Skill[] }> = {}

    filteredSkills.forEach((skill) => {
      if (!grouped[skill.industryId!]) {
        grouped[skill.industryId!] = {
          industry: skill.industryName!,
          skills: [],
        }
      }
      grouped[skill.industryId!].skills.push(skill)
    })

    return Object.values(grouped)
  }, [filteredSkills])

  // Check if the search term doesn't match any existing skills and isn't empty
  const isCustomSkill =
    searchValue.trim() !== '' &&
    !allSkills.some(
      (skill) => skill.name.toLowerCase() === searchValue.toLowerCase(),
    ) &&
    !selectedSkills.some(
      (skill) => skill.name.toLowerCase() === searchValue.toLowerCase(),
    )

  // Handle selecting a skill
  const handleSelectSkill = (skill: Skill) => {
    if (isMaxSkillsReached) return

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
    if (searchValue.trim() === '' || isMaxSkillsReached) return

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

  const resetSearch = () => {
    setSearchValue('')
  }

  // Render industry accordion header
  const renderIndustryHeader = (
    industry: { id: string; name: string },
    availableSkillsCount: number,
  ) => {
    const isExpanded = expandedIndustries.includes(industry.id)

    return (
      <div
        className="flex cursor-pointer select-none items-center justify-between px-2 py-2 hover:bg-gray-50"
        onClick={() => toggleIndustry(industry.id)}
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown className="mr-1 h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="mr-1 h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {industry.name}
          </span>
        </div>
        {availableSkillsCount > 0 && (
          <span className="text-xs text-gray-500">
            {availableSkillsCount} skill{availableSkillsCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'flex !h-11 w-full justify-between rounded-xl border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:bg-gray-50',
              isMaxSkillsReached ? 'border-amber-300 bg-amber-50' : '',
              isArabic ? 'flex-row-reverse !text-right' : '',
            )}
          >
            <span className="truncate">
              {isArabic
                ? 'اختر المهارات'
                : isMaxSkillsReached
                  ? `${maxSkills} skills selected (maximum)`
                  : selectedSkills.length > 0
                    ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                    : 'Select skills...'}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-0 shadow-md"
          align="start"
          style={
            {
              '--command-item-select-bg': 'rgb(243 244 246)',
              '--command-item-select-color': 'rgb(17 24 39)',
            } as React.CSSProperties
          }
        >
          <Command className="rounded-md border-0">
            <div className="relative border-b border-gray-100">
              <CommandInput
                placeholder="Search skills across industries..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="border-transparent focus:border-transparent focus:outline-none focus:ring-0"
              />
              {searchValue && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={resetSearch}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {isMaxSkillsReached && (
              <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50 px-3 py-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-amber-700">
                  Maximum of {maxSkills} skills reached. Remove skills to add
                  new ones.
                </p>
              </div>
            )}

            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1 border-b border-gray-100 p-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="bg-gray-50 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSkill(skill.id)
                      }}
                      className="ml-1 rounded-full text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                    >
                      <X className="h-2.5 w-2.5" />
                      <span className="sr-only">Remove {skill.name}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <CommandList className="max-h-[300px]">
              {isCustomSkill &&
                !isMaxSkillsReached &&
                searchValue.trim() !== '' && (
                  <CommandEmpty>
                    {isCustomSkill && !isMaxSkillsReached ? (
                      <div className="px-2 py-2">
                        <p className="mb-2 text-sm text-gray-500">
                          No matching skills found. Add as a custom skill?
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-gray-800 text-white hover:bg-gray-700"
                          onClick={handleAddCustomSkill}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add "{searchValue}"
                        </Button>
                      </div>
                    ) : (
                      searchValue.trim() !== '' && (
                        <p className="py-3 text-center text-sm text-gray-500">
                          {isMaxSkillsReached && searchValue.trim() !== ''
                            ? 'Maximum skills reached. Remove some skills first.'
                            : 'No skills found.'}
                        </p>
                      )
                    )}
                  </CommandEmpty>
                )}
              {searchValue.trim() === ''
                ? // Show all industries as accordions when no search term
                  industries.map((industry) => {
                    const availableSkills = industry.skills.filter(
                      (skill) => !selectedSkills.some((s) => s.id === skill.id),
                    )
                    const isExpanded = expandedIndustries.includes(industry.id)

                    return (
                      <div
                        key={industry.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        {renderIndustryHeader(industry, availableSkills.length)}

                        {isExpanded && availableSkills.length > 0 && (
                          <div className="py-1 pr-2">
                            {availableSkills.map((skill) => (
                              <CommandItem
                                key={skill.id}
                                value={skill.name}
                                onSelect={() => {
                                  handleSelectSkill({
                                    ...skill,
                                    industryId: industry.id,
                                    industryName: industry.name,
                                  })
                                }}
                                className={`flex !items-center !justify-start px-0 text-start !text-gray-600 hover:bg-gray-100 hover:!text-gray-900 data-[selected=true]:bg-gray-100 data-[selected=true]:!text-gray-900 ${
                                  isMaxSkillsReached
                                    ? 'cursor-not-allowed opacity-50'
                                    : ''
                                }`}
                                disabled={isMaxSkillsReached}
                              >
                                <Check className="mr-2 h-4 w-4 text-gray-400 opacity-0" />
                                {skill.name}
                              </CommandItem>
                            ))}
                          </div>
                        )}

                        {isExpanded && availableSkills.length === 0 && (
                          <p className="py-1 pl-6 pr-2 text-center text-xs text-gray-400">
                            No available skills in this category
                          </p>
                        )}
                      </div>
                    )
                  })
                : // Show search results grouped by industry
                  groupedFilteredSkills.map(({ industry, skills }) => (
                    <div
                      key={industry}
                      className="border-b border-gray-100 last:border-0"
                    >
                      {renderIndustryHeader(
                        { id: industry, name: industry },
                        skills.length,
                      )}

                      {expandedIndustries.includes(industry) && (
                        <div className="py-1 pl-6 pr-2">
                          {skills.map((skill) => (
                            <CommandItem
                              key={skill.id}
                              value={skill.name}
                              onSelect={() => handleSelectSkill(skill)}
                              className={`text-gray-600 hover:bg-gray-100 hover:text-gray-900 data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 ${
                                isMaxSkillsReached
                                  ? 'cursor-not-allowed opacity-50'
                                  : ''
                              }`}
                              disabled={isMaxSkillsReached}
                            >
                              <Check className="mr-2 h-4 w-4 text-gray-400 opacity-0" />
                              {skill.name}
                            </CommandItem>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
            </CommandList>

            <div className="border-t border-gray-100 px-2 py-1.5">
              <p className="text-xs text-gray-500">
                {selectedSkills.length} of {maxSkills} skills selected
              </p>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
