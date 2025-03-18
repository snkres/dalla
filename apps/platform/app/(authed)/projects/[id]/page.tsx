import { ProjectPageClient } from './page.client'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return <ProjectPageClient id={(await params).id} />
}
