import React from 'react'
import { LogoHorizontal, LogoVertical, Logomark, LogomarkFilled } from './index'

export default {
  title: 'Logo',
  component: LogoHorizontal,
}

export const Horizontal = () => <LogoHorizontal />

export const Vertical = () => <LogoVertical />

export const LogomarkStory = () => <Logomark />

export const FilledLogomark = () => <LogomarkFilled />
