import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from './userApi'
import { useSessionStore } from '@/entities/session'

export function useCurrentUser() {
  const accessToken = useSessionStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: Boolean(accessToken),
  })
}
