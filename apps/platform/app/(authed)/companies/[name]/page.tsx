import { CompanyProfileClient } from './page.client'

interface CompanyProfileProps {
  params: Promise<{ name: string }>
}

export default async function CompanyProfile({ params }: CompanyProfileProps) {
  const { name } = await params

  return <CompanyProfileClient name={name} />
}
