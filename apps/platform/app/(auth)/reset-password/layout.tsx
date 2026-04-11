import AuthRouteGuard from '@components/auth/auth-route-guard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthRouteGuard requireAuth={false} redirectTo="/">
      {children}
    </AuthRouteGuard>
  )
}
