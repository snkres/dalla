import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface Milestone {
  id: number
  title: string
  completed: boolean
  date: string
  progress?: number
}

export interface Activity {
  id: number
  type: 'milestone' | 'comment' | 'file'
  message: string
  time: string
  user: string
}

export interface Project {
  id: number
  title: string
  company: string
  companyLogo?: string
  budget: string
  skills: string[]
  location: string
  description: string
  duration?: string
  postedDate?: string
  urgent?: boolean
  status?: string
  progress?: number
  team?: string
  milestones?: Milestone[]
  recentActivities?: Activity[]
  deadline?: string
  featured?: boolean
  detailed?: string
  requirements?: string[]
  benefits?: string[]
  applications?: number
  views?: number
}

export interface FilterCategory {
  key: string
  label: string
  icon: LucideIcon
  tooltip: string
}

export interface BudgetRange {
  value: [number, number]
  label: string | ReactNode
}

export interface FilterOption {
  value: string
  label: string
}
