'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, Globe2, BadgeCheck, Linkedin, GithubIcon, Twitter } from 'lucide-react';
import { useOnboarding } from '@lib/contexts/OnboardingContext';
import { Input } from '@dallah/design-system';
import { Textarea } from "@dallah/design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dallah/design-system";
import AvatarUpload from './(components)/AvatarUpload';
import ExpertiseSelect from './(components)/ExpertiseSelect';
import { ProfileFormData } from '@lib/types/profile';
import { expertiseOptions, languageOptions, timezoneOptions } from './(components)/data';
import { ButtonsContainer } from '@lib/constants/ButtonsContianer';
import { fadeInUpVariants, fadeInVariants } from '@components/aniamtion/animate';

export default function ProfilePage() {
  const { goToPreviousStep, goToNextStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    avatar: '',
    fullName: '',
    displayName: '',
    title: '',
    companyName: '',
    location: '',
    website: '',
    bio: '',
    expertise: [],
    languages: [],
    timezone: '',
    socialLinks: {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      goToNextStep();
    } catch (error) {
      console.error('Profile submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="min-h-full w-full max-w-3xl mx-auto px-6">
      <motion.div variants={fadeInUpVariants} className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Complete your profile
        </h1>
        <p className="text-gray-500 text-sm font-light">
          This information will help us personalize your experience
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div variants={fadeInVariants} className="pb-2">
          <motion.div variants={fadeInUpVariants}>
            <AvatarUpload />
          </motion.div>

          <div className="flex flex-col gap-8 w-full">
            <motion.div variants={fadeInUpVariants} className="w-full gap-8">
              <div className="space-y-4">
                <Label>Basic Information</Label>
                <div className="flex gap-4">
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full name"
                    className="h-11"
                  />
                  <Input
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="Display name"
                    className="h-11"
                  />
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Professional title"
                    className="h-11"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="w-full gap-8">
              <div className="space-y-4">
                <Label>Professional Details</Label>
                <div className="flex gap-4">
                  <div className=" relative w-full">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company name"
                      className="h-11 pl-10"
                    />
                  </div>
                  <div className="relative w-full">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Location"
                      className="h-11 pl-10"
                    />
                  </div>
                  <div className="relative w-full">
                    <Globe2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <label className="text-sm text-gray-600 mb-1.5 block">Expertise</label>
                    <ExpertiseSelect
                      value={formData.expertise}
                      onChange={(value: string[]) => setFormData({ ...formData, expertise: value })}
                      expertiseOptions={expertiseOptions.map(option => option.label)}
                    />
                  </div>
                  <div className="w-full" >
                    <label className="text-sm text-gray-600 mb-1.5 block">Languages</label>
                    <Select
                      value={formData.languages[0]}
                      onValueChange={(value) => setFormData({ ...formData, languages: [value] })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-600 mb-1.5 block">Timezone</label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Full Width Sections */}
            <motion.div variants={fadeInUpVariants} className="col-span-12 space-y-4">
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="min-h-[120px]"
              />
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="col-span-12 space-y-4">
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
            </motion.div>
          </div>
          <div className='mt-4'>
            <ButtonsContainer handlePrevious={goToPreviousStep} handleSubmit={handleSubmit} isSubmitting={isSubmitting} previousText="Previous" continueText="Continue" />

          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <BadgeCheck className="w-4 h-4 text-[#234d64]" />
      {children}
    </div>
  );
}