// Dependencies: pnpm install input-otp

'use client'
import { cn } from '@dallah/utils'
import { OTPInput, SlotProps } from 'input-otp'

export default function OTPInputComponent() {
  return (
    <div className="space-y-2">
      <OTPInput
        id="input-58"
        containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
        maxLength={4}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'border-input bg-background text-heading-lg mx-1 flex h-20 w-24 items-center justify-center rounded-3xl border font-semibold text-[#D0D5DD] shadow-sm shadow-black/5 transition-shadow',
        props.isActive ? 'border-ring ring-ring/20 z-10 border ring-[3px]' : '',
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
