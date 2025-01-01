import { PictureUpload } from '@components/shared/picture-upload'
import { Button, Input } from '@dallah/design-system'
import { Upload } from 'lucide-react'

export function CompanyWizardStepThird({
  data,
  updateData,
}: {
  data: { country: string; phoneNumber: string; address: string }
  updateData: (
    field: keyof {
      country: string
      phoneNumber: string
      address: string
      image: string | null
    },
    value: any,
  ) => void
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Finalize Your Profile
        </h2>
        <div className="mb-8 mt-6">
          <PictureUpload
            onImageChange={(image: string | null) => updateData('image', image)}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Input
            placeholder="Your country"
            value={data.country}
            onChange={(e) => updateData('country', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            placeholder="Your phone number"
            value={data.phoneNumber}
            onChange={(e) => updateData('phoneNumber', e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Address</label>
          <Input
            placeholder="Your address"
            value={data.address}
            onChange={(e) => updateData('address', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
