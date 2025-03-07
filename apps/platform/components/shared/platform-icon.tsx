'use client'

import type React from 'react'

import * as LucideIcons from 'lucide-react'
import type { PlatformInfo } from '@lib/types/profile'
import { detectPlatform } from '@lib/utils/detect-platform'

interface PlatformIconProps {
  platform?: string
  url?: string
  size?: number
  className?: string
}

export function PlatformIcon({
  platform,
  url,
  size = 16,
  className = '',
}: PlatformIconProps) {
  // Determine platform info either from platform name or URL
  let platformInfo: PlatformInfo

  if (url) {
    platformInfo = detectPlatform(url)
  } else if (platform) {
    const matchedPlatform = detectPlatform(
      `https://${platform.toLowerCase()}.com`,
    )
    platformInfo = matchedPlatform
  } else {
    platformInfo = {
      name: 'Website',
      icon: 'Globe',
      domain: '',
      color: 'text-[#63B7B7]',
    }
  }

  // Get the icon component from Lucide
  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[
      platformInfo.icon
    ] || LucideIcons.Globe

  return (
    <div
      className={`flex items-center justify-center ${platformInfo.color} ${className}`}
    >
      <IconComponent size={size} />
    </div>
  )
}
