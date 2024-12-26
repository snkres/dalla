'use client'

import { Button } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'

export function SearchForm({ mode }: { mode: 'companies' | 'professional' }) {
  return (
    <div className="space-y-6">
      <h2
        className={`text-center text-2xl font-semibold tracking-tight ${
          mode === 'professional' ? 'text-sunshine-yellow' : 'text-slate-blue'
        }`}
      >
        {mode === 'companies'
          ? 'FIND YOUR PERFECT PROFESSIONAL.'
          : 'FIND YOUR PERFECT CONTRACT.'}
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <span
            className={mode === 'professional' ? 'text-sunshine-yellow' : ''}
          >
            Experience
          </span>
          <Select>
            <SelectTrigger className="!text-foreground !px-4 !py-6">
              <SelectValue placeholder="+1 year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">+1 year</SelectItem>
              <SelectItem value="2">+2 years</SelectItem>
              <SelectItem value="5">+5 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <span
            className={mode === 'professional' ? 'text-sunshine-yellow' : ''}
          >
            Industry
          </span>
          <Select>
            <SelectTrigger className="!text-foreground !px-4 !py-6">
              <SelectValue
                placeholder="Cultural Consulting"
                className="!text-foreground"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cultural">Cultural Consulting</SelectItem>
              <SelectItem value="business">Business Consulting</SelectItem>
              <SelectItem value="tech">Tech Consulting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <span
            className={mode === 'professional' ? 'text-sunshine-yellow' : ''}
          >
            Budget
          </span>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="!text-foreground !px-4 !py-6">
                <SelectValue placeholder="$3200" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3200">$3200</SelectItem>
                <SelectItem value="5000">$5000</SelectItem>
                <SelectItem value="10000">$10000</SelectItem>
              </SelectContent>
            </Select>

            <span
              className={cn(
                'text-text-sm',
                mode === 'professional' ? 'text-sunshine-yellow' : '',
              )}
            >
              To:
            </span>
            <Select>
              <SelectTrigger className="!text-foreground !px-4 !py-6">
                <SelectValue placeholder="$3200" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3200">$3200</SelectItem>
                <SelectItem value="5000">$5000</SelectItem>
                <SelectItem value="10000">$10000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button
        className={`text-text-sm w-full !rounded-full bg-transparent ${
          mode === 'companies'
            ? 'border-slate-blue text-slate-blue'
            : 'border-sunshine-yellow text-sunshine-yellow'
        }`}
        variant={'outline'}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8482 15.6295L12.7173 11.5646C13.799 10.3893 14.4637 8.83496 14.4637 7.12455C14.4632 3.46568 11.4495 0.5 7.73158 0.5C4.0137 0.5 1 3.46568 1 7.12455C1 10.7834 4.0137 13.7491 7.73158 13.7491C9.33796 13.7491 10.8113 13.1935 11.9686 12.2698L16.1156 16.3507C16.3176 16.5498 16.6457 16.5498 16.8477 16.3507C16.8958 16.3038 16.934 16.2477 16.9601 16.1858C16.9862 16.1239 16.9996 16.0574 16.9997 15.9902C16.9997 15.923 16.9864 15.8565 16.9603 15.7946C16.9343 15.7327 16.8962 15.6765 16.8482 15.6295ZM7.73158 12.7299C4.58585 12.7299 2.03575 10.2203 2.03575 7.12455C2.03575 4.02881 4.58585 1.51923 7.73158 1.51923C10.8773 1.51923 13.4274 4.02881 13.4274 7.12455C13.4274 10.2203 10.8773 12.7299 7.73158 12.7299Z"
            className={
              mode === 'companies' ? 'fill-slate-blue' : 'fill-sunshine-yellow'
            }
            strokeWidth="0.3"
          />
        </svg>
        Find a Professional
      </Button>
    </div>
  )
}
