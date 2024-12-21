import { CTA } from '@components/landing/cta'
import { Boxes } from '@components/landing/boxes'
import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'
import { Navbar } from '@components/landing/layout/navbar'

export default function Home(): React.ReactNode {
  return (
    <main className="bg-background min-h-screen pb-10">
      <Navbar />
      <CTA />
      <div className="h-[50dvh]"></div>
      <Features />
      <div className="h-[50dvh]"></div>

      <DallaAi />
      <div className="h-[50dvh]"></div>
      <Boxes />
    </main>
  )
}
