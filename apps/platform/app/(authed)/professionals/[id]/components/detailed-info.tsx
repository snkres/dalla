'use client'

import React, { useState } from 'react'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { LanguagesSection } from './langs-section'
import { VerificationsSection } from './verifications-section'
import { SocialsSelection } from './socials-section'
type Language = {
  language: string
  proficiency: string
}

type Social = {
  platform: string
  url: string
  icon: React.ReactNode
}
export default function DetailedInfo({
  languages,
  onChange,
}: {
  languages: Language[]
  onChange: (languages: Language[]) => void
}) {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const [editedLanguages, setEditedLanguages] = useState<Language[]>([])

  const [socials, setSocials] = useState<Social[]>([
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/amr-tamer',
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/amr_tamer',
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/amr.tamer',
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/amr_tamer',
      icon: <Instagram className="h-4 w-4" />,
    },
  ])
  const [editedSocials, setEditedSocials] = useState<Social[]>([])

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <LanguagesSection
        languages={languages}
        editedLanguages={editedLanguages}
        setEditedLanguages={setEditedLanguages}
        isEditing={editingSection === 'languages'}
        setEditingSection={setEditingSection}
        onChange={onChange}
      />
      <VerificationsSection />
      <SocialsSelection
        socials={socials}
        setSocials={setSocials}
        editedSocials={editedSocials}
        setEditedSocials={setEditedSocials}
        isEditing={editingSection === 'socials'}
        setEditingSection={setEditingSection}
      />
    </div>
  )
}
