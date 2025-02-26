import Image from 'next/image'
import { Button, Input, Logomark } from '@dallah/design-system'
import PhoneInput from '@dallah/components/phoneInput'
import { Dispatch, useEffect, useState } from 'react'
import { cn } from '@dallah/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloudIcon } from 'lucide-react'
import { ProOnboardingData } from '..'
import { parseCV } from '@lib/api/pro/parse-cv'

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
  updateData: Dispatch<
    React.SetStateAction<ProOnboardingData>
  >
  handleNext: () => void,
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
    updateData((prev) => ({
      ...prev,
      meta: {
        yearsOfExperience: data.yoe,
        location: data.address,
        phone: data.number,
        skills: prev.meta.skills || [],
        socialLinks: prev.meta.socialLinks || []
      }
    }))
    handleNext()
  }

  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      if (uploadedCV instanceof File) {
        try {
          const res = await parseCV(uploadedCV);
          console.log(res);
        } catch (error) {
          console.error("Error parsing CV:", error);
        }
      }
    }
    fetchData();
  }, [uploadedCV]);

  useEffect(() => {
    if (uploadedImage) {
      setValue('logo', uploadedImage);
    } else {
      setValue('logo', null);
    }
  }, [uploadedImage, setValue]);

  return (
    <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
      <Logomark
        className='h-14 w-14 [&_path]:fill-coral-red-100 mx-auto'
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
        <div className='flex gap-4 flex-col items-center justify-center w-full '>
          <div className='flex flex-col gap-1'>
            <Image
              src={uploadedImage || '/company-logo-placeholder.svg'}
              alt='Company Logo'
              width={200}
              height={200}
              className='w-[4.5rem] h-[4.5rem] mx-auto cursor-pointer'
              onClick={() => {
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
            />
            <span className='font-medium text-text-md '>
              Add Photo
            </span>
          </div>
          <div
            className={
              `flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors w-full ${dragActive
                ? "border-coral-red-100 bg-[#f8eacf]/10"
                : uploadedImage
                  ? "border-coral-red-100 bg-[#f8eacf]/5"
                  : "border-[#E4E7EC]"
              }`
            }
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
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "application/pdf"; // Ensure proper MIME type
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  setUploadedCV(file); // Store the file instead of the URL
                }
              };
              input.click();
            }}
          >
            <div className="space-y-1 text-center">
              <div className='border w-fit mx-auto p-2 rounded-lg  border-[#E4E7EC]  shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]'>
                <UploadCloudIcon size={24} className="mx-auto" />
              </div>
              <p>
                <span className="text-slate-blue-90 font-semibold">Upload Your CV</span> or drag and drop
              </p>
              <p className="text-sm text-[#98a2b3]"> PDF (max. 2MB)</p>
            </div>
          </div>
        </div>
        <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
        </div>
        <div className='flex gap-4'>
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
              type="number"
              {...register('yoe', { valueAsNumber: true })}
            />
            {errors.yoe && (
              <p className="mt-2 text-text-xs text-coral-red-80">{errors.yoe.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-[0.375rem] w-full">
            <label
              className={cn(
                'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
              )}
            >
              Phone Number
            </label>
            <PhoneInput onChange={(e) => {
              setValue('number', e)
            }}
            />
            {errors.number && (
              <p className="mt-2 text-text-xs text-coral-red-80">{errors.number.message}</p>
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
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="Ex: 5th Avenue, New York"
          type="name"
          {...register('address')}
        />
        {errors.address && (
          <p className="mt-2 text-text-xs text-coral-red-80">{errors.address.message}</p>
        )}
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
      </div>
      <div className=" flex items-center justify-center gap-4 px-6">
        <Button
          variant="default"
          size="lg"

          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="submit"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
