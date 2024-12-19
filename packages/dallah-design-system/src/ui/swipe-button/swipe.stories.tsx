import type { Meta, StoryObj } from '@storybook/react'
import { SwipeButton } from './swipe-button'
import React from 'react'

const meta: Meta<typeof SwipeButton> = {
  title: 'Swipe Button',
  component: SwipeButton,
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta<typeof SwipeButton>

export default meta

export const Default: StoryObj<typeof SwipeButton> = {
  args: {
    disabled: false,
  },
}
