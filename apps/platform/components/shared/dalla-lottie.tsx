'use client'
import type { FC } from 'react'
import Lottie from 'lottie-react'

export const DallaLogoLottie: FC<{
  width: number
  height: number
}> = ({ width, height }) => {
  return (
    <div>
      <Lottie
        animationData="/dalla-lottie.json"
        loop={true}
        autoplay={true}
        style={{ width, height }}
        size={500}
      />
    </div>
  )
}
