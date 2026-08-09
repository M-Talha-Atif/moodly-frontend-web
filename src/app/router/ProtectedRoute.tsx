import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/shared/config/constants'
import { useSessionStore } from '@/entities/session'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const accessToken = useSessionStore((state) => state.accessToken)

  if (!accessToken) {
    return <Navigate to={ROUTES.login} replace />
  }

  return children
}
