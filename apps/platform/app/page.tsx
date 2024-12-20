import { DallaAi } from '@components/landing/dalla-ai'
import { Features } from '@components/landing/features'

export default function Home(): React.ReactNode {
  return (
    <main className="bg-background min-h-screen py-10">
      <Features />
      <DallaAi />
    </main>
  )
}
