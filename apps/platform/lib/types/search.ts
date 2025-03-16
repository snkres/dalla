import { BudgetRange } from './project'

export interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showFilterPanel: boolean
  setShowFilterPanel: (show: boolean) => void
  showSearchHelp: boolean
  setShowSearchHelp: (show: boolean) => void
  selectedBudgetRange: [number, number]
  setSelectedBudgetRange: (range: [number, number]) => void
  budgetRanges: BudgetRange[]
  selectedDurations: string[]
  setSelectedDurations: (durations: string[]) => void
  durationOptions: Option[]
  selectedLocations: string[]
  setSelectedLocations: (locations: string[]) => void
  locationOptions: Option[]
  selectedSkills: string[]
  setSelectedSkills: (skills: string[]) => void
  allSkills: string[]
  handleResetFilters: () => void
}

export interface Option {
  label: string
  value: string
}

export interface FilterPanelProps {
  filterPanelRef: React.RefObject<HTMLDivElement>
  setShowFilterPanel: (show: boolean) => void
  handleResetFilters: () => void
  selectedBudgetRange: [number, number]
  setSelectedBudgetRange: (range: [number, number]) => void
  budgetRanges: BudgetRange[]
  selectedDurations: string[]
  setSelectedDurations: (durations: string[]) => void
  durationOptions: Option[]
  selectedLocations: string[]
  setSelectedLocations: (locations: string[]) => void
  locationOptions: Option[]
  selectedSkills: string[]
  setSelectedSkills: (skills: string[]) => void
  allSkills: string[]
}
