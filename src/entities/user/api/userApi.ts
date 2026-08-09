import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'
import type { User } from '@/entities/user/model/types'

export async function fetchCurrentUser() {
  const response = await apiClient.get<ApiResult<User>>('/auth/me')
  return unwrap(response.data)
}
