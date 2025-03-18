export interface Consultant {
  id: number
  name: string
  avatar: string
  expertise: string
  rating: number
  location: string
  hourlyRate: string
  experience: number
  skills: string[]
  expertiseAreas: { name: string; level: number }[]
  workHistory: {
    title: string
    company: string
    period: string
    type: string
    description: string
  }[]
  availability: string
  bio: string
}
