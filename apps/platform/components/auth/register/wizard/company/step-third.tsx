import Image from 'next/image'
import { Input } from '@dallah/design-system'
import PhoneInput from '@dallah/components/phoneInput'
import { useState } from 'react'
import { cn } from '@dallah/utils'
import { number, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@dallah/design-system'

const schema = z.object({
  industry: z.string(),
  type: z.string(),
  size: z.string(),
  website: z.string().url('Invalid URL'),
  address: z.string(),
  number: z.string(),
  logo: z.string().nullable(),
})


type FormData = z.infer<typeof schema>

export function CompanyWizardStepThird({
  data,
  updateData,
}: {
  data: { country: string; phoneNumber: string; address: string }
  updateData: (
    field: keyof {
      country: string
      number: string
      address: string
      image: string | null
    },
    value: any,
  ) => void
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // handle login logic here
  }

  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Image
        src='/goals.svg'
        alt='Goals and Needs'
        width={800}
        height={800}
        className='w-12 h-12 mx-auto'
      />
      <div className="text-center flex flex-col items-center gap-1 px-6 mt-4">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Finalize Your Profile
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Whether you’re a professional or a company, Dalla connects you to endless opportunities in consulting and collaboration.
        </p>
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
      </div>
      <div className='flex flex-col px-6'>
        <div className='flex gap-10'>
          <span className='font-medium text-text-md '>
            Profile image
          </span>
          {uploadedImage ? (
            <Image
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded company logo"
              width={100}
              height={100}
              className="h-[4.5rem] w-[4.5rem] rounded-lg object-cover"
            />
          ) : (
            <Image
              src='/company-logo-placeholder.svg'
              alt='Company Logo'
              width={100}
              height={100}
              className='w-[4.5rem] h-[4.5rem] mx-auto mr-8'
            />)}
          <div
            className={`flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors ${dragActive
              ? "border-[#f4d283] bg-[#f8eacf]/10"
              : uploadedImage
                ? "border-[#f4d283] bg-[#f8eacf]/5"
                : "border-[#E4E7EC]"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
              // Handle file drop here
              const file = e.dataTransfer.files[0]
              if (file) {
                const imageUrl = URL.createObjectURL(file)
                setUploadedImage(imageUrl)
              }
            }}
            onClick={() => {
              // Trigger hidden file input
              const input = document.createElement("input")
              input.type = "file"
              input.accept = "image/*"
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  const imageUrl = URL.createObjectURL(file)
                  setUploadedImage(imageUrl)
                }
              }
              input.click()
            }}
          >
            <div className="space-y-1 text-center">
              <p>
                <span className="text-[#f4d283]">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-[#98a2b3]">SVG, PNG, JPG or GIF (max. 800×400px)</p>
            </div>
          </div>
        </div>
        <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
        </div>
        <div className='flex flex-col gap-4'>
          <div className="flex w-full flex-col gap-[0.375rem]">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Website <span className="text-sunshine-yellow-100">*</span>
            </label>
            <div className="flex rounded-lg shadow-sm shadow-black/5">
              <span className="bg-[#FFFDFA] inline-flex items-center rounded-s-lg border-e-0 px-3 text-text-lg text-[#475467] !border-[#D0D5DD] border">
                https://
              </span>
              <Input
                className={cn(
                  ' h-12 bg-[#FFFDFA]  rounded-e-xl bg-transparent pe-9 transition-colors duration-500 focus:outline-none ',
                )}
                placeholder="www.Dalla.com"
                type="companyWebsite"
                {...register('website')}
              />
            </div>
            {errors.website && (
              <p className="mt-2 text-xs text-red-500">
                {errors.website.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex w-full flex-col gap-[0.375rem]">
              <label
                className={cn(
                  'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
                )}
              >
                Industry
              </label>
              <Input
                className="rounded-md"
                placeholder="Industry"
                type="industry"
                {...register('industry')}
              />
              {errors.industry && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col gap-[0.375rem]">
              <label className="text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]">
                Business Type
              </label>
              <Input
                className="rounded-md"
                placeholder="e.g. startup"
                type="businessType"
                {...register('type')}
              />
              {errors.type && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-[0.375rem]">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Company Size
            </label>
            <Input
              className={cn(
                'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
              )}
              placeholder="Enter your company size"
              type="name"
              {...register('size')}
            />
            {errors.size && (
              <p className="mt-2 text-xs text-red-500">{errors.size.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-[0.375rem]">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Phone Number
            </label>
            <PhoneInput onChange={(e) => updateData('number', e)}
            />
            {errors.number && (
              <p className="mt-2 text-xs text-red-500">{errors.number.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
      </div>
      <div className="flex flex-col gap-[0.375rem] px-6">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Address
        </label>
        <Textarea placeholder='Write the company address' className='text-[#475467] shadow-sm h-20'
          {...register('address')}
        />
        {errors.address && (
          <p className="mt-2 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
      </div>
    </div>
  )
}
