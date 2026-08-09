/** Mirrors the backend's ResultDto envelope (src/common/dto/result.dto.ts). */
export interface ApiResult<T> {
  success: boolean
  statusCode: number
  message?: string
  reason?: string
  data?: T
  errorType?: string
}

export class ApiError extends Error {
  statusCode: number
  errorType?: string

  constructor(message: string, statusCode: number, errorType?: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errorType = errorType
  }
}
