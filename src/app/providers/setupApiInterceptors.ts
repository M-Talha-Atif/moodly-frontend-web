import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { apiClient } from '@/shared/api/apiClient'
import { API_BASE_URL } from '@/shared/config/constants'
import { ApiError, type ApiResult } from '@/shared/types/api'
import { useSessionStore } from '@/entities/session'

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = useSessionStore.getState().refreshToken
  if (!refreshToken) return null

  try {
    const response = await axios.post<
      ApiResult<{ access_token: string; refresh_token: string }>
    >(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken }, { withCredentials: true })
    const data = response.data.data
    if (!data) return null
    useSessionStore.getState().setTokens(data.access_token, data.refresh_token)
    return data.access_token
  } catch {
    useSessionStore.getState().clear()
    return null
  }
}

/** Wires token attachment and refresh-on-401 into the shared axios instance. Called once at app bootstrap. */
export function setupApiInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const token = useSessionStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined

      if (error.response?.status === 401 && original && !original._retry) {
        original._retry = true
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null
        })
        const newToken = await refreshPromise
        if (newToken) {
          original.headers.Authorization = `Bearer ${newToken}`
          return apiClient(original)
        }
      }

      const body = error.response?.data as ApiResult<unknown> | undefined
      throw new ApiError(
        body?.message ?? error.message,
        error.response?.status ?? 0,
        body?.errorType,
      )
    },
  )
}
