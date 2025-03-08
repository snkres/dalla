import { ProProfileClient } from './page.client'

interface ProProfileProps {
  params: Promise<{ username: string }>
}

export default async function ProProfile({ params }: ProProfileProps) {
  const { username } = await params
  console.log(username)
  return <ProProfileClient username={username} />
}
