import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'
import {
  fetchProfile,
  updatePassword,
  updateProfile,
  type UpdatePasswordPayload,
  type UpdateProfilePayload,
} from './userApi'

const PROFILE_QUERY_KEY = ['profile']

export function useProfile() {
  const accessToken = useSessionStore((state) => state.accessToken)

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchProfile,
    enabled: Boolean(accessToken),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
  })
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),
  })
}
