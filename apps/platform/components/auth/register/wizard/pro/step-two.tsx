import Image from 'next/image'
import { Button, Input, Logomark } from '@dallah/design-system'
import PhoneInput from '@dallah/components/phoneInput'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { cn } from '@dallah/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, UploadCloudIcon, X } from 'lucide-react'
import { ProOnboardingData } from '..'

const schema = z.object({
  yoe: z.number(),
  industry: z.string(),
  portfolio: z.string(),
  cerfications: z.string(),
})



const PREDEFINED_SKILLS = [
  'JavaScript', 'Python', 'TypeScript', 'React', 'Node.js',
  'HTML', 'CSS', 'SQL', 'Java', 'C++', 'Ruby', 'PHP',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'MongoDB',
  'Photoshop', 'Illustrator', 'Figma', 'Sketch',
  'Angular', 'Vue.js', 'Next.js', 'GraphQL', 'REST API'
];

type FormData = z.infer<typeof schema>

export function ProWizardStepTwo({
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    updateData(
      (prev) => {
        return {
          ...prev,
          meta: {
            ...prev.meta,
            skills: skills,
            socialLinks: [data.portfolio]
          }
        }
      }
    )
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
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputValue('');
      setSuggestions([]);
      setShowSuggestions(false);

    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      handleAddSkill(suggestions[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filtered = PREDEFINED_SKILLS.filter(
        skill =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(skill)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  return (
    <form className="flex flex-col gap-4 w-[43rem] px-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-[0.375rem] flex-col">
        <h2 className="text-4xl font-medium text-gray-700">
          Skills <span className="text-coral-red-50">*</span>
        </h2>
        <div className="relative ">
          <div className="border  border-[#D0D5DD] rounded-lg bg-white p-3 focus-within:ring-2 focus-within:ring-slate-blue-20 focus-within:border-slate-blue-20">
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center bg-slate-blue-10/70 text-gray-800 rounded-full px-3 py-1 text-text-sm"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 p-0.5 hover:bg-gray-200 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center relative">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Select the tools, platforms, or technologies you are proficient in."
                className="flex-1 ml-2 outline-none text-gray-700 placeholder-gray-400 "
              />
            </div>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 mt-1 bg-[#FFFDFA] border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => handleAddSkill(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Industry Focus
        </label>
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="Software Development"
          type="name"
          {...register('industry')}
        />
        {errors.industry && (
          <p className="mt-2 text-xs text-red-500">{errors.industry.message}</p>
        )}
      </div> */}

      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Portfolio Link
        </label>
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="www.yourportfolio.domain"
          type="name"
          {...register('industry')}
        />
        {errors.industry && (
          <p className="mt-2 text-xs text-red-500">{errors.industry.message}</p>
        )}
      </div>

      <div className='h-0.5 w-full bg-[#E3E7EB] my-5'>
      </div>
      <div className=" flex items-center justify-center gap-4 w-full">
        <Button
          onClick={handleNext}
          variant="default"
          size="lg"
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm "
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
