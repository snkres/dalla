import { atom } from 'jotai'
import localForage from 'localforage'

localForage.config({
  name: 'dalla',
  storeName: 'dalla',
})

export function atomWithLocalForage<T>(key: string, initialValue: T) {
  const baseAtom = atom<T>(initialValue)

  localForage.getItem<T>(key).then((storedValue) => {
    if (storedValue !== null) {
      baseAtom.onMount = (setAtom) => {
        setAtom(storedValue)
      }
    }
  })

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      set(baseAtom, update)
      localForage.setItem(key, update)
    },
  )

  return derivedAtom
}
