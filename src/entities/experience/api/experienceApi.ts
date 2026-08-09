import { apiClient, unwrap } from '@/shared/api/apiClient'
import type { ApiResult } from '@/shared/types/api'
import type {
  ExperienceDetail,
  ExperienceFilters,
  ExperienceListItem,
  ExperienceListMeta,
} from '../model/types'

interface ExperienceListResponse {
  data: ExperienceListItem[]
  meta: ExperienceListMeta
}

function buildParams(filters: ExperienceFilters) {
  const params = new URLSearchParams()
  params.set('page', String(filters.page ?? 1))
  params.set('limit', String(filters.limit ?? 10))
  if (filters.search) params.set('search', filters.search)
  filters.cultureTags?.forEach((tag) => params.append('cultureTags', tag))
  filters.desiredOutcomes?.forEach((tag) => params.append('desiredOutcomes', tag))
  filters.targetEmotions?.forEach((tag) => params.append('targetEmotions', tag))
  if (filters.timeFilter) params.set('timeFilter', filters.timeFilter)
  return params
}

export async function fetchExperiences(filters: ExperienceFilters) {
  const response = await apiClient.get<ApiResult<ExperienceListResponse>>(
    `/user/experiences?${buildParams(filters).toString()}`,
  )
  return unwrap(response.data)
}

export async function fetchExperienceById(id: string) {
  const response = await apiClient.get<ApiResult<ExperienceDetail>>(`/user/experiences/${id}`)
  return unwrap(response.data)
}
