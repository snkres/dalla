import type { Metadata } from 'next'
import { PrefetchCrossZoneLinks } from '@dallah/components/prefetch'

export const metadata: Metadata = {
  title: 'Microfrontends - Main',
  description: 'Example demonstrating vertical microfrontends on Vercel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        {children}
        {/* <PrefetchCrossZoneLinks hrefs={['/docs', '/docs/about']} /> */}
      </body>
    </html>
  )
}
