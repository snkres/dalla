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
import { CVParseResponse, parseCV } from '@lib/api/pro/parse-cv'

// Enhanced schema with additional fields from CV parsing
const schema = z.object({
  yoe: z.number(),
  address: z.string(),
  number: z.string(),
  logo: z.string().nullable(),
  name: z.string().optional(),
  email: z.string().optional(),
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
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      yoe: data.meta?.yearsOfExperience || 0,
      address: data.meta?.location || '',
      number: data.meta?.phone || '',
      logo: null,
    }
  })

  const onSubmit = (formData: FormData) => {
    updateData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        yearsOfExperience: formData.yoe,
        location: formData.address,
        phone: formData.number,
      },
      // Update headline with name if available
      headline: prev.headline || (formData.name ? `${formData.name}'s Professional Profile` : ''),
    }))
    handleNext()
  }

  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [cvData, setCVData] = useState<CVParseResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Utility function to extract dates from string format
  const extractDates = (dateStr: string) => {
    // Handle "Present" in date strings
    const processedDate = dateStr.replace('Present', new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

    // Extract start and end dates
    const dates = processedDate.split(' - ');
    if (dates.length !== 2) return { startDate: '', endDate: '' };

    // Format dates for consistency
    const startDateParts = dates[0].trim().split(' ');
    const endDateParts = dates[1].trim().split(' ');

    if (startDateParts.length < 2 || endDateParts.length < 2)
      return { startDate: '', endDate: '' };

    const startMonth = startDateParts[0];
    const startYear = startDateParts[1];
    const endMonth = endDateParts[0];
    const endYear = endDateParts[1];

    return {
      startDate: `${startMonth} ${startYear}`,
      endDate: dates[1].includes('Present') ? 'Present' : `${endMonth} ${endYear}`
    };
  };

  // Calculate years of experience from work experiences
  const calculateYearsOfExperience = (workExperiences: CVParseResponse['data']['workExperiences']) => {
    let totalMonths = 0;

    for (const experience of workExperiences) {
      const dateStr = experience.date;

      // Handle "Present" in date strings
      const processedDate = dateStr.replace('Present', new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

      // Extract start and end dates
      const dates = processedDate.split(' - ');
      if (dates.length !== 2) continue;

      const startDateParts = dates[0].trim().split(' ');
      const endDateParts = dates[1].trim().split(' ');

      if (startDateParts.length < 2 || endDateParts.length < 2) continue;

      // Parse start and end dates
      const startMonth = new Date(Date.parse(`${startDateParts[0]} 1, ${startDateParts[1]}`)).getMonth();
      const startYear = parseInt(startDateParts[1]);

      const endMonth = new Date(Date.parse(`${endDateParts[0]} 1, ${endDateParts[1]}`)).getMonth();
      const endYear = parseInt(endDateParts[1]);

      // Calculate months
      const months = (endYear - startYear) * 12 + (endMonth - startMonth);
      totalMonths += months > 0 ? months : 0;
    }

    return Math.max(Math.round(totalMonths / 12), 1);
  };

  // Extract education info from CV data
  const extractEducation = (educations: CVParseResponse['data']['educations']) => {
    return educations.map(edu => {
      const { startDate, endDate } = extractDates(edu.date);

      // Extract degree and field from the degree string
      let degree = "Bachelor's";
      let field = "Computer Science";

      if (edu.degree) {
        const degreeMatch = edu.degree.match(/(Bachelor|Master|Doctor|Ph\.D|MBA|B\.S|M\.S|B\.A|M\.A)/i);
        if (degreeMatch) {
          degree = degreeMatch[0];
        }

        const fieldMatch = edu.degree.match(/in\s([^-]+)/i);
        if (fieldMatch) {
          field = fieldMatch[1].trim();
        } else {
          // Try to extract field if "in" is not present
          const parts = edu.degree.split(' ');
          if (parts.length > 2) {
            field = parts.slice(2).join(' ').replace(/^in\s+/i, '');
          }
        }
      }

      return {
        school: edu.school,
        degree: degree,
        field: field,
        startDate: startDate,
        endDate: endDate,
        description: edu.descriptions.join('. ')
      };
    });
  };

  // Extract work experience from CV data
  const extractWorkExperience = (workExperiences: CVParseResponse['data']['workExperiences']) => {
    return workExperiences.map(exp => {
      const { startDate, endDate } = extractDates(exp.date);

      return {
        title: exp.jobTitle,
        company: exp.company,
        location: '', // Location might not be available in the parsed data
        startDate: startDate,
        endDate: endDate,
        meta: {
          skills: [] as string[], // Will be populated from skills section
          achievements: exp.descriptions.filter(desc => desc.includes('%') || desc.includes('increase') ||
            desc.includes('improve') || desc.includes('enhance')).join('. '),
          responsibilities: exp.descriptions.filter(desc => !desc.includes('%') && !desc.includes('increase') &&
            !desc.includes('improve') && !desc.includes('enhance')).join('. '),
          employmentType: 'Full-time' // Default value
        }
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (uploadedCV instanceof File) {
        setIsLoading(true);
        try {
          const res = await parseCV(uploadedCV);
          console.log("CV Parse Result:", res);

          if (res.success && res.data) {
            setCVData(res.data);

            // Calculate years of experience
            const yoe = calculateYearsOfExperience(res.data.workExperiences);

            // Update form with CV data
            setValue('address', res.data.profile.location || '');
            setValue('number', res.data.profile.phone || '');
            setValue('yoe', yoe);
            setValue('name', res.data.profile.name || '');
            setValue('email', res.data.profile.email || '');

            // Extract skills from CV
            const extractedSkills = res.data.skills.featuredSkills.map(skill => skill.skill);

            // Extract education info
            const educationEntries = extractEducation(res.data.educations);

            // Extract work experience
            const workExperience = extractWorkExperience(res.data.workExperiences);

            // Assign skills to work experiences based on matching text
            workExperience.forEach(exp => {
              exp.meta.skills = extractedSkills.filter(skill =>
                exp.meta.responsibilities.toLowerCase().includes(skill.toLowerCase()) ||
                exp.title.toLowerCase().includes(skill.toLowerCase())
              );
            });

            // Prepare a comprehensive bio from the summary
            const bio = res.data.profile.summary ||
              `Professional with ${yoe} years of experience. ${workExperience[0]?.title || ''} at ${workExperience[0]?.company || ''}.`;

            // Update parent component with all CV data
            updateData((prev) => ({
              ...prev,
              headline: `${res.data.profile.name}'s Professional Profile`,
              bio: bio,
              gender: prev.gender, // Keep existing gender
              meta: {
                ...prev.meta,
                skills: extractedSkills,
                phone: res.data.profile.phone || prev.meta.phone,
                location: res.data.profile.location || prev.meta.location,
                yearsOfExperience: yoe,
                socialLinks: [
                  ...(prev.meta.socialLinks || []),
                  res.data.profile.url || ''
                ].filter((link, index, self) =>
                  index === self.findIndex(l => l)
                ),
              },
              education: educationEntries,
              experience: workExperience,
              resume: res.data.url
            }));
          }
        } catch (error) {
          console.error("Error parsing CV:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [uploadedCV, setValue, updateData]);

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
          Whether you're a professional or a company, Dalla connects you to endless opportunities in consulting and collaboration.
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
              `flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors w-full ${isLoading
                ? "border-coral-red-100 bg-[#f8eacf]/10 opacity-70"
                : dragActive
                  ? "border-coral-red-100 bg-[#f8eacf]/10"
                  : uploadedCV
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
              if (isLoading) return;
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
              <div className='border w-fit mx-auto p-2 rounded-lg border-[#E4E7EC] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]'>
                {isLoading ? (
                  <div className="animate-spin h-6 w-6 border-2 border-coral-red-100 border-t-transparent rounded-full mx-auto"></div>
                ) : (
                  <UploadCloudIcon size={24} className="mx-auto" />
                )}
              </div>
              <p>
                <span className="text-slate-blue-90 font-semibold">
                  {isLoading ? "Processing CV..." : cvData ? "CV Uploaded Successfully" : "Upload Your CV"}
                </span> {!isLoading && !cvData && "or drag and drop"}
              </p>
              {!isLoading && !cvData && <p className="text-sm text-[#98a2b3]">PDF (max. 2MB)</p>}
              {cvData && (
                <p className="text-sm text-green-600">
                  Extracted details from {cvData.profile.name}'s CV
                </p>
              )}
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
            <PhoneInput
              onChange={(e) => {
                setValue('number', e)
              }}
              defaultValue={cvData?.profile.phone || data.meta?.phone || ''}
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
          type="text"
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
          disabled={isLoading}
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </form>
  )
}