'use client'
import type { FC } from 'react'
import dallaLottie from './dalla-lottie.json'
import Lottie from 'react-lottie-player'
export const DallaLogoLottie: FC<{
  width: number
  height: number
}> = ({ width = 500, height = 500 }) => {
  return (
    <div>
      <Lottie
        animationData={dallaLottie}
        loop={true}
        style={{ width, height }}
        play
      />
    </div>
  )
}
