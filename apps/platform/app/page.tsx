'use client'
import { Operations } from '@components/landing/operations'
import { CTA } from '@components/landing/cta'
import { Boxes } from '@components/landing/boxes'
import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'
import { Hero } from '@components/landing/hero'
import { Navbar } from '@components/landing/layout/navbar'
import { UnlockingSuccess } from '@components/landing/unlocking-success'
import { InsightsToEmpower } from '@components/landing/empower'
import { Footer } from '@components/landing/layout/footer'
import { useRouter } from 'next/navigation'

export default function Home(): React.ReactNode {
  window.location.href = '/login'
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen w-full py-10">
        <Hero />
        <Features />
        <Operations />
        <CTA />
        <DallaAi />
        <Boxes />
        <UnlockingSuccess />
        <InsightsToEmpower />
      </main>
      <Footer />
    </>
  )
}
