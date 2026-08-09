import { apiClient, unwrap } from '@/shared/api/apiClient'
import { ApiError, type ApiResult } from '@/shared/types/api'

export interface CreateMoodLogPayload {
  moodLabel: string
  note?: string
}

export interface MoodLog {
  id: string
  moodLabel: string
  note?: string
  createdAt: string
}

export interface MoodStreak {
  streak: number
  totalDaysLogged: number
}

export async function createMoodLog(payload: CreateMoodLogPayload) {
  const formData = new FormData()
  formData.append('moodLabel', payload.moodLabel)
  if (payload.note) formData.append('note', payload.note)

  const response = await apiClient.post<ApiResult<MoodLog>>('/mood-log', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return unwrap(response.data)
}

export async function getTodayMoodLog(): Promise<MoodLog | null> {
  try {
    const response = await apiClient.get<ApiResult<MoodLog>>('/mood-log/today')
    return unwrap(response.data)
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) return null
    throw error
  }
}

export async function getMoodStreak(): Promise<MoodStreak> {
  const response = await apiClient.get<ApiResult<MoodStreak>>('/mood-log/streak')
  return unwrap(response.data)
}
