import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import { Input, Textarea, Label } from '@dallah/design-system'
import { MapPin, Globe2 } from 'lucide-react'
import { motion } from 'motion/react'
import AvatarUpload from '../AvatarUpload'
import { expertiseOptions } from '../data'
import ExpertiseSelect from '../ExpertiseSelect'
import { CompanyOnboardingData } from '../../page'
import PhoneInput from '@dallah/components/phoneInput'

export function CompanyOnboardingOne({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto min-h-full w-full max-w-3xl px-6"
    >
      <motion.div variants={fadeInUpVariants} className="mb-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Complete your profile
        </h1>
        <p className="text-sm font-light text-gray-500">
          This information will help us personalize your experience
        </p>
      </motion.div>

      <motion.div variants={fadeInVariants} className="pb-2">
        <motion.div variants={fadeInUpVariants}>
          <AvatarUpload
            setUploadedURL={(url) => {
              setData({ ...data, logo: url })
              console.log(url)
              console.log(data)
            }}
            required={false}
          />
        </motion.div>

        <div className="flex w-full flex-col gap-8">
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="space-y-4">
              <Label>Basic Information</Label>
              <div className="flex gap-4">
                <Input
                  value={data.headline}
                  onChange={(e) =>
                    setData({
                      ...data,
                      headline: e.target.value,
                    })
                  }
                  placeholder="Headline"
                  className="h-11"
                />

                <Input
                  value={data.industry}
                  onChange={(e) =>
                    setData({ ...data, industry: e.target.value })
                  }
                  placeholder="Industry"
                  className="h-11"
                />
                <Input
                  value={data.companySize}
                  onChange={(e) =>
                    setData({ ...data, companySize: e.target.value })
                  }
                  placeholder="Company size"
                  className="h-11"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="space-y-4">
              <Label>Professional Details</Label>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <PhoneInput
                    onChange={(value) => {
                      setData({
                        ...data,
                        phoneNumber: value,
                      })
                    }}
                    defaultValue={data.phoneNumber}
                  />
                </div>
                <div className="relative w-full">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    placeholder="Location"
                    className="h-11 pl-10"
                  />
                </div>
                <div className="relative w-full">
                  <Globe2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={data.website}
                    onChange={(e) =>
                      setData({ ...data, website: e.target.value })
                    }
                    placeholder="Website"
                    className="h-11 pl-10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="w-full space-y-4">
              <Label>Preferences</Label>
              <div className="flex w-full gap-2">
                <div className="w-full space-y-2">
                  <Label>Target Industries</Label>
                  <ExpertiseSelect
                    value={data.targetIndustries}
                    onChange={(value: string[]) =>
                      setData({ ...data, targetIndustries: value })
                    }
                    expertiseOptions={expertiseOptions.map(
                      (option) => option.label,
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full Width Sections */}
          <motion.div variants={fadeInUpVariants} className="space-y-2 pt-2">
            <Label>Bio</Label>
            <Textarea
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              placeholder="Tell us about the company..."
              className="h-28"
            />
          </motion.div>

          {/* <motion.div variants={fadeInUpVariants} className="col-span-12 space-y-4">
            <Label>Social Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5 text-gray-400" /> },
                { key: 'twitter', label: 'Twitter', icon: <Twitter className="w-5 h-5 text-gray-400" /> },
                { key: 'github', label: 'GitHub', icon: <GithubIcon className="w-5 h-5 text-gray-400" /> },
              ].map((social) => (
                <div key={social.key} className="relative">
                  <div className="absolute left-3 top-3">
                    {social.icon}
                  </div>
                  <Input
                    value={formData.socialLinks[social.key as keyof typeof formData.socialLinks] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        [social.key]: e.target.value
                      }
                    })}
                    placeholder={`${social.label} profile URL`}
                    className="h-11 pl-10"
                  />
                </div>
              ))}
            </div>
          </motion.div> */}
        </div>
        {/* <div className='mt-4'>
            <ButtonsContainer handlePrevious={goToPreviousStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} previousText="Previous" continueText="Continue" />

          </div> */}
      </motion.div>
    </motion.div>
  )
}
