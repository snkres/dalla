import type { Metadata } from 'next'
import '../globals.css'
import '@fontsource-variable/sora'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const isProd = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: 'Dalla' + (isProd ? '' : ' - Dev'),
  description: 'Dalla Platform',
  icons: ['/favicon.svg'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <NuqsAdapter> {children}</NuqsAdapter>

        {/* <PrefetchCrossZoneLinks hrefs={['/', '/about']} /> */}
      </body>
    </html>
  )
}
