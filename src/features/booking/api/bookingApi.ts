import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'

export interface BookingResponse {
  id: string
  status: string
  experience: { id: string; title: string; date: string }
  createdAt: string
}

export async function createBooking(experienceId: string) {
  const response = await apiClient.post<ApiResult<BookingResponse>>('/user/bookings', {
    experienceId,
  })
  return unwrap(response.data)
}
