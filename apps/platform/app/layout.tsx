import type { Metadata } from 'next'
import '../globals.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/inter'
import { Toaster } from '@dallah/design-system/ui/toast/toaster'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ViewTransitions } from 'next-view-transitions'
import { Suspense } from 'react'

const isProd = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: 'Dalla Platform' + (isProd ? '' : ' - Dev'),
  description: 'Dalla Platform',
  icons: ['/favicon.svg'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html>
        <body className="font-inter">
          <Suspense>
            <NuqsAdapter>{children}</NuqsAdapter>
          </Suspense>
          {/* <PrefetchCrossZoneLinks hrefs={['/', '/about']} /> */}
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
