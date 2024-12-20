import { Features } from '@components/landing/features'

export default function Home(): React.ReactNode {
  return (
    <main className="bg-background h-[200dvh]">
      <div className="h-[150dvh]"></div>
      <Features />
      <div className="h-[150dvh]"></div>
    </main>
  )
}
