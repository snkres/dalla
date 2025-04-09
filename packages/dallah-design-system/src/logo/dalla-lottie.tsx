'use client'
import type { FC } from 'react'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import dallaLottie from './dalla-lottie.json'

export const DallaLogoLottie: FC<{
  width: number
  height: number
}> = ({ width, height }) => {
  return (
    <div>
      <Lottie
        animationData={dallaLottie}
        loop={true}
        autoplay={true}
        style={{ width, height }}
        size={500}
      />
    </div>
  )
}
