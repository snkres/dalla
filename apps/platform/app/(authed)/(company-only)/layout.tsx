'use client'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { redirect } from 'next/navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [global, setGlobal] = useAtom(globalAtom)

  return global.mode === 'company' ? { children } : redirect('/')
}
