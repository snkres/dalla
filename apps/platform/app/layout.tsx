import type { Metadata } from 'next'
import '../globals.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/montserrat'
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
      <body className="font-sora">
        {children}

        {/* <PrefetchCrossZoneLinks hrefs={['/', '/about']} /> */}
      </body>
    </html>
  )
}
