'use client'
import { Operations } from '@components/landing/operations'
import { CTA } from '@components/landing/cta'
import { Boxes } from '@components/landing/boxes'
import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'
import { Hero } from '@components/landing/hero'
import { Navbar } from '@components/landing/layout/navbar'
import { UnlockingSuccess } from '@components/landing/unlocking-success'
import { Footer } from '@components/landing/layout/footer'
import { InsightsToEmpower } from '@components/landing/empower'
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function Home(): React.ReactNode {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen w-full px-[7.5rem]">
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
