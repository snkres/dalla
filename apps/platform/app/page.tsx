import { Operations } from '@components/landing/operations'

import { CTA } from '@components/landing/cta'
import { Boxes } from '@components/landing/boxes'
import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'
import { Navbar } from '@components/landing/layout/navbar'
import { UnlockingSuccess } from '@components/landing/unlocking-success'
import { InsightsToEmpower } from '@components/landing/empower'
import { Footer } from '@components/landing/layout/footer'

export default function Home(): React.ReactNode {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pb-10">
        <Operations />
        <CTA />
        <div className="h-[50dvh]"></div>
        <Features />
        <div className="h-[50dvh]"></div>

        <DallaAi />
        <div className="h-[50dvh]"></div>
        <Boxes />
        <UnlockingSuccess />
        <InsightsToEmpower />
      </main>
      <Footer />
    </>
  )
}
