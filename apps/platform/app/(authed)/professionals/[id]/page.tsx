import { ProProfileClient } from './page.client'

interface ProProfileProps {
  params: Promise<{ id: string }>
}

export default async function ProProfile({ params }: ProProfileProps) {
  const { id } = await params
  return <ProProfileClient id={id} />
}
