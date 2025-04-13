'use client'

import Image from 'next/image'
import { BadgeCheck, Star } from 'lucide-react'
import { Input } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import type { ProfileCardFormInstance } from '../../hooks/use-profile-card'

interface ProfileInfoProps {
  isEditing: boolean
  avatar: string | null | undefined
  isVerified: boolean
  name: string | null | undefined
  title: string | null | undefined
  rating: number | null | undefined
  form: ProfileCardFormInstance
}

export function ProfileInfo({
  isEditing,
  avatar,
  isVerified,
  name,
  title,
  rating,
  form,
}: ProfileInfoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-24 w-24">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-4 ring-[#63B7B7]/20">
          <Image
            src={avatar || '/placeholder.svg'}
            alt={name || 'Profile'}
            width={96}
            height={96}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        {isVerified && (
          <div className="absolute bottom-0 right-0 rounded-full">
            <BadgeCheck className="h-5 w-5 fill-[#63B7B7] text-white" />
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-2 w-full space-y-2">
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    'h-8 text-center text-base font-medium',
                    field.state.meta.errors &&
                      'border-red-500 focus:ring-red-500',
                  )}
                  placeholder="Your name"
                />
                {field.state.meta.errors ? (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {Array.isArray(field.state.meta.errors)
                      ? field.state.meta.errors.join(', ')
                      : field.state.meta.errors}
                  </p>
                ) : null}
              </div>
            )}
          />
          <form.Field
            name="title"
            children={(field) => (
              <div>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    'h-7 text-center text-sm',
                    field.state.meta.errors &&
                      'border-red-500 focus:ring-red-500',
                  )}
                  placeholder="Your professional title"
                />
                {field.state.meta.errors ? (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {Array.isArray(field.state.meta.errors)
                      ? field.state.meta.errors.join(', ')
                      : field.state.meta.errors}
                  </p>
                ) : null}
              </div>
            )}
          />
        </div>
      ) : (
        <>
          <h2 className="mb-0.5 text-lg font-semibold text-gray-800">
            {name || '[No Name Provided]'}
          </h2>
          <p className="mb-2 text-sm text-gray-600">
            {title || '[No Title Provided]'}
          </p>
        </>
      )}

      <div className="mb-4 flex items-center gap-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${star <= Math.floor(rating ?? 0) ? 'fill-amber-400 text-amber-400' : star - 0.5 <= (rating ?? 0) ? 'fill-amber-400/50 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-600">
          {(rating ?? 0).toFixed(1)}
        </span>
      </div>
    </div>
  )
}
