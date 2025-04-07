'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [global] = useAtom(globalAtom)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (Boolean(global.mode)) {
      setIsReady(true)
    }
  }, [global.mode])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: isReady && Boolean(global.mode),
      },
    },
  })

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
      <Script src="https://accounts.google.com/gsi/client" async defer />
    </Provider>
  )
}
