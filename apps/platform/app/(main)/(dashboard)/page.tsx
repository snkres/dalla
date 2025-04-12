'use client'
import { useAtom } from 'jotai'
import { ProfessionalHome } from './components/professional'
import { globalAtom } from '@lib/atoms/global'
import { CompanyHome } from './components/company'

export default function DashboardPage() {
  const [global] = useAtom(globalAtom)
  return global.mode === 'user' ? <ProfessionalHome /> : <CompanyHome />
}
