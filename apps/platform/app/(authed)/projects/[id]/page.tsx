import { ProjectPageClient } from './page.client'

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectPageClient id={params.id} />
}
