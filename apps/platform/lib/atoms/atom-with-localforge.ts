import { atom } from 'jotai'
import localForage from 'localforage'

localForage.config({
  name: 'dalla',
  storeName: 'dalla',
})

export function atomWithLocalForage<T>(key: string, initialValue: T) {
  const baseAtom = atom<T>(initialValue)

  baseAtom.onMount = (setAtom) => {
    setAtom(initialValue)

    const loadFromStorage = async () => {
      try {
        const storedValue = await localForage.getItem<T>(key)
        if (storedValue !== null) {
          setAtom(storedValue)
        }
      } catch (error) {
        console.error(
          `Error loading value for key ${key} from localForage:`,
          error,
        )
      }
    }

    loadFromStorage()
  }

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      set(baseAtom, update)

      localForage.setItem(key, update).catch((error) => {
        console.error(
          `Error saving value for key ${key} to localForage:`,
          error,
        )
      })
    },
  )

  return derivedAtom
}
