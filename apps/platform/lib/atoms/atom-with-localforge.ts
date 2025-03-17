import { atom } from 'jotai'
import localForage from 'localforage'
import { atomWithStorage } from 'jotai/utils'

// Create a global ready state atom
export const dbReadyAtom = atom(false)

localForage.config({
  name: 'dalla',
  storeName: 'dalla',
})

let dbReadyPromise: Promise<void> | null = null

export function getDbReadyPromise() {
  if (!dbReadyPromise) {
    dbReadyPromise = new Promise<void>((resolve) => {
      // Test if IndexedDB is working
      const request = window.indexedDB.open('dalla-test', 1)

      request.onsuccess = () => {
        const db = request.result
        db.close()

        // Test localForage
        localForage
          .setItem('__test_key__', 'test')
          .then(() => localForage.removeItem('__test_key__'))
          .then(() => resolve())
          .catch((err) => {
            console.error('LocalForage test failed:', err)
            resolve() // Resolve anyway to not block the app
          })
      }

      request.onerror = () => {
        console.error('IndexedDB test failed:', request.error)
        resolve() // Resolve anyway to not block the app
      }
    })
  }

  return dbReadyPromise
}

export function atomWithLocalForage<T>(key: string, initialValue: T) {
  // Create a primitive atom for the value
  const baseAtom = atom<T>(initialValue)

  // Create a derived atom for reading/writing
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      set(baseAtom, update)

      // Save to localForage
      localForage.setItem(key, update).catch((error) => {
        console.error(
          `Error saving value for key ${key} to localForage:`,
          error,
        )
      })
    },
  )

  // Add onMount to load from storage
  derivedAtom.onMount = (setAtom) => {
    const loadFromStorage = async () => {
      try {
        const storedValue = await localForage.getItem<T>(key)
        if (storedValue !== null) {
          // Use the setter function correctly
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

  return derivedAtom
}

// Initialize and check IndexedDB readiness
export function initializeIndexedDB() {
  return new Promise<void>((resolve) => {
    // Check if IndexedDB is available
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported in this browser')
      resolve()
      return
    }

    // Test opening a connection to IndexedDB
    const request = window.indexedDB.open('dalla-test', 1)

    request.onsuccess = () => {
      const db = request.result
      db.close()
      resolve()
    }

    request.onerror = () => {
      console.error('IndexedDB initialization error:', request.error)
      resolve() // Resolve anyway to not block the app
    }
  })
}

// Function to initialize global atoms
export async function initializeGlobalAtoms(
  setDbReady: (ready: boolean) => void,
) {
  try {
    await initializeIndexedDB()

    // Check if localForage is ready by testing a simple operation
    await localForage.setItem('__test_key__', 'test')
    await localForage.removeItem('__test_key__')

    // Signal that DB is ready
    setDbReady(true)
  } catch (error) {
    console.error('Error initializing storage:', error)
    // Signal ready anyway to not block the app
    setDbReady(true)
  }
}
