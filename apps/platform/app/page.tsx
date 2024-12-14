'use client'
import Lottie from 'react-lottie-player'
import lottieJson from './lottie.json'

export default function Home(): React.ReactNode {
  return (
    <main>
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 500, height: 500 }}
        speed={4}
      />
    </main>
  )
}
