import { useMutation } from '@tanstack/react-query'
import { login } from './authApi'
import { useSessionStore } from '@/entities/session'

export function useLogin() {
  const setSession = useSessionStore((state) => state.setSession)

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.user, data.access_token, data.refresh_token)
    },
  })
}
