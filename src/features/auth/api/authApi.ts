import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'
import type { User, UserRole } from '@/entities/user'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  role: UserRole
}

interface LoginData {
  access_token: string
  refresh_token: string
  user: User
}

export async function login(payload: LoginPayload) {
  const response = await apiClient.post<ApiResult<LoginData>>('/auth/login', payload)
  return unwrap(response.data)
}

export async function signup(payload: SignupPayload) {
  const response = await apiClient.post<ApiResult<User>>('/auth/signup', payload)
  return unwrap(response.data)
}

export async function logout() {
  await apiClient.post('/auth/logout')
}
