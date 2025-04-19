import { atomWithLocalForage } from './atom-with-localforge'

export interface GlobalAtom {
  id: string
  mode: 'company' | 'user'
  email: string
  username?: string
  name: string
  avatar?: string
  locale: 'en' | 'ar'
}

export const globalAtom = atomWithLocalForage<GlobalAtom>('dalla:global', {
  locale: 'en',
} as GlobalAtom)
