import { atomWithLocalForage } from './atom-with-localforge'

interface GlobalAtom {
  mode: 'company' | 'user'
  email: string
  username?: string
  name: string
}

export const globalAtom = atomWithLocalForage<GlobalAtom>(
  'dalla:global',
  {} as GlobalAtom,
)
