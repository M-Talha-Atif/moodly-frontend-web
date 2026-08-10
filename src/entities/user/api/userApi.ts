import { apiClient, unwrap, unwrapMessage } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'
import type { UserProfile } from '@/entities/user/model/types'

export async function fetchProfile() {
  const response = await apiClient.get<ApiResult<UserProfile>>('/profile')
  return unwrap(response.data)
}

export async function fetchProfileImage() {
  const response = await apiClient.get<ApiResult<{ avatarUrl: string | null }>>('/profile/image')
  return unwrap(response.data)
}

export interface UpdateProfilePayload {
  name?: string
  avatarFile?: File
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const formData = new FormData()
  if (payload.name) formData.append('name', payload.name)
  if (payload.avatarFile) formData.append('file', payload.avatarFile)

  const response = await apiClient.patch<ApiResult<unknown>>('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  // PATCH /profile returns no data payload on success, only a message, so
  // callers must re-fetch the profile to see the update reflected.
  return unwrapMessage(response.data)
}

export interface UpdatePasswordPayload {
  oldPassword: string
  newPassword: string
}

export async function updatePassword(payload: UpdatePasswordPayload) {
  const response = await apiClient.patch<ApiResult<unknown>>('/profile/password', payload)
  return unwrapMessage(response.data)
}
