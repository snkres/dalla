import { CTA } from '@components/landing/cta'
import { Boxes } from '@components/landing/boxes'
import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'
import Hero from '@components/landing/hero'
import { Navbar } from '@components/landing/layout/navbar'

export default function Home(): React.ReactNode {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-10">
        <Hero />
        <Features />
        <CTA />
        <DallaAi />
        <Boxes />
      </main>
    </>
  )
}
