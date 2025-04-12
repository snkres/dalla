// 'use client'

// import React, { useState } from 'react'
// import { LanguagesSection } from './langs-section'
// // import { VerificationsSection } from './verifications-section'
// import { SocialsSection } from './socials-section'
// import { Language } from '@lib/types/profile'

// type Social = {
//   platform: string
//   url: string
//   icon: React.ReactNode
// }
// export default function DetailedInfo({
//   languages,
//   socials,
//   onChange,
// }: {
//   languages: Language[]
//   socials: { platform: string; url: string }[]
//   onChange: (
//     languages: Language[],
//     socials: { platform: string; url: string }[],
//   ) => void
// }) {
//   const [editingSection, setEditingSection] = useState<string | null>(null)

//   const [editedLanguages, setEditedLanguages] = useState<Language[]>([])

//   const [editedSocials, setEditedSocials] = useState<
//     { platform: string; url: string }[]
//   >([])

//   return (

//       {/* <VerificationsSection /> */}
//       <SocialsSection
//         socials={socials}
//         editedSocials={editedSocials}
//         setEditedSocials={setEditedSocials}
//         isEditing={editingSection === 'socials'}
//         setEditingSection={setEditingSection}
//         onChange={(socials) => {
//           const currentLanguages = languages
//           onChange(currentLanguages, socials)
//         }}
//       />
//     </div>
//   )
// }
