interface FooterListProps {
  children: React.ReactNode
}

export function Footer_list({ children }: FooterListProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-4 md:w-1/4">{children}</div>
  )
}
