import axios from 'axios'
import { API_BASE_URL } from '@/shared/config/constants'
import { ApiError, type ApiResult } from '@/shared/types/api'

/*
 * Bare axios instance. Auth token attachment and refresh-on-401 logic live
 * in app/providers/setupApiInterceptors.ts, not here, so this shared module
 * has no dependency on the session entity or any feature (FSD: shared must
 * not import upward).
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

/** Unwraps the backend's ResultDto envelope into its `data` payload. */
export function unwrap<T>(result: ApiResult<T>): T {
  if (!result.success || result.data === undefined) {
    throw new ApiError(result.message ?? 'Request failed', result.statusCode, result.errorType)
  }
  return result.data
}
