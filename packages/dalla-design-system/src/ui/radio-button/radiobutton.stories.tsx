import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radiobutton'
import { Label } from '../label'
import React from 'react'

const meta: Meta<typeof RadioGroupItem> = {
  title: 'Radio Button',
  component: RadioGroupItem,
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta<typeof RadioGroupItem>

export default meta

export const Default: StoryObj<typeof RadioGroupItem> = {
  args: {
    disabled: false,
  },
  render: () => {
    const items = [
      { id: 'radio-14-r1', value: 'r1', label: 'USA' },
      { id: 'radio-14-r2', value: 'r2', label: 'UK' },
    ]

    return (
      <RadioGroup className="flex flex-wrap gap-2" defaultValue="r1">
        {items.map((item) => (
          <div
            key={item.id}
            className="has-[[data-state=checked]]:border-ring bg-slate-blue text-foreground relative flex w-96 flex-col items-start gap-4 rounded-xl border border-2 border-[#C3CDD3] p-3 shadow-sm shadow-black/5"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                id={item.id}
                value={item.value}
                className="after:absolute after:inset-0"
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    )
  },
}
