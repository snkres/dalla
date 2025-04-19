import type { Metadata } from 'next'
import '../globals.css'
import '@fontsource-variable/sora'
import localFont from 'next/font/local'
import { Toaster } from '@dalla/design-system/ui/toast/toaster'
import { ViewTransitions } from 'next-view-transitions'
import { Suspense } from 'react'
import Providers from './providers'

// Define nebula font with correct variable name
const nebula = localFont({
  src: [
    {
      path: '../public/fonts/nebula/NebulaSans-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/nebula/NebulaSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/nebula/NebulaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

// Define madaniArabic font with correct variable name
const madaniArabic = localFont({
  src: '../public/fonts/madani/Madani-Arabic-Regular.woff2',
  variable: '--font-arabic',
  weight: '400',
  style: 'normal',
})

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
  const defaultLocale = 'en'

  return (
    <ViewTransitions>
      <html lang={defaultLocale} className={nebula.className}>
        <body className="font-sans">
          <Suspense>
            <Providers
              nebulaClassName={nebula.className}
              madaniArabicClassName={madaniArabic.className}
            >
              {children}
            </Providers>
          </Suspense>

          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
