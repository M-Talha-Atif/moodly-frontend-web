import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'

export type BookingStatus = 'confirmed' | 'cancelled' | 'waitlisted'

export interface BookingSummary {
  id: string
  status: BookingStatus
  experience: { id: string; title: string; date: string }
  createdAt: string
}

export interface BookingAttendee {
  userId: string
  name: string
  avatarUrl?: string
  status?: 'pending' | 'present' | 'absent'
}

export interface BookingDetail {
  bookingId: string
  experienceId: string
  title: string
  date: string
  hostName: string
  location: string
  image: string
  isVirtual: boolean
  meetingLink?: string
  qrCodeUrl?: string
  attendees?: BookingAttendee[]
}

export interface BookingListFilters {
  page?: number
  limit?: number
  status?: BookingStatus
  timeFilter?: 'today' | 'tomorrow' | 'weekend' | 'next-week'
}

interface BookingListResponse {
  data: BookingSummary[]
  meta: { total: number }
}

export interface BookingStats {
  total: number
  upcoming: number
  completed: number
}

export async function createBooking(experienceId: string) {
  const response = await apiClient.post<ApiResult<BookingSummary>>('/user/bookings', {
    experienceId,
  })
  return unwrap(response.data)
}

function buildParams(filters: BookingListFilters) {
  const params = new URLSearchParams()
  params.set('page', String(filters.page ?? 1))
  params.set('limit', String(filters.limit ?? 10))
  if (filters.status) params.set('status', filters.status)
  if (filters.timeFilter) params.set('timeFilter', filters.timeFilter)
  return params
}

export async function fetchBookings(filters: BookingListFilters) {
  const response = await apiClient.get<ApiResult<BookingListResponse>>(
    `/user/bookings?${buildParams(filters).toString()}`,
  )
  return unwrap(response.data)
}

export async function fetchBookingById(id: string) {
  const response = await apiClient.get<ApiResult<BookingDetail>>(`/user/bookings/${id}`)
  return unwrap(response.data)
}

export async function cancelBooking(id: string) {
  const response = await apiClient.delete<ApiResult<unknown>>(`/user/bookings/${id}`)
  return unwrap(response.data)
}

export async function fetchBookingStats() {
  const response = await apiClient.get<ApiResult<BookingStats>>('/user/bookings/stats')
  return unwrap(response.data)
}
