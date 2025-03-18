'use client'

import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { CompanyProjectsView } from './components/compnay '
import { ProfessionalProjectsView } from './components/professional'

const LIMIT = 10
export function ProjectsPageClient() {
  const [global] = useAtom(globalAtom)

  return global.mode === 'company' ? (
    <CompanyProjectsView />
  ) : (
    <ProfessionalProjectsView />
  )
}
