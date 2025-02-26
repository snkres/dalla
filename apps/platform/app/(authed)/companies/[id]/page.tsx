import CompanyProfileClient from "./page.client"

export default async function companyProfile(props: {
  params: {
    id: Promise<string>
  }
}) {
  const { params } = props;
  return (
    <CompanyProfileClient params={{ id: await params.id }} />
  )
}