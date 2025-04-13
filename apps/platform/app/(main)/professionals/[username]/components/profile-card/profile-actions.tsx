'use client'

import { Button } from '@dalla/design-system'

export function ProfileActions() {
  // TODO: Implement actual contact/hire functionality
  const handleContact = () => {
    console.log('Contact button clicked')
  }

  const handleHire = () => {
    console.log('Hire Now button clicked')
  }

  return (
    <div className="mb-5 grid w-full grid-cols-2 gap-3">
      <Button
        onClick={handleContact}
        className="h-9 !bg-[#63B7B7] text-xs text-white transition-colors duration-200 hover:!bg-[#63B7B7]/90"
      >
        Contact
      </Button>
      <Button
        onClick={handleHire}
        variant="outline"
        className="h-9 border-[#63B7B7] text-xs text-[#63B7B7] transition-colors duration-200 hover:border-[#63B7B7] hover:!bg-[#63B7B7]/10"
      >
        Hire Now
      </Button>
    </div>
  )
}
