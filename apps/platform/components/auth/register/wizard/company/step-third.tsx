import { PictureUpload } from '@components/shared/picture-upload'
import { Button, Input } from '@dallah/design-system'
import PhoneInput from '@dallah/components/phoneInput'
import { CountryDropdown } from '@dallah/components/countrySelect'

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
          <CountryDropdown
            placeholder="Select country"
            defaultValue="USA"
            onChange={(country) => updateData('country', country.alpha3)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <PhoneInput onChange={(e) => updateData('phoneNumber', e)} />
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
