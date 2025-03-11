import { atomWithStorage, createJSONStorage } from 'jotai/utils'

interface GlobalAtom {
  mode: 'company' | 'user'
  email: string
  username?: string
  name: string
}

const storage = createJSONStorage<GlobalAtom>(() => sessionStorage)

export const globalAtom = atomWithStorage<GlobalAtom>(
  'global',
  {} as GlobalAtom,
  storage,
)
