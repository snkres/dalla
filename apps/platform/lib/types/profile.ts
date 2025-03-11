export interface ProfileFormData {
  avatar: string
  fullName: string
  displayName: string
  title: string
  companyName: string
  location: string
  website: string
  bio: string
  expertise: string[]
  languages: string[]
  timezone: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface ProfileFormData {
  avatar: string
  fullName: string
  displayName: string
  title: string
  companyName: string
  location: string
  website: string
  bio: string
  expertise: string[]
  languages: string[]
  timezone: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export type Language = {
  language: string
  proficiency: string
}

export type LanguagesSectionProps = {
  languages: Language[]
  editedLanguages: Language[]
  setEditedLanguages: React.Dispatch<React.SetStateAction<Language[]>>
  isEditing: boolean
  setEditingSection: React.Dispatch<React.SetStateAction<string | null>>
}

export type Social = {
  platform: string
  url: string
  icon: React.ReactNode
}

export type SocialsSectionProps = {
  socials: { platform: string; url: string }[]
  editedSocials: { platform: string; url: string }[]
  setEditedSocials: React.Dispatch<
    React.SetStateAction<{ platform: string; url: string }[]>
  >
  isEditing: boolean
  setEditingSection: React.Dispatch<React.SetStateAction<string | null>>
  onChange: (
    languages: Language[],
    socials: { platform: string; url: string }[],
  ) => void
}

type Achievement = { text: string }

export type Position = {
  title: string
  period: string
  department?: string
  skills?: string[]
  achievements: Achievement[]
  description: string
  projectUrl?: string
  isRemote?: boolean
}

export type Experience = {
  company: string
  location?: string
  industry?: string
  companyUrl?: string
  companySize?: string
  positions: Position[]
}

export type ProjectStatus = 'completed' | 'ongoing'
export type Project = {
  date: string
  title: string
  subtask: string
  progress: number
  daysLeft: number
  status: ProjectStatus
  price: string
  testimonial?: {
    text: string
    author: string
    company: string
    rating: number
  }
}

export type ShowcaseProject = {
  title: string
  role: string
  description: string
  skills: string[]
  contractLink?: string
  thumbnail?: string
  link?: string
  media?: string[]
}

export type ProjectSidebar = {
  id: string
  title: string
  budget: string
  match: number
  category: string
  isNew?: boolean
}

export type SkillItem = {
  skill: string
  strength: number
  demand: 'High' | 'Medium' | 'Low'
  endorsed: number
}

export type QuickLink = {
  icon: React.ReactNode
  label: string
  href: string
  highlight?: boolean
}

export interface SidebarCardProps {
  children: React.ReactNode
}

export interface SidebarHeaderProps {
  icon: React.ReactNode
  title: string
  action?: React.ReactNode
}

export interface PlatformInfo {
  name: string
  icon: string // Icon component name from lucide-react
  domain: string | string[]
  color: string // Tailwind color class
  regex?: RegExp // Optional regex for more precise matching
}

export interface SocialLink {
  platform: string
  url: string
}
