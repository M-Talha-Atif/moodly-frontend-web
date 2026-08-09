import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchExperienceById, fetchExperiences } from './experienceApi'
import type { ExperienceFilters } from '../model/types'

/** Accumulates pages so a "load more" button appends rather than replaces. */
export function useInfiniteExperiences(filters: Omit<ExperienceFilters, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['experiences', filters],
    queryFn: ({ pageParam }) => fetchExperiences({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined,
  })
}

export function useExperience(id: string | undefined) {
  return useQuery({
    queryKey: ['experience', id],
    queryFn: () => fetchExperienceById(id as string),
    enabled: Boolean(id),
  })
}
