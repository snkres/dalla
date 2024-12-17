import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'
import React from 'react'

const meta: Meta<typeof Switch> = {
  title: 'Button Toggle',
  component: Switch,
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta<typeof Switch>

export default meta

export const Default: StoryObj<typeof Switch> = {}
