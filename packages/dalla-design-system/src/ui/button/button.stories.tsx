import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import React from 'react'

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

export const FAB: StoryObj<typeof Button> = {
  args: {
    children: 'Learn More',
    variant: 'default',
    size: 'icon',
  },
  render: (args) => (
    <Button {...args}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </Button>
  ),
}
