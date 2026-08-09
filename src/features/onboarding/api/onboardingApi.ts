import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'

export interface OnboardingStatus {
  started: boolean
  completed: boolean
  currentStep: number
}

export async function getOnboardingStatus() {
  const response = await apiClient.get<ApiResult<OnboardingStatus>>('/onboarding/status')
  return unwrap(response.data)
}

export async function startOnboarding() {
  const response = await apiClient.post<ApiResult<OnboardingStatus>>('/onboarding/start')
  return unwrap(response.data)
}

export async function answerQuestion(question: string, answer: unknown) {
  const response = await apiClient.post<ApiResult<OnboardingStatus>>('/onboarding/answer', {
    question,
    answer,
  })
  return unwrap(response.data)
}

export async function setGoals(goals: string[]) {
  const response = await apiClient.post<ApiResult<OnboardingStatus>>('/onboarding/goals', {
    goals,
  })
  return unwrap(response.data)
}

export async function setActivities(activities: string[]) {
  const response = await apiClient.post<ApiResult<OnboardingStatus>>('/onboarding/activities', {
    activities,
  })
  return unwrap(response.data)
}

export async function completeOnboarding() {
  const response = await apiClient.post<ApiResult<OnboardingStatus>>('/onboarding/complete')
  return unwrap(response.data)
}
