import { CompanyProfileClient } from './page.client'

interface CompanyProfileProps {
  params: Promise<{ id: string }>
}

export default async function CompanyProfile({ params }: CompanyProfileProps) {
  const { id } = await params

  return <CompanyProfileClient id={id} />
}
