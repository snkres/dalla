import AuthedLayoutClient from './layout.client'
import AuthRouteGuard from '@components/auth/auth-route-guard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthRouteGuard requireAuth redirectTo="/login">
      <AuthedLayoutClient>{children}</AuthedLayoutClient>
    </AuthRouteGuard>
  )
}
