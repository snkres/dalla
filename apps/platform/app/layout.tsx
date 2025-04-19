import type { Metadata } from 'next'
import '../globals.css'
import { Sora } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from '@dalla/design-system/ui/toast/toaster'
import { ViewTransitions } from 'next-view-transitions'
import { Suspense } from 'react'
import Providers from './providers'
import { cn } from '@dalla/utils'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

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
  return (
    <ViewTransitions>
      <html className={cn(nebula.className, sora.variable)}>
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
