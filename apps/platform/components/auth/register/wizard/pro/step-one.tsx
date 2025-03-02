import Image from 'next/image'
import { Button, Input, Logomark } from '@dallah/design-system'
import PhoneInput from '@dallah/components/phoneInput'
import { Dispatch, useEffect, useState } from 'react'
import { cn } from '@dallah/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloudIcon } from 'lucide-react'

import { parseCV } from '@lib/api/pro/parse-cv'
import { ProOnboardingData } from 'app/(auth)/onboard/page'

const schema = z.object({
  yoe: z.number(),
  address: z.string(),
  number: z.string(),
  logo: z.string().nullable(),
})

type FormData = z.infer<typeof schema>

export function ProWizardStepOne({
  data,
  updateData,
  handleNext,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  handleNext: () => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
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
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (uploadedCV instanceof File) {
        const res = await parseCV(uploadedCV)
        console.log(res)
      }
    }
    fetchData()
  }, [uploadedCV])

  return (
    <div className="flex flex-col">
      <Logomark className="[&_path]:fill-coral-red-100 mx-auto h-14 w-14" />
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Finalize Your Profile
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Whether you’re a professional or a company, Dalla connects you to
          endless opportunities in consulting and collaboration.
        </p>
      </div>
      <div className="flex flex-col px-6">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-1">
            <Image
              src={uploadedImage || '/company-logo-placeholder.svg'}
              alt="Company Logo"
              width={200}
              height={200}
              className="mx-auto h-[4.5rem] w-[4.5rem] cursor-pointer"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    setUploadedImage(imageUrl)
                  }
                }
                input.click()
              }}
            />
            <span className="text-text-md font-medium">Add Photo</span>
          </div>
          <div
            className={`w-full flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors ${
              dragActive
                ? 'border-coral-red-100 bg-[#f8eacf]/10'
                : uploadedImage
                  ? 'border-coral-red-100 bg-[#f8eacf]/5'
                  : 'border-[#E4E7EC]'
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
                setUploadedCV(file)
              }
            }}
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'application/pdf' // Ensure proper MIME type
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  setUploadedCV(file) // Store the file instead of the URL
                }
              }
              input.click()
            }}
          >
            <div className="space-y-1 text-center">
              <div className="mx-auto w-fit rounded-lg border border-[#E4E7EC] p-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <UploadCloudIcon size={24} className="mx-auto" />
              </div>
              <p>
                <span className="text-slate-blue-90 font-semibold">
                  Upload Your CV
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-sm text-[#98a2b3]"> PDF (max. 2MB)</p>
            </div>
          </div>
        </div>
        <div className="my-5 h-0.5 w-full bg-[#E3E7EB]"></div>
        <div className="flex gap-4">
          <div className="flex w-1/3 flex-col gap-[0.375rem]">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Years of Experience
            </label>
            <Input
              className={cn(
                'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
              )}
              placeholder="Ex: 5"
              type="name"
              {...register('yoe')}
            />
            {errors.yoe && (
              <p className="mt-2 text-xs text-red-500">{errors.yoe.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-[0.375rem]">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Phone Number
            </label>
            <PhoneInput
              onChange={(e) => {
                setValue('number', e)
              }}
            />
            {errors.number && (
              <p className="mt-2 text-xs text-red-500">
                {errors.number.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="my-5 h-0.5 w-full bg-[#E3E7EB]"></div>
      <div className="flex flex-col gap-[0.375rem] px-6">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Address
        </label>
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="Ex: 5th Avenue, New York"
          type="name"
          {...register('address')}
        />
        {errors.address && (
          <p className="mt-2 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="my-5 h-0.5 w-full bg-[#E3E7EB]"></div>
      <div className="flex items-center justify-center gap-4 px-6">
        <Button
          onClick={handleNext}
          variant="default"
          size="lg"
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] bg-coral-red-100 flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="submit"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
