import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta<typeof Button>

export default meta

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'default',
    size: 'default',
  },
}

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
    size: 'default',
  },
}

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'outline',
    size: 'default',
  },
}

export const Destructive: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'destructive',
    size: 'default',
  },
}

export const Ghost: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'ghost',
    size: 'default',
  },
}
