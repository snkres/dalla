import CompanyProfileClient from "./page.client"
interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {

  return (
    <CompanyProfileClient params={{ id: (await params).id }} />
  )
}