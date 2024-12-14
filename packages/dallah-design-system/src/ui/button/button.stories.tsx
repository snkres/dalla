import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>

export default meta

export const Primary = {
  args: {
    children: 'This is a button!',
    asChild: false,
  },
}

export const Secondary = {
  args: {
    secondary: true,
    children: 'This is a button!',
  },
}
