import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from './authApi'
import { useSessionStore } from '@/entities/session'
import { ROUTES } from '@/shared/config/constants'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clear = useSessionStore((state) => state.clear)

  return async () => {
    try {
      await logout()
    } finally {
      clear()
      queryClient.clear()
      navigate(ROUTES.login)
    }
  }
}
